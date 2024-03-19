"use client";

import { backendAxiosPut } from "@/api/helper";
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
import { useConcertDetail } from "@/api";
import { ConcertStatus, UserType } from "@/types/concertDetails";
import { DISCOVER_URL, FORM_URL } from "@/utils/constants";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context";
import { format } from "date-fns";

const ConcertDetails = (params: any) => {
  const { slug } = params.params;
  const { data, isLoading } = useConcertDetail(slug);
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
    capacity,
  } = concertDetails;

  const handleUpdate = async (id: string) => {
    const apiURL = `${process.env.NEXT_PUBLIC_UPDATE_CONCERT_STATUS}/${id}`;
    const response = await backendAxiosPut(apiURL, {
      concertStatus:
        concert_status === ConcertStatus.AVAILABLE
          ? ConcertStatus.CANCELLED
          : ConcertStatus.AVAILABLE,
    });
    if (response.code === 200) {
      router.push(DISCOVER_URL);
    }
  };

  const modalText =
    concert_status === ConcertStatus.AVAILABLE ? "Cancelled?" : "Available?";

  return (
    <div className="relative lg:-top-20 w-screen">
      <div className="flex justify-evenly">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex gap-2 items-center"
        >
          <ArrowLeft size="18" /> Back
        </Button>

        <h1>{performer}</h1>
        {isAdmin ? (
          <Badge
            variant={
              concert_status === ConcertStatus.AVAILABLE
                ? "success"
                : "destructive"
            }
          >
            {concert_status}
          </Badge>
        ) : (
          <Badge
            variant={
              concert_status === ConcertStatus.AVAILABLE
                ? "success"
                : "destructive"
            }
          >
            {capacity} SEATS AVAILABLE
          </Badge>
        )}
      </div>

      <div className="flex justify-center pt-12">
        <div className="flex flex-col lg:flex-row justify-center gap-8 px-8 pt-6">
          <div className="bg-slate-50 p-12 rounded-2xl lg:w-1/3 shadow-3xl">
            <h2>{venue}</h2>
            <h2>
              {format(date, "PPP")}, {time}
            </h2>
            <h2>{title}</h2>
            <h2>{description}</h2>
            <h2>${price}</h2>
          </div>

          <div className="flex items-center justify-center lg:w-1/2">
            {isAdmin ? (
              <div className="flex gap-4">
                <Button size="lg" variant="outline" onClick={handleEdit}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    {concert_status === ConcertStatus.AVAILABLE ? (
                      <Button variant="secondary" size="lg">
                        Cancel Concert
                      </Button>
                    ) : (
                      <Button variant="green" size="lg">
                        Make Available
                      </Button>
                    )}
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
                      <AlertDialogAction
                        onClick={() => handleUpdate(concert_id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <BookConcert concert_id={concert_id} price={price} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetails;
