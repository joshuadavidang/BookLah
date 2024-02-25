enum ConcertType {
  SOLO = "SOLO",
  GROUP = "GROUP",
}

interface ConcertCardProp {
  id?: number;
  performer: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  concert_type?: ConcertType;
}

export type { ConcertCardProp };
