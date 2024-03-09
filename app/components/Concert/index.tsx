import { useConcertDetails } from "@/hooks/useConcertDetails";
import { ConcertCardProp } from "@/types/concertDetails";
import ConcertCard from "./ConcertCard";
import ConcertSearch from "./ConcertSearch";

export default function Concert() {
  const { data } = useConcertDetails();

  return (
    <div className="flex flex-col justify-center items-center relative lg:-top-20 gap-12">
      <div className="lg:w-1/2">
        <h1 className="text-2xl mb-3">Discover the latest concert</h1>
        <h2 className="text-muted-foreground mb-5">Search for it below</h2>
        <ConcertSearch />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 px-12">
        {data?.data.concerts.map(
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
