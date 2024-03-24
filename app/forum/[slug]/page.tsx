"use client";

import { useConcertDetail } from "@/api";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ForumDetails = (params: any) => {
  const { slug } = params.params;
  const { data, isLoading } = useConcertDetail(slug);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <LoadingIndicator />;

  const concertDetails = data.data;

  const { date, performer, description, time, price, title, venue } =
    concertDetails;

  return (
    <div className="relative lg:-top-20 w-screen">
      <div className="flex justify-evenly items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex gap-2 items-center"
        >
          <ArrowLeft size="18" /> Back
        </Button>
        <h1>{performer}'s Community Forum</h1>
        <Button variant="link" className="text-sm">
          Leave Forum
        </Button>
      </div>

      <div className="flex justify-center pt-12">
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
      </div>
    </div>
  );
};

export default ForumDetails;
