import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { TopPattern, BottomPattern } from "./components/Pattern";
import { Toaster } from "./components/ui/sonner";
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
        <TopPattern />
        <main className="flex flex-col justify-start items-center min-h-fit">
          {children}
          <Toaster />
        </main>
        <BottomPattern />
      </body>
    </html>
  );
}
