import { useConcertDetails } from "@/api";
import { ConcertCardProp } from "@/types/concertDetails";
import Image from "next/image";
import { useState } from "react";
import CTA from "~/cta.svg";
import ConcertCard from "./ConcertCard";
import ConcertSearch from "./ConcertSearch";

export default function Concert() {
  const { data } = useConcertDetails();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredConcerts = data?.data?.concerts.filter(
    ({ title }: ConcertCardProp) =>
      title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center relative lg:-top-40 gap-12 w-screen">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <Image src={CTA} alt="hero" width="280" height="300" />
        <div>
          <h1 className="text-2xl mb-3">Discover the latest concert</h1>
          <h2 className="text-muted-foreground mb-5">Search for it below</h2>
          <ConcertSearch onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
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
