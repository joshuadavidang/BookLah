"use client";

import { ProtectComponent } from "@/ProtectComponent";
import { backendAxiosPut } from "@/api/helper";
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
import { Button } from "@/components/ui/button";
import { useConcertDetail } from "@/hooks/useConcertDetails";
import { ConcertStatus, UserType } from "@/types/concertDetails";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { DISCOVER_URL } from "@/utils/constants";

const ConcertDetails = (params: any) => {
  const { slug } = params.params;
  const { data, isLoading } = useConcertDetail(slug);
  const router = useRouter();
  const isAdmin = localStorage.getItem("userType") === UserType.ADMIN;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <LoadingIndicator />;

  const concertDetails = data.data;

  const {
    concert_id,
    concert_status,
    date,
    performer,
    description,
    time,
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

  const handleBooking = async () => {
    const response = await axios.post(
      String(process.env.NEXT_PUBLIC_PROCESS_PAYMENT),
      {}
    );
    window.location.href = response.data.checkout_url;
  };

  const modalText =
    concert_status === ConcertStatus.AVAILABLE ? "Cancelled?" : "Available?";

  return (
    <div className="relative lg:-top-20 w-screen">
      <div className="flex justify-evenly">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="cursor-pointer" />{" "}
        </Button>
        <h1>{performer}</h1>
        <Badge
          variant={
            concert_status === ConcertStatus.AVAILABLE
              ? "success"
              : "destructive"
          }
        >
          {concert_status}
        </Badge>
      </div>

      <div className="flex justify-center pt-12">
        <div className="flex flex-col gap-3 px-8 lg:w-1/2 pt-6">
          <h2>{venue}</h2>
          <h2>
            {date} {time}
          </h2>
          <h2>{title}</h2>
          <h2>{description}</h2>
          <h2>Seats Available - {capacity}</h2>
          <div className="flex justify-center pt-6">
            {isAdmin ? (
              <div className="flex gap-4">
                <Button size="lg" variant="outline">
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
              <Button variant="dark" size="lg" onClick={handleBooking}>
                Book Ticket
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectComponent(ConcertDetails);
