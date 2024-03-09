"use client";

import { ProtectComponent } from "@/ProtectComponent";
import Admin from "@/components/Admin";
import Concert from "@/components/Concert";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/concertDetails";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Discover = () => {
  const path = usePathname();
  const smoothScroll = path === "/discover";

  useEffect(() => {
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  const name = localStorage.getItem("name");
  const isAdmin = localStorage.getItem("userType") === UserType.ADMIN;

  return (
    <>
      <div className="hidden absolute top-10 right-10 justify-end lg:flex w-screen">
        <Button variant="link" size="lg" className="text-gray-100">
          {name}
        </Button>
      </div>
      {isAdmin ? <Admin /> : <Concert />}
    </>
  );
};

export default ProtectComponent(Discover);
