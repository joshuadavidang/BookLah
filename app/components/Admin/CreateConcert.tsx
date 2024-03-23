import { backendAxiosPost } from "@/api/helper";
import SuccessComponent from "@/components/Success";
import { AuthContext } from "@/context";
import { formSchema } from "@/model/formSchema";
import { ConcertStatus } from "@/types/concertDetails";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import ConcertForm from "./ConcertForm";

export default function CreateConcert() {
  const [successState, setSuccessState] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();
  const user = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [successState]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const concertId = uuidv4();
    const apiURL = `${process.env.NEXT_PUBLIC_ADD_CONCERT}/${concertId}`;
    const data = {
      ...values,
      created_by: user.userId,
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
    const stripeAddProductAPI = `${process.env.NEXT_PUBLIC_ADD_PRODUCT_TO_STRIPE}/${concertId}/category1`;
    await backendAxiosPost(stripeAddProductAPI, stripeProduct);

    const postId = uuidv4();
    const createForum = {
      post_id: postId,
      concert_id: concertId,
      user_id: user.userId,
      title: values.title,
      content: `${values.title} Forum`,
    };
    const createForumAPI = `${process.env.NEXT_PUBLIC_CREATE_FORUM}/${postId}`;
    await backendAxiosPost(createForumAPI, createForum);
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
