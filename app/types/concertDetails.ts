export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface ConcertCardProp {
  id?: number;
  concertid: number;
  performer: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  description: string;
}

export type { ConcertCardProp };
