import { DatePicker } from "@/components/DatePicker/index";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { bookingFormSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";
import Select from "../Select";

export default function BookConcert() {
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
    const response = await axios.post(
      String(process.env.NEXT_PUBLIC_PROCESS_PAYMENT),
      {}
    );
    window.location.href = response.data.checkout_url;
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 space-y-8"
        >
          <h1 className="text-center mb-16">Book Now 🔥</h1>

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
    </div>
  );
}
