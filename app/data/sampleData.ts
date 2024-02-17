import { v4 as uuidv4 } from "uuid";

type ConcertProps = {
  id: string;
  name: string;
  guest: string;
  date: string; // to update to the correct type
  time: string; // to update to the correct type
  location: string;
};

const concertDummyData: ConcertProps[] = [
  {
    id: uuidv4(),
    name: "Mathematics Tour",
    guest: "Ed Sheeran",
    date: "16 Feb 2024", // to update to the correct type
    time: "7pm", // to update to the correct type
    location: "Singapore National Stadium",
  },
  {
    id: uuidv4(),
    name: "Cosy Night Tour",
    guest: "Ed Sheeran",
    date: "17 Feb 2024", // to update to the correct type
    time: "8pm", // to update to the correct type
    location: "Capitol Theatre",
  },
];

export { concertDummyData, type ConcertProps };
