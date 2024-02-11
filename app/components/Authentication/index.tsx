import { fetcher } from "@/api/helper";
import { Button } from "@/components/ui/button";
import { BACK_END_API_URL } from "@/utils/constants";
import Image from "next/image";
import useSWR from "swr";
import Singpass from "~/singpass.svg";

export default function AuthenticationButton() {
  const { data } = useSWR(
    `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_AUTH}`,
    fetcher
  );

  const handleSingPassBtn = async () => {
    const { url } = data;
    window.location.href = url;
  };

  return (
    <div className="flex flex-col gap-5 md:w-1/2 w-screen md:h-full justify-center items-start">
      <Button variant="default" onClick={handleSingPassBtn}>
        Login with{" "}
        <Image
          src={Singpass}
          alt="Singpass"
          width={80}
          className="ml-1 mt-1.5"
        />
      </Button>
    </div>
  );
}
