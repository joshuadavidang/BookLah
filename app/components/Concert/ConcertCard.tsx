import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/context";
import { ConcertCardProp, ConcertStatus, UserType } from "@/types";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

export default function ConcertCard({
  concert_id,
  performer,
  concert_status,
  title,
  venue,
  date,
  time,
}: ConcertCardProp) {
  const router = useRouter();
  const user = useContext(AuthContext);
  const isAdmin = user.userType === UserType.ADMIN;

  const navigateDetails = (concert_id: number) => {
    if (concert_status === ConcertStatus.AVAILABLE) {
      router.push(`/discover/${concert_id}`);
    }
  };

  return (
    <Card
      className={`${
        concert_status === ConcertStatus.CANCELLED && !isAdmin
          ? "bg-muted"
          : "cursor-pointer"
      } `}
      onClick={() => navigateDetails(concert_id)}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center gap-1">
            <h1
              className={`${
                concert_status === ConcertStatus.CANCELLED && "opacity-50"
              } text-2xl"`}
            >
              {title}
            </h1>

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
        </CardTitle>
        <CardDescription
          className={`${
            concert_status === ConcertStatus.CANCELLED && "opacity-50"
          } text-2xl"`}
        >
          {performer}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`${
          concert_status === ConcertStatus.CANCELLED && "opacity-50"
        } text-2xl"`}
      >
        <p>
          {format(date, "PPP")}, {time}
        </p>
        <p>{venue}</p>
      </CardContent>
    </Card>
  );
}
