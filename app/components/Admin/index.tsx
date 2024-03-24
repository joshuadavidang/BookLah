import { useAdminCreatedConcert } from "@/api";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context";
import { ConcertCardProp } from "@/types";
import { FORM_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import CTA from "~/cta.svg";
import ConcertCard from "../Concert/ConcertCard";
import LoadingIndicator from "../Loading";

export default function Admin() {
  const router = useRouter();
  const user = useContext(AuthContext);
  const { data, isLoading } = useAdminCreatedConcert(user.userId);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="w-screen relative lg:-top-40">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <Image src={CTA} alt="hero" width="350" height="300" />
        <div className="flex flex-col gap-6 lg:w-1/4">
          <h1 className="text-2xl">List a Concert</h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(FORM_URL)}
          >
            Get Started
          </Button>
        </div>
      </div>

      {data && (
        <div className="flex flex-col px-12 mt-24 gap-6">
          <h1 className="text-2xl text-center">Your Created Concert</h1>
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
