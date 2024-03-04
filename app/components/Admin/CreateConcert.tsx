import { backendAxiosPost } from "@/api/helper";
import SuccessComponent from "@/components/Success";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import Stepper from "./Stepper";

const formSchema = z.object({
  performer: z.string().min(2).max(50),
  date: z.date(),
  title: z.string().min(2).max(50),
  venue: z.string().min(2).max(50),
  time: z.string().min(2).max(50),
  capacity: z.string().min(2).max(50),
  description: z.string().min(2).max(1000),
});

export default function CreateConcert() {
  const [stepper, setStepper] = useState(0);
  const [successState, setSuccessState] = useState(false);
  const [formData, setFormData] = useState<any>();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performer: "",
      date: new Date(),
      title: "",
      venue: "",
      time: "",
      capacity: "",
      description: "",
    },
  });

  const handleBack = () => {
    if (stepper > 0) {
      setStepper(stepper - 1);
    } else {
      router.push("/discover");
    }
  };

  const handleNext = () => {
    setStepper(stepper + 1);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const apiURL = `${process.env.NEXT_PUBLIC_ADD_CONCERT}/${uuidv4()}`;
    const data = {
      ...values,
      created_by: "kc7gi4finn2si34e88kd",
    };

    const response = await backendAxiosPost(apiURL, data);

    if (response.code === 201) {
      setSuccessState(true);
      setFormData(response.data);
      toast("Concert has been created.");
    }
  };

  return (
    <>
      {successState ? (
        <SuccessComponent data={formData} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {stepper === 0 && (
              <Stepper
                control={form.control}
                nameField="performer"
                title="Who's performing?"
                placeholder="Taylor Swift"
              />
            )}

            {stepper === 1 && (
              <Stepper
                control={form.control}
                nameField="venue"
                title="Where is it?"
                placeholder="Location"
              />
            )}

            {stepper === 2 && (
              <Stepper
                control={form.control}
                nameField="date"
                title="When is it?"
                placeholder="Date"
              />
            )}

            {stepper === 3 && (
              <Stepper
                control={form.control}
                nameField="title"
                title="What is the name of the concert?"
                placeholder="Concert name"
              />
            )}

            {stepper === 4 && (
              <Stepper
                control={form.control}
                nameField="time"
                title="What time would it be?"
                placeholder="Time"
              />
            )}

            {stepper === 5 && (
              <Stepper
                control={form.control}
                nameField="capacity"
                title="What is the capacity?"
                placeholder="Capacity"
              />
            )}

            {stepper === 6 && (
              <Stepper
                control={form.control}
                nameField="description"
                title="Give a concert description"
                placeholder="Describe the concert"
              />
            )}

            <div className="flex justify-between gap-2 mt-12">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                {stepper === 0 ? "Restart" : <ArrowLeft />}
              </Button>
              {stepper === 6 ? (
                <Button variant="dark" size="sm" type="submit">
                  Submit
                </Button>
              ) : (
                <Button
                  variant="dark"
                  type="button"
                  size="sm"
                  onClick={handleNext}
                >
                  <ArrowRight />
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
