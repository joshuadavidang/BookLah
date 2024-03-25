"use client";

import { useCommentDetail, useForumDetail } from "@/api";
import { backendAxiosPost } from "@/api/helper";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const ForumDetails = (params: any) => {
  const { slug } = params.params;
  const { data, isLoading } = useForumDetail(slug);
  const comments = useCommentDetail(data?.data?.post_id);
  const router = useRouter();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <LoadingIndicator />;

  const forumDetail = data.data;

  const { post_id, content, title } = forumDetail;

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    const commentId = uuidv4();
    const apiURL = `${process.env.NEXT_PUBLIC_ADD_COMMENT}/${post_id}`;
    const data = {
      comment_id: commentId,
      content: values.comment,
    };
    await backendAxiosPost(apiURL, data);
    form.reset();
  };

  return (
    <div className="flex flex-col justify-center relative lg:-top-20 w-screen gap-10">
      <div className="flex justify-evenly items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex gap-2 items-center"
        >
          <ArrowLeft size="18" /> Back
        </Button>
        <h1>{title}'s Community Forum</h1>
        <Button variant="link" className="text-sm">
          Leave Forum
        </Button>
      </div>

      <div className="flex justify-center mx-4 lg:mx-auto lg:w-1/2 bg-slate-100 p-8 rounded-2xl">
        <h2>{content}</h2>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
        {comments?.data?.data.map(({ comment_id, content }: any) => (
          <div key={comment_id}>{content}</div>
        ))}
      </div>

      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row justify-between lg:w-1/2 relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add a comment here..."
                      className="min-h-[100px] resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center p-3 pt-4">
              <Button type="submit" variant="dark" size="sm">
                <p className="text-xs">Enter</p>
                <CornerDownLeft className="ml-2 size-3.5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForumDetails;
