import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ConcertCardProp,
  ConcertStatus,
  UserType,
} from "@/types/concertDetails";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

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

  const isAdmin = localStorage.getItem("userType") === UserType.ADMIN;

  const navigateDetails = (concert_id: number) => {
    if (concert_status === ConcertStatus.AVAILABLE) {
      router.push(`/discover/${concert_id}`);
    } else if (isAdmin) {
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
                concert_status === ConcertStatus.CANCELLED &&
                !isAdmin &&
                "opacity-50"
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
            concert_status === ConcertStatus.CANCELLED &&
            !isAdmin &&
            "opacity-50"
          } text-2xl"`}
        >
          {performer}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`${
          concert_status === ConcertStatus.CANCELLED && !isAdmin && "opacity-50"
        } text-2xl"`}
      >
        <p>{date}</p>
        <p>{venue}</p>
        <p>{time}</p>
      </CardContent>
    </Card>
  );
}
