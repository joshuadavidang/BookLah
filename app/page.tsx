"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Flash from "~/flash.png";
import Hero from "~/hero.png";
import AuthenticationButton from "./components/Authentication";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen w-full pt-24 md:pt-0">
      <div className="w-screen md:w-2/5 flex flex-col justify-center items-center px-12 md:bg-slate-100">
        <h1 className="text-3xl">Your Ultimate Concert Booking Solution</h1>
        <Image src={Hero} width={500} height={500} alt="Hero" priority />
        <h2 className="text-lg hidden md:block">BookLah!</h2>
      </div>
      <div className="w-fit flex flex-col justify-center items-center md:w-3/5">
        <Card className="mx-6 md:w-[400px] lg:w-[525px]">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-1">
                <Image src={Flash} width={50} alt="flash" />
                <h1 className="text-2xl">BookLah!</h1>
              </div>
            </CardTitle>
            <CardDescription>Get Started</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthenticationButton />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
