"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context";
import { UserType } from "@/types";
import { DISCOVER_URL } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import Admin from "@/components/Admin";
import Concert from "@/components/Concert";

export const Discover = () => {
  const user = useContext(AuthContext);
  const { name, userType } = user;
  const path = usePathname();
  const smoothScroll = path === DISCOVER_URL;
  const isAdmin = userType === UserType.ADMIN;

  useEffect(() => {
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

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

export default Discover;
