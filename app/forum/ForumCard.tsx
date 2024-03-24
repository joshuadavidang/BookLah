import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForumCardProp } from "@/types";
import { FORUM_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ForumHero from "~/forum.png";

export default function ForumCard({ post_id, title }: ForumCardProp) {
  const router = useRouter();
  const navigateDetails = (post_id: string) => {
    router.push(`${FORUM_URL}/${post_id}`);
  };

  return (
    <Card className="cursor-pointer" onClick={() => navigateDetails(post_id)}>
      <CardHeader>
        <CardTitle>
          <Image src={ForumHero} alt="forum" width="100" height="100" />
          <div className="flex justify-between items-center gap-1 mt-4">
            <h1>{title}</h1>
          </div>
        </CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
    </Card>
  );
}
