import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ConcertDisplayProps = {
  name: string;
  guest: string;
  date: string;
  time: string;
  location: string;
};

export default function ConcertCard({
  name,
  guest,
  date,
  time,
  location,
}: ConcertDisplayProps) {
  return (
    <Card className="my-6 w-[300px] md:w-[400px] lg:w-[525px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-1">
            <h1 className="text-2xl">{name}</h1>
          </div>
        </CardTitle>
        <CardDescription>{guest}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{date}</p>
        <p>{time}</p>
        <p>{location}</p>
      </CardContent>
    </Card>
  );
}
