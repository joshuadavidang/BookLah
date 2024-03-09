import { fetcher } from "@/api/helper";
import { BACK_END_API_URL } from "@/utils/constants";
import { type UserData, type UserInfo } from "@/utils/userInfo";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useAuth = (): UserData => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { data, error, isLoading } = useSWR<UserInfo>(
    `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_USER_DATA}`,
    fetcher
  );

  useEffect(() => {
    if (data?.code === 200) {
      setUser(data);
      localStorage.setItem("user", data.userData.sub);
    }
  }, [data]);

  return { user, error, isLoading };
};
