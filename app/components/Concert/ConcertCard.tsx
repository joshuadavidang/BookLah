import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConcertCardProp } from "@/types/concertDetails";

export default function ConcertCard({
  performer,
  title,
  venue,
  date,
  time,
  capacity,
  concert_type,
}: ConcertCardProp) {
  return (
    <Card className="my-6 w-[300px] md:w-[400px] lg:w-[525px]">
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
