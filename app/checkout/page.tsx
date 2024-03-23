"use client";

import { backendAxiosPost, fetcher } from "@/api/helper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkoutForm";

interface PaymentProps {
  totalPrice: number;
  cancelPayment: () => void;
}

export default function Payment({ totalPrice, cancelPayment }: PaymentProps) {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>();

  const getPublishableKey = async () => {
    const configAPI = String(process.env.NEXT_PUBLIC_STRIPE_CONFIG);
    const { publishable_key } = await fetcher(configAPI);
    setStripePromise(loadStripe(publishable_key));
  };

  const getPaymentIntent = async () => {
    const PaymentIntentAPI = String(
      process.env.NEXT_PUBLIC_CREATE_PAYMENT_INTENT
    );

    const data = {
      price: totalPrice,
    };

    const { client_secret } = await backendAxiosPost(PaymentIntentAPI, data);
    setClientSecret(client_secret);
  };

  useEffect(() => {
    getPublishableKey();
    getPaymentIntent();
  }, []);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm cancelPayment={cancelPayment} />
        </Elements>
      )}
    </>
  );
}
