"use client";

import {
  useCommentDetail,
  useForumDetailConcertId,
  usePostDetails,
} from "@/api";
import { backendAxiosPut } from "@/api/helper";
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
import io from "socket.io-client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const socket = io("localhost:5007");

const ForumDetails = (params: any) => {
  const { slug } = params.params;
  const { data: forumData, isLoading: isForumLoading } =
    useForumDetailConcertId(slug);

  const { data: postData, isLoading: isPostLoading } = usePostDetails(slug);
  const { data: CommentsData } = useCommentDetail();

  const router = useRouter();
  const user = useContext(AuthContext);
  const isAdmin = user.userType === UserType.ADMIN;

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    socket.on("message", (data: string) => {
      setComments((prevComments: any) => [...prevComments, data]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isPostLoading || isForumLoading) return <LoadingIndicator />;

  const handleLeaveForum = async () => {
    const apiURL = `${process.env.NEXT_PUBLIC_LEAVE_FORUM}`;
    const data = {
      concert_id: "concert_id",
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
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const commentId = uuidv4();
    const comment = {
      post_id: postId,
      comment_id: commentId,
      content: values.comment,
      user_id: user.userId ?? "Anonymous",
      createdAt: currentTime,
    };
    socket.emit("message", comment);
    form.reset();
  };

  const disabled = postData?.data?.posts.length === 1;

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
        <h1>{forumData?.data?.concert_name}'s Community Forum</h1>
        {isAdmin ? (
          <Dialog concertId={slug} disabled={disabled} />
        ) : (
          <LeaveForumModal title="Leave Forum" onClick={handleLeaveForum} />
        )}
      </div>

      {postData?.data?.posts.length < 0 ? (
        <div className="flex flex-col gap-4 mx-auto rounded-3xl bg-gray-100 p-12 w-1/2">
          <h2 className="font-h2 font-semibold text-center">
            Ops... The concert organiser has not posted anything. Check back
            soon!
          </h2>
        </div>
      ) : (
        <>
          {postData?.data?.posts.map(({ post_id, content }: any) => {
            return (
              <div
                className="flex flex-col gap-4 mx-auto rounded-lg bg-gray-200 p-12"
                key={post_id}
              >
                <div className="flex justify-center mx-4 bg-white p-8 rounded-2xl">
                  <h3>
                    <span className="font-semibold"> {"<Official Post> "}</span>
                    {content}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 p-4 max-h-[300px] overflow-auto">
                  {CommentsData?.data?.length > 0 ? (
                    <>
                      {CommentsData?.data?.map(
                        ({ content, user_id, createdAt }: any, i: any) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 ${
                              user_id === user.userId
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <p className="text-sm text-gray-400">{createdAt}</p>
                            <div
                              className={`${
                                user_id === user.userId ? "order-2" : "order-1"
                              }`}
                            >
                              {content}
                            </div>
                            <Avatar className="bg-white">
                              <AvatarFallback>
                                {user_id === user.userId ? user.name[0] : "A"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {comments.map(
                        ({ content, user_id, createdAt }: any, i: any) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 ${
                              user_id === user.userId
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <p className="text-sm text-gray-400">{createdAt}</p>
                            <div
                              className={`${
                                user_id === user.userId ? "order-2" : "order-1"
                              }`}
                            >
                              {content}
                            </div>
                            <Avatar className="bg-white">
                              <AvatarFallback>
                                {user_id === user.userId ? user.name[0] : "A"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>

                <div className="flex justify-center">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((values) =>
                        onSubmit(values, post_id)
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
          })}
        </>
      )}
    </div>
  );
};

export default ForumDetails;
