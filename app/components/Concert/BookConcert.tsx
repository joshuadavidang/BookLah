import Payment from "@/checkout/page";
import { DatePicker } from "@/components/DatePicker/index";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { bookingFormSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";
import Select from "../Select";

interface BookConcertProps {
  concert_id: string;
  price: number;
}

export default function BookConcert({
  concert_id,
  price = 0,
}: BookConcertProps) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      concertDate: new Date(),
      category: "",
      quantity: 0,
      seat: "",
    },
  });

  const handleChange = (e: any) => {
    const quantity = e.target.value;
    setTotalPrice(quantity * price);
  };

  const onSubmit = async (values: z.infer<typeof bookingFormSchema>) => {
    const data = {
      concert_id: concert_id,
      category: values.category,
      quantity: values.quantity,
    };
    const response = await axios.post(
      String(process.env.NEXT_PUBLIC_PROCESS_PAYMENT),
      data
    );
    window.location.href = response.data.checkout_url;
  };

  return (
    <div className="flex flex-col justify-center w-full gap-16">
      <div id="booking-form">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-slate-50 px-16 py-10 rounded-2xl shadow-3xl"
          >
            {showPayment ? (
              <Payment cancelPayment={() => setShowPayment(false)} />
            ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                  <DatePicker
                    control={form.control}
                    formLabel="Select date"
                    nameField="concertDate"
                  />

                  <Select
                    control={form.control}
                    formLabel="Select Category"
                    nameField="category"
                    placeholder="Category"
                    values={["Category 1", "Category 2", "Category 3"]}
                  />

                  <Select
                    control={form.control}
                    formLabel="Select Seat"
                    nameField="seat"
                    placeholder="Seat"
                    values={["A1", "A2", "A3"]}
                  />

                  <Input
                    control={form.control}
                    type="number"
                    nameField="quantity"
                    title="No. of tickets"
                    placeholder="e.g 5"
                    handleChange={handleChange}
                  />
                </div>

                <div className="flex flex-col pt-4 items-end gap-5">
                  <div className="flex items-center gap-4">
                    <p>Total</p>
                    <h1>S${totalPrice.toFixed(2)}</h1>
                  </div>
                  <Button
                    variant="colorScheme"
                    size="lg"
                    type="submit"
                    onClick={() => setShowPayment(true)}
                  >
                    Make Payment
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
