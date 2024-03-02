import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAdminCreatedConcert } from "@/hooks/useConcertDetails";
import { ConcertCardProp } from "@/types/concertDetails";
import ConcertCard from "../Concert/ConcertCard";
import LoadingIndicator from "../Loading";

export default function Admin() {
  const router = useRouter();
  const { data, isLoading } = useAdminCreatedConcert("kc7gi4finn2si34e88kd");

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="relative lg:-top-20 lg:w-1/3">
      <div>
        <div className="mb-12">
          <h1 className="text-3xl text-center">Start Creating...</h1>
        </div>
        <Button
          variant="dark"
          size="lg"
          className="w-full"
          onClick={() => router.push("/form")}
        >
          Get Started
        </Button>
      </div>

      <div className="mt-12">
        <h1 className="text-3xl text-center">Previously Created</h1>
        {data?.data.map(
          ({
            concertid,
            performer,
            title,
            venue,
            date,
            time,
            capacity,
            description,
          }: ConcertCardProp) => (
            <ConcertCard
              key={concertid}
              concertid={concertid ?? 0}
              performer={performer}
              title={title}
              date={date}
              time={time}
              capacity={capacity}
              venue={venue}
              description={description}
            />
          )
        )}
      </div>
    </div>
  );
}
