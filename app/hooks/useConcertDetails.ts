import { fetcher } from "@/api/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useConcertDetails = () => {
  const concertDetailsAPI = process.env.NEXT_PUBLIC_GET_CONCERTS || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);

  return { data, error, isLoading };
};
