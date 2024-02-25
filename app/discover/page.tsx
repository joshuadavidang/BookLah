"use client";

import { backendAxiosPost } from "@/api/helper";
import Concert from "@/components/Concert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BACK_END_API_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

const TopPattern = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fillOpacity="1"
        d="M0,192L48,192C96,192,192,192,288,170.7C384,149,480,107,576,106.7C672,107,768,149,864,160C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
  );
};

export default function Discover() {
  const { user, isLoading } = useAuth();
  const [nameData, setNameData] = useState<string>();

  useEffect(() => {
    if (user) {
      const name = user?.userData.data["myinfo.name"] || "Guest";
      setNameData(name);

      const dataObj = {
        userId: user?.userData.sub,
        name: name,
        gender: "Male",
      };

      const apiURL = `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_SAVE_USER_INFORMATION}`;
      backendAxiosPost(apiURL, dataObj);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-start items-center min-h-screen">
      <TopPattern />
      <div className="hidden absolute top-10 right-10 justify-end lg:flex w-screen">
        <Button variant="link" size="lg">
          {nameData}
        </Button>
      </div>
      <Concert />
    </main>
  );
}
