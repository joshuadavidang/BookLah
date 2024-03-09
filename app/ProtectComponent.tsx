"use client";

import { backendAxiosPost, fetcher } from "@/api/helper";
import { BACK_END_API_URL } from "@/utils/constants";
import { type UserInfo } from "@/utils/userInfo";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingIndicator from "./components/Loading";
import { UserType } from "./types/concertDetails";

export const ProtectComponent = (WrappedComponent: any) => {
  return function ProtectComponent(props: any) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const { data, isLoading } = useSWR<UserInfo>(
      `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_USER_DATA}`,
      fetcher
    );

    useEffect(() => {
      if (data?.code === 200) {
        setUser(data);

        const isAdmin = user?.userData.data.userType === UserType.ADMIN;
        const name = user?.userData.data["myinfo.name"] || "Guest";

        localStorage.setItem("user", data.userData.sub);
        localStorage.setItem(
          "userType",
          isAdmin ? UserType.ADMIN : UserType.USER
        );
        localStorage.setItem("name", name);

        const dataObj = {
          userId: user?.userData.sub,
          name: name,
          gender: "Male",
          userType: user?.userData.data.userType,
        };

        const apiURL = `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_SAVE_USER_INFORMATION}`;
        backendAxiosPost(apiURL, dataObj);
      }
    }, [data, user]);

    if (isLoading) return <LoadingIndicator />;

    return <WrappedComponent {...props} />;
  };
};
