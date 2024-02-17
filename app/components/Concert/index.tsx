import { concertDummyData } from "@/data/sampleData";
import ConcertCard from "./ConcertCard";
import ConcertSearch from "./ConcertSearch";

export default function Concert() {
  return (
    <div className="relative lg:-top-20">
      <h1 className="text-2xl mb-3">Discover the latest concert</h1>
      <h2 className="text-muted-foreground mb-5">Search for it below</h2>
      <ConcertSearch />
      {concertDummyData.map(({ id, name, guest, date, time, location }) => (
        <ConcertCard
          key={id}
          name={name}
          guest={guest}
          date={date}
          time={time}
          location={location}
        />
      ))}
    </div>
  );
}
