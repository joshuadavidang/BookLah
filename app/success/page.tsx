"use client";

import { backendAxiosPost } from "@/api/helper";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { DISCOVER_URL } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Success = () => {
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const router = useRouter();
  const searchParam = useSearchParams();
  const clientSecret = searchParam.get("payment_intent") || "";

  const getCustomerInfo = async () => {
    try {
      const response = await backendAxiosPost(
        String(process.env.NEXT_PUBLIC_GET_CUSTOMER_DATA),
        {
          client_secret: clientSecret,
        }
      );
      setCustomerEmail(response.data.receipt_email);
    } catch (err) {
      router.push(DISCOVER_URL);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

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
