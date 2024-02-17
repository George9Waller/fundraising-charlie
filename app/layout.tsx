import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fundraising for Charlie Hayes",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row gap-2 pb-2 sticky top-0 z-10">
          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/donations" prefetch>
            <button>Donations</button>
          </Link>
        </div>
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
