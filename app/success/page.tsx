"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context";
import { DISCOVER_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Success = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center text-left gap-6">
      <h1 className="text-2xl">Yay, Order Confirmation 🎉</h1>
      <h2>
        Thank you for your purchase,{" "}
        <span className="font-semibold">{user.name}</span>!
      </h2>
      <h2>You will receive an email confirmation shortly.</h2>
      <div>
        <Button variant="outline" onClick={() => router.push(DISCOVER_URL)}>
          Discover More Concert
        </Button>
      </div>
    </div>
  );
};

export default Success;
