import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConcertCardProp } from "@/types/concertDetails";
import { useRouter } from "next/navigation";

export default function ConcertCard({
  concert_id,
  performer,
  title,
  venue,
  date,
  time,
}: ConcertCardProp) {
  const router = useRouter();
  const navigateDetails = (concert_id: number) => {
    router.push(`/discover/${concert_id}`);
  };

  return (
    <Card
      className="cursor-pointer"
      onClick={() => navigateDetails(concert_id)}
    >
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
    </Card>
  );
}
