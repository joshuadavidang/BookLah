import { backendAxiosDelete } from "@/api/helper";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";

export default function SuccessComponent({ data }: any) {
  const { concertid, performer, date, time, title, venue } = data;
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const apiURL = `${process.env.NEXT_PUBLIC_DELETE_CONCERT}/${id}`;
    const response = await backendAxiosDelete(apiURL);
    if (response.code === 200) {
      router.push("/discover");
    }
  };

  return (
    <div>
      <h1>Here's what you have created!</h1>
      <Card className="my-6 w-[300px] md:w-[400px] lg:w-[525px] cursor-pointer">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-1">
              <h1 className="text-2xl">{title}</h1>
            </div>
          </CardTitle>
          <CardDescription>{performer}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{date}</p>
          <p>{venue}</p>
          <p>{time}</p>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pr-12">
          <Button variant="link">Edit</Button>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="secondary" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your created concert and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(concertid)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/discover")}
          >
            View All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
