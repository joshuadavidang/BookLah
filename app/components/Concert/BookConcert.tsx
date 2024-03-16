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

export default function BookConcert() {
  const [bookingForm, setShowBookingForm] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      // date: new Date(),
      // category: "",
      capacity: 0,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (values: z.infer<typeof bookingFormSchema>) => {
    const data = {
      concert_id: "a",
      category: "hi",
      quantity: 1,
    };
    const response = await axios.post(
      String(process.env.NEXT_PUBLIC_PROCESS_PAYMENT),
      data
    );
    window.location.href = response.data.checkout_url;
  };

  const handleBooking = () => {
    setShowBookingForm(!bookingForm);
  };

  return (
    <div className="flex flex-col justify-center w-full gap-16">
      <Button
        variant="green"
        size="lg"
        onClick={handleBooking}
        className="w-fit mx-auto mt-6"
      >
        Book Now
      </Button>

      {bookingForm && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-slate-100 px-16 py-10 rounded-2xl shadoow-3xl"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <DatePicker formLabel="Select date" />
              <Select formLabel="Select Category" />
              <Input
                control={form.control}
                type="number"
                nameField="capacity"
                title="No. of tickets"
                placeholder="e.g 5"
              />
            </div>

            <div className="flex flex-col pt-4 items-end gap-5">
              <h1>Total SGD $0</h1>
              <Button variant="colorScheme" size="lg" type="submit">
                Make Payment
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
