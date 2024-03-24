"use client";

import { usePathname } from "next/navigation";
import { ProtectComponent } from "./ProtectComponent";
import { TopPattern } from "./components/Pattern";
import { Toaster } from "./components/ui/sonner";
import { LANDING_URL } from "./utils/constants";

export default function Door({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const renderChildren = () => {
    switch (true) {
      case pathname === LANDING_URL:
        return <>{children}</>;
      default:
        return <ProtectComponent>{children}</ProtectComponent>;
    }
  };
  return (
    <>
      <TopPattern />
      <main className="flex flex-col justify-start items-center min-h-fit pb-16">
        {renderChildren()}
        <Toaster />
      </main>
    </>
  );
}
