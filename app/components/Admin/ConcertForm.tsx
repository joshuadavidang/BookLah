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

interface ConcertFormProps {
  onClick: any;
}

export default function ConcertForm({ onClick }: ConcertFormProps) {
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
    <div className="px-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="flex gap-2 items-center"
      >
        <ArrowLeft size="18" /> Back
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onClick)} className="mt-12 space-y-8">
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
              values={[
                "Singapore National Stadium",
                "Singapore Indoor Stadium",
              ]}
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
              values={["7PM", "8PM", "9PM", "10PM"]}
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
              Create Concert
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
