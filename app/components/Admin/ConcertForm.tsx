import { DatePicker } from "@/components/DatePicker/index";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { formSchema } from "@/model/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";
import { Modal } from "../Modal";
import Select from "../Select";
import TextArea from "../TextArea";

const venues = [
  { label: "Singapore National Stadium", value: "Singapore National Stadium" },
  { label: "Singapore Indoor Stadium", value: "Singapore Indoor Stadium" },
];

const time = [
  { label: "7PM", value: "7PM" },
  { label: "8PM", value: "8PM" },
  { label: "9PM", value: "9PM" },
];

interface ConcertFormProps {
  onClick: any;
  create: boolean;
}

export default function ConcertForm({ create, onClick }: ConcertFormProps) {
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

  const router = useRouter();

  return (
    <div className="px-4 lg:px-0">
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
          onSubmit={form.handleSubmit(onClick)}
          className="mt-12 space-y-8 lg:min-w-[800px]"
        >
          <FormLabel>
            <h1 className="text-xl">Upload a Promotional Photo</h1>
          </FormLabel>
          <Modal />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 pt-8">
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
            <Button
              variant="colorScheme"
              size="lg"
              type="submit"
              disabled={create}
            >
              {create ? "Creating..." : "Create Concert"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
