import { Button } from "@/components/ui/button";
import { PaymentElement } from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  cancelPayment: () => void;
}

export default function CheckoutForm({ cancelPayment }: CheckoutFormProps) {
  return (
    <div className="flex flex-col items-center gap-8 mx-auto lg:w-1/2">
      <PaymentElement />
      <div className="flex gap-5">
        <Button variant="outline" onClick={cancelPayment} size="lg">
          Cancel
        </Button>
        <Button variant="colorScheme" size="lg">
          Pay
        </Button>
      </div>
    </div>
  );
}
