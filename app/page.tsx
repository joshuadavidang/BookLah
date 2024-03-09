"use client";

import { fetcher } from "@/api/helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { BACK_END_API_URL, DISCOVER_URL } from "@/utils/constants";
import Image from "next/image";
import Flash from "~/flash.png";
import Hero from "~/hero.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Singpass from "~/singpass.svg";
import { UserType } from "./types/concertDetails";

export default function Home() {
  const router = useRouter();

  const handleSingPassBtn = async (userType: UserType) => {
    const response = await fetcher(
      `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_AUTH}?code=${userType}`
    );
    window.location.href = response.url;
  };

  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    if (user !== null) {
      router.push(DISCOVER_URL);
    }
  }, [user, router]);

  return (
    <main className="flex flex-col md:flex-row h-screen w-full pt-24 md:pt-0">
      <div className="w-screen md:w-2/5 flex flex-col justify-center items-center px-12 md:bg-slate-100">
        <h1 className="text-3xl">Your Ultimate Concert Booking Solution</h1>
        <Image src={Hero} width={500} height={500} alt="Hero" priority />
        <h2 className="text-lg hidden md:block">BookLah!</h2>
      </div>
      <div className="w-fit flex flex-col justify-center items-center md:w-3/5">
        <Card className="mx-6 w-screen md:w-[400px] lg:w-[525px]">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-1 pb-3">
                <Image src={Flash} width={50} alt="flash" />
                <h1 className="text-2xl">BookLah!</h1>
              </div>
            </CardTitle>
            <CardDescription>Get Started</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Button
              variant="dark"
              size="md"
              onClick={() => handleSingPassBtn(UserType.USER)}
            >
              Login with
              <Image
                src={Singpass}
                alt="Singpass"
                width={80}
                className="ml-1 mt-1.5"
              />
            </Button>

            <Button
              variant="link"
              size="md"
              onClick={() => handleSingPassBtn(UserType.ADMIN)}
            >
              Login as Concert Organiser
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
