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
  concertid,
  performer,
  title,
  venue,
  date,
  time,
}: ConcertCardProp) {
  const router = useRouter();
  const navigateDetails = (concertid: number) => {
    router.push(`/discover/${concertid}`);
  };

  return (
    <Card
      className="my-6 w-[300px] md:w-[400px] lg:w-[525px] cursor-pointer"
      onClick={() => navigateDetails(concertid)}
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
