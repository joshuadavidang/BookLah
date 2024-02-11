import { fetcher } from "@/api/helper";
import { Button } from "@/components/ui/button";
import { BACK_END_API_URL } from "@/utils/constants";
import useSWR from "swr";

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
      <Button variant="secondary" onClick={handleSingPassBtn}>
        Login with Singpass
      </Button>
    </div>
  );
}
