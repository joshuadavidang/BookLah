import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ForumCardProp } from "@/types";
import { FORUM_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ForumHero from "~/forum.png";

export default function ForumCard({ concert_id, concert_name }: ForumCardProp) {
  const router = useRouter();
  const navigateDetails = (concert_id: string) => {
    router.push(`${FORUM_URL}/${concert_id}`);
  };

  return (
    <Card
      className="cursor-pointer"
      onClick={() => navigateDetails(concert_id)}
    >
      <CardHeader>
        <CardTitle>
          <Image src={ForumHero} alt="forum" width="100" height="100" />
          <div className="flex justify-between items-center gap-1 mt-4">
            <h1>{concert_name}</h1>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
