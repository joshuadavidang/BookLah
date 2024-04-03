"use client";

import {
  useCommentDetail,
  useForumDetailConcertId,
  usePostDetails,
} from "@/api";
import { backendAxiosPost, backendAxiosPut } from "@/api/helper";
import { Dialog } from "@/components/Dialog";
import LeaveForumModal from "@/components/LeaveForumModal";
import LoadingIndicator from "@/components/Loading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context";
import { commentSchema } from "@/model/formSchema";
import { UserType } from "@/types";
import { DISCOVER_URL } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const ForumDetails = (params: any) => {
  const [addComment, setAddComment] = useState<boolean>(false);
  const { slug } = params.params;
  const { data, isLoading } = useForumDetailConcertId(slug);

  const posts = usePostDetails(slug);

  const comments = useCommentDetail("649511dd-49b5-46eb-9ce0-d1dd199b1306"); // postid

  const router = useRouter();
  const user = useContext(AuthContext);
  const isAdmin = user.userType === UserType.ADMIN;

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

  const concert_name = data?.data?.concert_name;
  const concert_id = data?.data?.concert_id;

  const handleLeaveForum = async () => {
    const apiURL = `${process.env.NEXT_PUBLIC_LEAVE_FORUM}`;
    const data = {
      concert_id: concert_id,
      user_id: user.userId,
      forum_joined: false,
    };
    const response = await backendAxiosPut(apiURL, data);
    if (response.code === 200) {
      toast.success("You've left the forum");
      router.push(DISCOVER_URL);
    }
  };

  const onSubmit = async (
    values: z.infer<typeof commentSchema>,
    postId: string
  ) => {
    setAddComment(true);
    const commentId = uuidv4();
    const apiURL = `${process.env.NEXT_PUBLIC_ADD_COMMENT}/${postId}`; // postid
    const data = {
      comment_id: commentId,
      content: values.comment,
      user_id: user.userId,
    };
    const response = await backendAxiosPost(apiURL, data);
    if (response.code === 201) {
      setTimeout(() => {
        setAddComment(false);
      }, 1000);
    }
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
        <h1>{concert_name}'s Community Forum</h1>
        {isAdmin ? (
          <Dialog concertId={slug} />
        ) : (
          <LeaveForumModal title="Leave Forum" onClick={handleLeaveForum} />
        )}
      </div>

      {posts?.data?.data?.posts.map((post: any) => {
        return (
          <div
            className="flex flex-col gap-4 mx-auto rounded-lg bg-gray-200 p-12"
            key={post.post_id}
          >
            <div className="flex justify-center mx-4 bg-white p-8 rounded-2xl">
              <h3>
                <span className="font-semibold"> {"<Official Post> "}</span>
                {post.content}
              </h3>
            </div>

            <div className="flex flex-col gap-4 p-4 max-h-[300px] overflow-auto">
              {comments?.data?.data.map(
                ({ user_id, comment_id, content, post_id }: any) =>
                  post_id === post.post_id &&
                  (user_id === user.userId ? (
                    <div
                      key={comment_id}
                      className="flex justify-end items-center gap-4"
                    >
                      {content}
                      <Avatar className="bg-white">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <div
                      key={comment_id}
                      className="flex justify-start items-center gap-4"
                    >
                      <Avatar className="bg-white">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      {content}
                    </div>
                  ))
              )}
            </div>

            <div className="flex justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    onSubmit(values, post.post_id)
                  )}
                  className="flex flex-col lg:flex-row justify-between relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Add a comment here..."
                            className="min-h-[100px] min-w-[650px] resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center p-3 pt-4">
                    <Button
                      type="submit"
                      variant="dark"
                      size="sm"
                      disabled={addComment}
                    >
                      <p className="text-xs">
                        {!addComment ? "Enter" : "Adding..."}
                      </p>
                      {!addComment && (
                        <CornerDownLeft className="ml-2 size-3.5" />
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForumDetails;
