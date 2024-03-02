import { useConcertDetails } from "@/hooks/useConcertDetails";
import { ConcertCardProp } from "@/types/concertDetails";
import ConcertCard from "./ConcertCard";
import ConcertSearch from "./ConcertSearch";

export default function Concert() {
  const { data } = useConcertDetails();

  return (
    <div className="relative lg:-top-20">
      <h1 className="text-2xl mb-3">Discover the latest concert</h1>
      <h2 className="text-muted-foreground mb-5">Search for it below</h2>
      <ConcertSearch />
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
  );
}
