"use client";

import { backendAxiosPost, fetcher } from "@/api/helper";
import { BACK_END_API_URL } from "@/utils/constants";
import { type UserInfo } from "@/utils/userInfo";
import { useEffect } from "react";
import useSWR from "swr";
import LoadingIndicator from "./components/Loading";
import { UserType } from "./types/concertDetails";

export const ProtectComponent = (WrappedComponent: any) => {
  return function ProtectComponent(props: any) {
    const {
      data: userData,
      error,
      isLoading,
    } = useSWR<UserInfo>(
      `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_USER_DATA}`,
      fetcher
    );

    useEffect(() => {
      if (userData && userData.code === 200) {
        const isAdmin = userData.userData.data.userType === UserType.ADMIN;
        const name = userData.userData.data["myinfo.name"] || "Guest";

        localStorage.setItem("user", userData.userData.sub);
        localStorage.setItem(
          "userType",
          isAdmin ? UserType.ADMIN : UserType.USER
        );
        localStorage.setItem("name", name);

        const dataObj = {
          userId: userData.userData.sub,
          name: name,
          gender: "Male",
          userType: userData.userData.data.userType,
        };

        const apiURL = `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_SAVE_USER_INFORMATION}`;
        backendAxiosPost(apiURL, dataObj);
      }
    }, [userData]);

    if (isLoading) return <LoadingIndicator />;
    if (error) return <div>Error loading user data</div>;

    return <WrappedComponent {...props} />;
  };
};