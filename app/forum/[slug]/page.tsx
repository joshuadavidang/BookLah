"use client";

import { useForumDetail } from "@/api";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ForumDetails = (params: any) => {
  const { slug } = params.params;
  const { data, isLoading } = useForumDetail(slug);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <LoadingIndicator />;

  const forumDetail = data.data;

  const { content, title } = forumDetail;

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

      <div className="flex justify-center">
        <form className="flex flex-col lg:flex-row justify-center lg:w-1/2 relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Textarea
            placeholder="Add a comment here..."
            className="min-h-[100px] resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-4">
            <Button type="submit" variant="dark" size="sm">
              <p className="text-xs"> Add a Comment</p>
              <CornerDownLeft className="ml-2 size-3.5" />
            </Button>
          </div>
        </form>
      </div>

      {/* <div className="flex justify-center pt-12">
        <div className="flex flex-col lg:flex-row justify-center gap-8 px-8 pt-6">
          <div className="flex flex-col gap-5 bg-slate-50 p-12 rounded-2xl shadow-3xl">
            <h3 className="font-semibold">{venue}</h3>
            <h3 className="font-semibold">
              {format(date, "PPP")}, {time}
            </h3>
            <h3 className="font-semibold">{title}</h3>
            <h3>{description}</h3>
            <h3>${price}</h3>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ForumDetails;
