import { fetcher } from "@/api/helper";
import useSWR from "swr";

export const useConcertDetails = () => {
  const concertDetailsAPI = String(process.env.NEXT_PUBLIC_GET_CONCERTS);
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useConcertDetail = (concert_id: string) => {
  const concertDetailsAPI =
    process.env.NEXT_PUBLIC_GET_CONCERT + `/${concert_id}` || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useSeatCount = (concert_id: string) => {
  const seatsAPI =
    process.env.NEXT_PUBLIC_GET_SEAT_COUNT + `/${concert_id}` || "";
  const { data, error, isLoading } = useSWR(seatsAPI, fetcher);
  return { data, error, isLoading };
};

export const useSeat = (concert_id: string) => {
  const seatsAPI = process.env.NEXT_PUBLIC_FETCH_SEATS + `/${concert_id}` || "";
  const { data, error, isLoading } = useSWR(seatsAPI, fetcher);
  return { data, error, isLoading };
};

export const useAdminCreatedConcert = (userId: string) => {
  const concertDetailsAPI =
    process.env.NEXT_PUBLIC_ADMIN_CREATED_CONCERT + `/${userId}` || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};
