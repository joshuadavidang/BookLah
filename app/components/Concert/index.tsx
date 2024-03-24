import { useConcertDetails } from "@/api";
import { Button } from "@/components/ui/button";
import { ConcertCardProp } from "@/types";
import Image from "next/image";
import { useState } from "react";
import CTA from "~/cta.svg";
import ConcertCard from "./ConcertCard";
import ConcertSearch from "./ConcertSearch";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumCard from "@/forum/ForumCard";
import Orders from "@/orders";
import { handleScrollIntoView } from "@/utils";

export default function Concert() {
  const { data } = useConcertDetails();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredConcerts = data?.data?.concerts.filter(
    ({ title }: ConcertCardProp) =>
      title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center relative lg:-top-40 gap-12 w-screen">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <Image src={CTA} alt="hero" width="350" height="300" />
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleScrollIntoView("tabs")}
        >
          Get Started
        </Button>
      </div>

      <div id="tabs">
        <Tabs
          defaultValue="search-concert"
          className="flex flex-col w-screen items-center lg:mt-8"
        >
          <TabsList>
            <TabsTrigger value="search-concert">Search Concert</TabsTrigger>
            <TabsTrigger value="booked-concert">My Bookings</TabsTrigger>
            <TabsTrigger value="forum">Concert Forums</TabsTrigger>
          </TabsList>

          <TabsContent value="search-concert">
            <div className="w-screen pt-12 lg:px-24 px-6">
              <div className="flex flex-col items-start gap-7">
                <h1 className="text-2xl">Discover the latest concert</h1>
                <ConcertSearch
                  placeholder="Search for a concert"
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
                    description,
                    concert_status,
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

          <TabsContent value="booked-concert">
            <Orders />
          </TabsContent>

          <TabsContent value="forum">
            <div className="w-screen pt-12 lg:px-24 px-6">
              <div className="flex flex-col items-start gap-7">
                <h1 className="text-2xl">Engage with the community</h1>
                <ConcertSearch
                  placeholder="Search for a community"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                {filteredConcerts?.map(
                  ({ concert_id, performer, title }: ConcertCardProp) => (
                    <ForumCard
                      key={concert_id}
                      forum_id={concert_id ?? 0}
                      performer={performer}
                      title={title}
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
