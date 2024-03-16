import { useAdminCreatedConcert } from "@/api";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context";
import { ConcertCardProp } from "@/types/concertDetails";
import { FORM_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import ConcertCard from "../Concert/ConcertCard";
import LoadingIndicator from "../Loading";

export default function Admin() {
  const router = useRouter();
  const user = useContext(AuthContext);
  const { data, isLoading } = useAdminCreatedConcert(user.userId);

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
                concert_id,
                performer,
                title,
                venue,
                date,
                time,
                capacity,
                concert_status,
                description,
              }: ConcertCardProp) => (
                <ConcertCard
                  key={concert_id}
                  concert_id={concert_id ?? 0}
                  performer={performer}
                  title={title}
                  date={date}
                  time={time}
                  capacity={capacity}
                  venue={venue}
                  description={description}
                  concert_status={concert_status}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
