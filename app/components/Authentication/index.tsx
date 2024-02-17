import { fetcher } from "@/api/helper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BACK_END_API_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import Singpass from "~/singpass.svg";

export default function AuthenticationButton() {
  const router = useRouter();
  const { data } = useSWR(
    `${BACK_END_API_URL}/${process.env.NEXT_PUBLIC_AUTH}`,
    fetcher
  );

  const handleSingPassBtn = async () => {
    const { url } = data;
    window.location.href = url;
  };

  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      router.push("/discover");
    }
  }, [user, router]);

  return (
    <Button variant="default" onClick={handleSingPassBtn}>
      Login with
      <Image src={Singpass} alt="Singpass" width={80} className="ml-1 mt-1.5" />
    </Button>
  );
}
