import { useConcertDetails } from "@/api";
import { Button } from "@/components/ui/button";
import { ConcertCardProp } from "@/types/concertDetails";
import { ORDERS_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CTA from "~/cta.svg";
import ConcertCard from "./ConcertCard";
import ConcertSearch from "./ConcertSearch";

export default function Concert() {
  const router = useRouter();
  const { data } = useConcertDetails();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredConcerts = data?.data?.concerts.filter(
    ({ title }: ConcertCardProp) =>
      title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center relative lg:-top-40 gap-12 w-screen">
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-6">
        <Image src={CTA} alt="hero" width="350" height="300" />
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push(ORDERS_URL)}
        >
          View Booked Concerts
        </Button>
      </div>

      <div className="flex flex-col gap-5 w-1/2">
        <h1 className="text-2xl">Discover the latest concert</h1>
        <ConcertSearch onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-24 w-full">
        {filteredConcerts?.map(
          ({
            concert_id,
            performer,
            title,
            venue,
            date,
            time,
            capacity,
            description,
            concert_status,
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
  );
}
