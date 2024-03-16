import { DatePicker } from "@/components/DatePicker/index";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { bookingFormSchema } from "@/model/formSchema";
import { handleScrollIntoView } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
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

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      concertDate: new Date(),
      category: "",
      quantity: 0,
    },
  });

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
      <Button
        variant="green"
        size="lg"
        onClick={() => handleScrollIntoView("booking-form")}
        className="w-fit mx-auto mt-6"
      >
        Book Now
      </Button>

      <div id="booking-form">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-slate-50 px-16 py-10 rounded-2xl shadow-3xl mt-12"
          >
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

              <Input
                control={form.control}
                type="number"
                nameField="quantity"
                title="No. of tickets"
                placeholder="e.g 5"
              />
            </div>

            <div className="flex flex-col pt-4 items-end gap-5">
              <h1>Total SGD ${price}</h1>
              <Button variant="colorScheme" size="lg" type="submit">
                Make Payment
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
