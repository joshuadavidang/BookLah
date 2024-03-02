import { backendAxiosPost } from "@/api/helper";
import SuccessComponent from "@/components/Success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  performer: z.string().min(2).max(50),
  date: z.string().min(2).max(50),
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
      date: "",
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
              <FormField
                control={form.control}
                name="performer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">Who's performing?</h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Taylor Swift" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {stepper === 1 && (
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">Where is it?</h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {stepper === 2 && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">When is it?</h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {stepper === 3 && (
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">
                        What is the name of the concert?
                      </h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Concert name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {stepper === 4 && (
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">What time would it be?</h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {stepper === 5 && (
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">What is the capacity?</h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {stepper === 6 && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-2xl pb-3">
                        Give a concert description
                      </h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Describe the concert" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between gap-2 mt-12">
              <Button variant="dark" size="sm" onClick={handleBack}>
                {stepper === 0 ? "Restart" : "Back"}
              </Button>

              {stepper === 6 ? (
                <Button variant="green" size="sm" type="submit">
                  Submit
                </Button>
              ) : (
                <Button
                  variant="green"
                  type="button"
                  size="sm"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
