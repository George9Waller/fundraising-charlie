"use client";
import { getDonationsWithOffset } from "@/firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Donation as DonationType } from "@/firebase/firestore";
import Donation from "./Donation";
import Link from "next/link";
import Loading from "../loading";

export default function Donations() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [donations, setDonations] =
    useState<QueryDocumentSnapshot<DonationType>[]>();

  useEffect(() => {
    getDonationsWithOffset(3).then((documents) => {
      setDonations(documents);
      setInitialLoad(false);
    });
  });

  if (initialLoad) {
    return <Loading fillScreen={false} />;
  }

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

      <Link href="/donations">
        <button>See all donations</button>
      </Link>
    </div>
  );
}
