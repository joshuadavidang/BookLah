"use client";

import { DISCOVER_URL, LANDING_URL } from "@/utils/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserInfo } from "./api";
import { backendAxiosPost } from "./api/helper";
import LoadingIndicator from "./components/Loading";
import { AuthContext } from "./context";
import { UserType } from "./types/concertDetails";
import { type UserData } from "./utils/userInfo";

interface ProtectComponentProps {
  children: React.ReactNode;
}

export const ProtectComponent = ({ children }: ProtectComponentProps) => {
  const { data, isLoading, error } = useUserInfo();
  const router = useRouter();
  const [profile, setProfile] = useState<UserData>({
    userId: "",
    name: "",
    userType: UserType.USER,
  });

  useEffect(() => {
    if (data?.code === 401 || error) return redirect(LANDING_URL);
    else if (data?.code === 200) {
      const user: UserData = {
        userId: data?.userData?.sub ?? "",
        name: data?.userData?.data["myinfo.name"] ?? "",
        userType: data?.userData?.data?.userType ?? UserType.USER,
      };

      setProfile(user);
      router.push(DISCOVER_URL);
      const userInfoAPI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${process.env.NEXT_PUBLIC_SAVE_USER_INFORMATION}`;
      backendAxiosPost(userInfoAPI, user);
    }
  }, [data, error, router]);

  if (isLoading) return <LoadingIndicator />;

  return (
    <AuthContext.Provider value={profile}>{children}</AuthContext.Provider>
  );
};
