"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Orders() {
  const router = useRouter();
  return (
    <div className="relative lg:-top-20 w-screen">
      <div className="flex justify-evenly items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex gap-2 items-center"
        >
          <ArrowLeft size="18" /> Back
        </Button>
        <h1> My Orders</h1>
        <span></span>
      </div>
    </div>
  );
}
