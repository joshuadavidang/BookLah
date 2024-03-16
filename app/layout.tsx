import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Door from "./door";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookLah!",
  description: "Concert booking Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Door>{children}</Door>
      </body>
    </html>
  );
}
