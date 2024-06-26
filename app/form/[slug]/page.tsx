"use client";

import { useConcertDetail } from "@/api/concert";
import { backendAxiosPut } from "@/api/helper";
import { DatePicker } from "@/components/DatePicker/index";
import Input from "@/components/Input";
import LoadingIndicator from "@/components/Loading";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/context";
import { formSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditedConcertForm(params: any) {
  const router = useRouter();
  const { data, isLoading } = useConcertDetail(params.params.slug);
  const user = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performer: "",
      date: new Date(),
      title: "",
      venue: "",
      time: "",
      capacity: 0,
      price: 0,
      description: "",
    },
  });

  const venues = [
    {
      label: "Singapore National Stadium",
      value: "Singapore National Stadium",
    },
    { label: "Singapore Indoor Stadium", value: "Singapore Indoor Stadium" },
  ];

  const time = [
    { label: "7PM", value: "7PM" },
    { label: "8PM", value: "8PM" },
    { label: "9PM", value: "9PM" },
  ];

  useEffect(() => {
    form.setValue("performer", data?.data?.performer);
    form.setValue("date", data?.data?.date);
    form.setValue("title", data?.data?.title);
    form.setValue("venue", data?.data?.venue);
    form.setValue("time", data?.data?.time);
    form.setValue("capacity", data?.data?.capacity);
    form.setValue("price", data?.data?.price);
    form.setValue("description", data?.data?.description);
  }, [form, data]);

  if (isLoading) return <LoadingIndicator />;

  const updateConcert = async (values: z.infer<typeof formSchema>) => {
    const apiURL = `${process.env.NEXT_PUBLIC_UPDATE_CONCERT_DETAILS}/${params.params.slug}`;
    const data = {
      ...values,
      created_by: user.userId,
    };

    const response = await backendAxiosPut(apiURL, data);
    if (response.code === 204) {
      router.back();
    }
  };

  return (
    <div className="lg:min-w-[800px] px-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="flex gap-2 items-center"
      >
        <ArrowLeft size="18" /> Back
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateConcert)}
          className="mt-12 space-y-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <Input
              control={form.control}
              type="string"
              nameField="performer"
              title="Who's performing?"
              placeholder="e.g Taylor Swift"
            />

            <Select
              control={form.control}
              formLabel="Where is it?"
              nameField="venue"
              placeholder="Venue"
              values={venues}
            />

            <DatePicker
              control={form.control}
              formLabel="When is it?"
              nameField="date"
            />

            <Input
              control={form.control}
              type="string"
              nameField="title"
              title="Give the concert a title"
              placeholder="e.g The Eras Tour"
            />

            <Select
              control={form.control}
              formLabel="What time would it be?"
              nameField="time"
              placeholder="Time"
              values={time}
            />

            <Input
              control={form.control}
              type="number"
              nameField="capacity"
              title="No. of available tickets?"
              placeholder="e.g 50,000"
            />

            <Input
              control={form.control}
              type="number"
              nameField="price"
              title="Price"
              placeholder="e.g $1000"
            />

            <div className="col-span-2">
              <TextArea
                control={form.control}
                nameField="description"
                title="Give a concert description"
                placeholder="The Eras Tour is the ongoing sixth concert tour by the American singer-songwriter Taylor Swift. Consisting of 152 shows across five continents, the tour commenced on March 17, 2023"
              />
            </div>
          </div>

          <div className="flex justify-center pt-12">
            <Button variant="colorScheme" size="lg" type="submit">
              Update Concert
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
