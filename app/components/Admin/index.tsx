import { useAdminCreatedConcert } from "@/hooks/useConcertDetails";
import { ConcertCardProp } from "@/types/concertDetails";
import { useRouter } from "next/navigation";
import ConcertCard from "../Concert/ConcertCard";
import LoadingIndicator from "../Loading";
import { Button } from "../ui/button";
import { FORM_URL } from "@/utils/constants";

export default function Admin() {
  const router = useRouter();
  const userId = localStorage.getItem("user") || "";
  const { data, isLoading } = useAdminCreatedConcert(userId);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="w-screen relative lg:-top-20">
      <div className="flex flex-col justify-center text-center gap-2 ">
        <h1 className="text-2xl mb-4">Start Creating...</h1>
        <div>
          <Button
            variant="dark"
            size="lg"
            className="w-1/3"
            onClick={() => router.push(FORM_URL)}
          >
            Get Started
          </Button>
        </div>
      </div>

      {data && (
        <div className="flex flex-col px-12 mt-12 gap-6">
          <h1 className="text-2xl text-center">Previously Created</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
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
      )}
    </div>
  );
}
