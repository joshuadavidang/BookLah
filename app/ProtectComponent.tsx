"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export const ProtectComponent = (WrappedComponent: any) => {
  return function ProtectComponent(props: any) {
    const session = true;

    useEffect(() => {
      if (!session) {
        redirect("/");
      }
    }, [session]);

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
