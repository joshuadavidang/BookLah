"use client";

import { backendAxiosPost } from "@/api/helper";
import { Button } from "@/components/ui/button";
import { SUCCESS_URL } from "@/utils/constants";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CheckoutFormProps {
  cancelPayment: () => void;
  bookingForm: any;
  totalPrice: number;
}

export default function CheckoutForm({
  cancelPayment,
  bookingForm,
  totalPrice,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else {
      const apiURL = String(process.env.NEXT_PUBLIC_CREATE_BOOKING);
      const data = {
        ...bookingForm,
        email: email,
        price: totalPrice,
      };
      const response = await backendAxiosPost(apiURL, data);
      if (response.code === 201) {
        toast("Purchase Successful");
        router.push(SUCCESS_URL);
      }
    }

    setIsProcessing(false);
  };

  return (
    <form className="flex flex-col items-center gap-8 mx-auto bg-slate-100 p-12 rounded-3xl">
      <LinkAuthenticationElement
        onChange={(e: any) => setEmail(e.value.email)}
      />
      <PaymentElement />
      <div className="flex gap-5">
        <Button variant="outline" onClick={cancelPayment} size="lg">
          Cancel
        </Button>
        <Button
          variant="colorScheme"
          size="lg"
          disabled={isProcessing}
          onClick={handleSubmit}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </Button>
      </div>
    </form>
  );
}
