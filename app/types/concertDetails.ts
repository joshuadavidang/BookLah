export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum ConcertStatus {
  AVAILABLE = "AVAILABLE",
  CANCELLED = "CANCELLED",
}

interface ConcertCardProp {
  id?: number;
  concert_id: number;
  performer: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  description: string;
}

export type { ConcertCardProp };
