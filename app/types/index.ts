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
  concert_status: ConcertStatus;
  description: string;
}

interface ForumCardProp {
  id?: number;
  forum_id: number;
  performer: string;
  title: string;
}

export type { ConcertCardProp, ForumCardProp };
