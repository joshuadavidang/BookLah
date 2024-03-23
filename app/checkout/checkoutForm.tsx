import { Button } from "@/components/ui/button";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface CheckoutFormProps {
  cancelPayment: () => void;
}

export default function CheckoutForm({ cancelPayment }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        receipt_email: email,
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsProcessing(false);
  };

  return (
    <form className="flex flex-col items-center gap-8 mx-auto">
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
