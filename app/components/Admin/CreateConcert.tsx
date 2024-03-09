import { backendAxiosPost } from "@/api/helper";
import SuccessComponent from "@/components/Success";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import ConcertForm from "./ConcertForm";

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
  const [successState, setSuccessState] = useState(false);
  const [formData, setFormData] = useState<any>();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [successState]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const apiURL = `${process.env.NEXT_PUBLIC_ADD_CONCERT}/${uuidv4()}`;
    const data = {
      ...values,
      created_by: localStorage.getItem("user"),
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
        <ConcertForm onClick={onSubmit} />
      )}
    </>
  );
}
