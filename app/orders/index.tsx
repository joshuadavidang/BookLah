"use client";

import { useBookings } from "@/api";
import LoadingIndicator from "@/components/Loading";
import { AuthContext } from "@/context";
import { useContext } from "react";

interface BookingProps {
  booking_id: string;
}

export default function Orders() {
  const user = useContext(AuthContext);
  const response = useBookings(user.userId);
  const { data, isLoading } = response;

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="w-screen pt-12 lg:px-24 px-6">
      <h1 className="text-2xl"> My Orders</h1>
      <div className="pt-4">
        {data?.data?.bookings.map(({ booking_id }: BookingProps) => (
          <div key={booking_id} className="flex flex-col gap-2 py-4">
            <h1>BookingId #{booking_id}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
