import { backendAxiosPost } from "@/api/helper";
import SuccessComponent from "@/components/Success";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import ConcertForm from "./ConcertForm";
import { formSchema } from "@/model/formSchema";
import { ConcertStatus } from "@/types/concertDetails";

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
      concert_status: ConcertStatus.AVAILABLE,
    };

    const response = await backendAxiosPost(apiURL, data);

    if (response.code === 201) {
      setSuccessState(true);
      setFormData(response.data);
      toast("Concert has been created.");
    }

    const stripeProduct = {
      name: values.title,
      price: values.price,
    };
    const stripeAddProductAPI = `${process.env.NEXT_PUBLIC_ADD_PRODUCT_TO_STRIPE}`;
    await backendAxiosPost(stripeAddProductAPI, stripeProduct);
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
