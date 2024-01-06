"use client";
import { getDonations } from "@/firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Donation as DonationType } from "@/firebase/firestore";
import Donation from "./Donation";

export default function Donations() {
  const [donations, setDonations] =
    useState<QueryDocumentSnapshot<DonationType>[]>();

  useEffect(() => {
    const unsubscribe = getDonations(3, (snapshot) => setDonations(snapshot));

    return () => unsubscribe();
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {donations?.map((document) => {
        const { amount, currency, name, message, timestamp } = document.data();
        return (
          <Donation
            key={document.id}
            amount={amount}
            currency={currency}
            name={name}
            message={message}
            timestamp={timestamp}
          />
        );
      })}
    </div>
  );
}
