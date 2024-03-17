"use client";

import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { DISCOVER_URL } from "@/utils/constants";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Success = () => {
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const router = useRouter();
  const searchParam = useSearchParams();
  const sessionId = searchParam.get("session_id") || "";

  const getCustomerInfo = async () => {
    try {
      const response = await axios.post(
        String(process.env.NEXT_PUBLIC_GET_CUSTOMER_EMAIL),
        {
          sessionId: sessionId,
        }
      );
      setCustomerEmail(response.data.email);
    } catch (err) {
      router.push(DISCOVER_URL);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  });

  if (!customerEmail) {
    return <LoadingIndicator />;
  }

  return (
    <div className="flex flex-col items-center text-left gap-6">
      <h1 className="text-2xl">Yay, Order Confirmation 🎉</h1>
      <h2>
        Thank you for your purchase,{" "}
        <span className="font-semibold">{customerEmail}</span>!
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
