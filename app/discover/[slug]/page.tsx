"use client";

import { backendAxiosDelete } from "@/api/helper";
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
import { useAuth } from "@/hooks/useAuth";
import { useConcertDetail } from "@/hooks/useConcertDetails";
import { UserType } from "@/types/concertDetails";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConcertDetails(params: any) {
  const { slug } = params.params;
  const { data, isLoading } = useConcertDetail(slug);
  const router = useRouter();
  const { user } = useAuth();

  const isAdmin = user?.userData?.data?.userType === UserType.ADMIN;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <LoadingIndicator />;

  const concertDetails = data.data;

  const {
    concertid,
    date,
    performer,
    description,
    time,
    title,
    venue,
    capacity,
  } = concertDetails;

  const handleDelete = async (id: string) => {
    const apiURL = `${process.env.NEXT_PUBLIC_DELETE_CONCERT}/${id}`;
    const response = await backendAxiosDelete(apiURL);
    if (response.code === 200) {
      router.push("/discover");
    }
  };

  return (
    <div className="relative lg:-top-20 w-screen">
      <div className="flex justify-evenly">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="cursor-pointer" />{" "}
        </Button>
        <h1>{performer}</h1>
        <span></span>
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
                <Button size="lg">Edit</Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="secondary" size="lg">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your created concert and remove your data from
                        our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(concertid)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Button variant="dark" size="lg">
                Book Ticket
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
