import Payment from "@/checkout/page";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/context";
import { bookingFormSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MultiSelect from "../MultiSelect";
import Select from "../Select";

// fetch from back-end
const OPTIONS = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "A3", value: "A3" },
  { label: "A4", value: "A4" },
];

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
  const user = useContext(AuthContext);
  const [bookingForm, setBookingForm] = useState({
    user_id: "",
    concert_id: "",
    cat_no: "",
    seat_no: [] as string[],
    quantity: 0,
  });
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      category: "",
      seat: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof bookingFormSchema>) => {
    const { seat, category } = values;
    const seatsOnly = seat.map((option) => option.value);
    setBookingForm({
      user_id: user.userId,
      concert_id: concert_id,
      cat_no: category,
      seat_no: seatsOnly,
      quantity: seatsOnly.length,
    });
    setTotalPrice(price * seatsOnly.length);
    setShowPayment(true);
  };

  return (
    <div className="flex flex-col justify-center w-full gap-16">
      {!showPayment && (
        <div id="booking-form">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-slate-50 px-16 py-10 rounded-2xl shadow-3xl"
            >
              <div className="grid lg:grid-cols-1 gap-12 lg:gap-12">
                <Select
                  control={form.control}
                  formLabel="Select Category"
                  nameField="category"
                  placeholder="Category"
                  values={["Category 1", "Category 2", "Category 3"]}
                />

                <MultiSelect
                  control={form.control}
                  formLabel="Select Seat"
                  nameField="seat"
                  placeholder="Select your seats"
                  options={OPTIONS}
                />
              </div>

              <div className="flex flex-col pt-4 items-end">
                <Button variant="dark" size="lg" type="submit">
                  Process Booking
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {showPayment && (
        <>
          <Payment
            cancelPayment={() => setShowPayment(false)}
            totalPrice={totalPrice}
            bookingForm={bookingForm}
          />
        </>
      )}
    </div>
  );
}
