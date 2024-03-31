import Payment from "@/checkout/page";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/context";
import { bookingFormSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
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
  const user = useContext(AuthContext);
  const [bookingForm, setBookingForm] = useState({
    user_id: "",
    concert_id: "",
    cat_no: "",
    seat_no: "",
    quantity: 0,
  });
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
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
    const { seat, quantity, category } = values;
    setBookingForm({
      user_id: user.userId,
      concert_id: concert_id,
      cat_no: category,
      seat_no: seat,
      quantity: quantity,
    });
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
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
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
                  readOnly={false}
                />
              </div>

              <div className="flex flex-col pt-4 items-end gap-5">
                <div className="flex items-center gap-2">
                  <p>Total</p>
                  <h1>S${totalPrice.toFixed(2)}</h1>
                </div>

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
