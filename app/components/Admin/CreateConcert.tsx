import { backendAxiosPost } from "@/api/helper";
import SuccessComponent from "@/components/Success";
import { AuthContext } from "@/context";
import { formSchema } from "@/model/formSchema";
import { ConcertStatus } from "@/types";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import ConcertForm from "./ConcertForm";

export default function CreateConcert() {
  const [successState, setSuccessState] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();
  const user = useContext(AuthContext);
  const [create, setCreate] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [successState]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setCreate(true);
    const concertId = uuidv4();
    const apiURL = String(process.env.NEXT_PUBLIC_CREATE_CONCERT);
    const data = {
      ...values,
      concert_id: concertId,
      created_by: user.userId,
      concert_status: ConcertStatus.AVAILABLE,
    };

    const response = await backendAxiosPost(apiURL, data);

    if (response.code === 201) {
      setSuccessState(true);
      setCreate(false);
      setFormData(response.data);
      toast("Concert has been created.");
    }
  };

  return (
    <div className="flex justify-center">
      {successState ? (
        <SuccessComponent data={formData} />
      ) : (
        <ConcertForm onClick={onSubmit} create={create} />
      )}
    </div>
  );
}
