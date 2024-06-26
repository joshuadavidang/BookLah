"use client";

import { useConcertDetail, useSeatCount } from "@/api/concert";
import { backendAxiosPost, backendAxiosPut } from "@/api/helper";
import BookConcert from "@/components/Concert/BookConcert";
import LoadingIndicator from "@/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context";
import { ConcertStatus, UserType } from "@/types";
import { DISCOVER_URL, FORM_URL } from "@/utils/constants";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

const ConcertDetails = (params: any) => {
  const { slug } = params.params;
  const { data, isLoading } = useConcertDetail(slug);
  const seatAPI = useSeatCount(slug);
  const router = useRouter();
  const user = useContext(AuthContext);
  const isAdmin = user.userType === UserType.ADMIN;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <LoadingIndicator />;

  const concertDetails = data.data;

  const handleEdit = () => {
    router.push(`${FORM_URL}/${slug}`);
  };

  const {
    concert_id,
    concert_status,
    date,
    performer,
    description,
    time,
    price,
    title,
    venue,
  } = concertDetails;

  const soldOut = seatAPI?.data?.data?.numSeatsAvailable === 0;

  const handleUpdate = async () => {
    if (ConcertStatus.CANCELLED === concert_status) {
      const apiURL = `${process.env.NEXT_PUBLIC_UPDATE_CONCERT_STATUS}/${concert_id}`;
      const response = await backendAxiosPut(apiURL, {
        concertStatus:
          concert_status === ConcertStatus.AVAILABLE
            ? ConcertStatus.CANCELLED
            : ConcertStatus.AVAILABLE,
      });
      if (response.code === 200) {
        router.push(DISCOVER_URL);
      }
    } else {
      const apiURL = String(process.env.NEXT_PUBLIC_CANCEL_CONCERT);
      const data = {
        concert_id: concert_id,
      };
      const response = await backendAxiosPost(apiURL, data);
      if (response.code === 201) {
        toast.success("Concert has been cancelled");
        router.push(DISCOVER_URL);
      }
    }
  };

  const modalText =
    concert_status === ConcertStatus.AVAILABLE ? "Cancelled?" : "Available?";

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

        <h1>{performer}</h1>

        <div className="flex gap-2 items-center">
          {soldOut ? (
            <Badge variant="destructive">Tickets Sold Out</Badge>
          ) : (
            <>
              <Badge
                variant={
                  concert_status === ConcertStatus.AVAILABLE
                    ? "success"
                    : "destructive"
                }
              >
                {seatAPI?.data?.data?.numSeatsAvailable}
              </Badge>
              Seats Available
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-12">
        <div className="flex flex-col justify-center gap-8 px-8 pt-6">
          <div className="flex flex-col gap-5 bg-green-100 p-12 rounded-2xl shadow-3xl lg:max-w-[1000px]">
            <h3 className="font-semibold">{venue}</h3>
            <h3 className="font-semibold">
              {format(date, "PPP")}, {time}
            </h3>
            <h3 className="font-semibold">{title}</h3>
            <h3>{description}</h3>
            <h3>${price}</h3>
          </div>

          {!isAdmin && (
            <BookConcert
              concert_id={concert_id}
              price={price}
              soldOut={soldOut}
            />
          )}

          {isAdmin && (
            <div className="flex items-center justify-center min-w-[800px]">
              <div className="flex gap-4">
                <Button size="lg" variant="outline" onClick={handleEdit}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="secondary" size="lg">
                      Cancel Concert
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Update concert to {modalText}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdate}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcertDetails;
