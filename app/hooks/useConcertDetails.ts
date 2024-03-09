import { fetcher } from "@/api/helper";
import useSWR from "swr";

export const useConcertDetails = () => {
  const concertDetailsAPI = String(process.env.NEXT_PUBLIC_GET_CONCERTS);
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useConcertDetail = (concertid: string) => {
  const concertDetailsAPI =
    process.env.NEXT_PUBLIC_GET_CONCERT + `/${concertid}` || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useAdminCreatedConcert = (userId: string) => {
  const concertDetailsAPI =
    process.env.NEXT_PUBLIC_ADMIN_CREATED_CONCERT + `/${userId}` || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};
