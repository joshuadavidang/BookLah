import { useAdminCreatedConcert, useForumDetailUserId } from "@/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/context";
import ForumCard from "@/forum/ForumCard";
import { ConcertCardProp, ForumCardProp } from "@/types";
import { FORM_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import CTA from "~/cta.svg";
import ConcertCard from "../Concert/ConcertCard";
import ConcertSearch from "../Concert/ConcertSearch";
import LoadingIndicator from "../Loading";

export default function Admin() {
  const router = useRouter();
  const user = useContext(AuthContext);
  const { data, isLoading } = useAdminCreatedConcert(user.userId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchPostQuery, setSearchPostQuery] = useState<string>("");
  const filteredConcerts = data?.data?.filter(({ title }: ConcertCardProp) =>
    title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const result = useForumDetailUserId(user.userId);
  const response = result?.data?.data;

  const filteredForums = response?.filter(({ concert_name }: ForumCardProp) =>
    concert_name.toLowerCase().includes(searchPostQuery.toLowerCase())
  );

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="w-screen relative lg:-top-40">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <Image src={CTA} alt="hero" width="350" height="300" />
        <div className="flex flex-col gap-6 lg:w-1/4">
          <h1 className="text-2xl">List a Concert</h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(FORM_URL)}
          >
            Get Started
          </Button>
        </div>
      </div>

      <div id="tabs">
        <Tabs
          defaultValue="search-created-concert"
          className="flex flex-col w-screen items-center lg:mt-8"
        >
          <TabsList>
            <TabsTrigger value="search-created-concert">
              Created Concert
            </TabsTrigger>
            <TabsTrigger value="forum">Concert Forums</TabsTrigger>
          </TabsList>

          <TabsContent value="search-created-concert">
            <div className="w-screen pt-12 lg:px-24 px-6">
              <div className="flex flex-col items-start gap-7">
                <h1 className="text-2xl">Search for your created concerts</h1>
                <ConcertSearch
                  placeholder="Search for your created concert"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                {filteredConcerts?.map(
                  ({
                    concert_id,
                    performer,
                    title,
                    venue,
                    date,
                    time,
                    capacity,
                    concert_status,
                    description,
                  }: ConcertCardProp) => (
                    <ConcertCard
                      key={concert_id}
                      concert_id={concert_id ?? 0}
                      performer={performer}
                      title={title}
                      date={date}
                      time={time}
                      capacity={capacity}
                      venue={venue}
                      description={description}
                      concert_status={concert_status}
                    />
                  )
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forum">
            <div className="w-screen pt-12 lg:px-24 px-6">
              <div className="flex flex-col items-start gap-7">
                <h1 className="text-2xl">Engage with the community</h1>
                <ConcertSearch
                  placeholder="Search for a community"
                  onChange={(e) => setSearchPostQuery(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                {filteredForums?.map(
                  ({ concert_id, concert_name }: ForumCardProp) => (
                    <ForumCard
                      key={concert_id}
                      concert_id={concert_id}
                      concert_name={concert_name}
                    />
                  )
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
