import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DISCOVER_URL } from "@/utils/constants";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function SuccessComponent({ data }: any) {
  const { performer, date, time, title, venue } = data?.concert_result?.data;

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
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
          <p>
            {format(date, "PPP")}, {time}
          </p>
          <p>{venue}</p>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pr-12">
          <Button
            variant="colorScheme"
            size="sm"
            onClick={() => router.push(DISCOVER_URL)}
          >
            View All Created Concerts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
