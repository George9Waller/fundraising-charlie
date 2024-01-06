"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

export default function DonationSucceeded() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (progress >= 100) {
      redirect("/");
    }
    if (progress < 100) {
      timer = setTimeout(() => {
        setProgress(progress + 1);
      }, 25);
    }
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="flex items-center justify-center h-screen flex flex-col gap-4 overflow-hidden">
      <h1 className="text-4xl font-bold">Thank you for you donation</h1>
      <p>Your donation will appear once the payment has been processed</p>
      <Confetti
        active={progress > 0}
        config={{
          spread: 180,
          elementCount: 600,
          stagger: 5,
          dragFriction: 0.12,
        }}
      />
    </div>
  );
}
