import { fetcher } from "@/api/helper";
import { BACK_END_API_URL } from "@/utils/constants";
import { type UserData, type UserInfo } from "@/utils/userInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useUserData = (): UserData => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const { data, error, isLoading } = useSWR<UserInfo>(
    `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_USER_DATA}`,
    fetcher
  );

  useEffect(() => {
    if (data?.code === 440) {
      alert("Session expired!");
      router.push("/");
    }
  }, [data, router]);

  useEffect(() => {
    if (!isLoading && !error && data && data.code === 200) {
      setUser(data);
    }
  }, [data, error, isLoading]);

  return { user, error, isLoading };
};
