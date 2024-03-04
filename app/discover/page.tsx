"use client";

import { backendAxiosPost } from "@/api/helper";
import Admin from "@/components/Admin";
import Concert from "@/components/Concert";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserType } from "@/types/concertDetails";
import { BACK_END_API_URL } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Discover() {
  const { user, isLoading } = useAuth();
  const [nameData, setNameData] = useState<string>();
  const path = usePathname();
  const smoothScroll = path === "/discover";

  useEffect(() => {
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  useEffect(() => {
    if (user) {
      const name = user?.userData.data["myinfo.name"] || "Guest";
      setNameData(name);

      const dataObj = {
        userId: user?.userData.sub,
        name: name,
        gender: "Male",
        userType: user?.userData.data.userType,
      };

      const apiURL = `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_SAVE_USER_INFORMATION}`;
      backendAxiosPost(apiURL, dataObj);
    }
  }, [user]);

  const isAdmin = user?.userData.data.userType === UserType.ADMIN;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="hidden absolute top-10 right-10 justify-end lg:flex w-screen">
        <Button variant="link" size="lg" className="text-gray-100">
          {nameData}
        </Button>
      </div>
      {isAdmin ? <Admin /> : <Concert />}
    </>
  );
}
