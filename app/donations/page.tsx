"use client";
import {
  Donation as DonationType,
  getDonationsWithOffset,
} from "@/firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Donation from "../components/Donation";
import Loading from "../loading";

export default function DonationsPage() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [donations, setDonations] =
    useState<QueryDocumentSnapshot<DonationType>[]>();
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    getDonationsWithOffset(20).then((documents) => {
      setDonations(documents);
      setInitialLoad(false);
    });
  }, []);

  const loadMore = () => {
    if (!reachedEnd && donations) {
      getDonationsWithOffset(20, donations[donations.length - 1]).then(
        (nextDocuments) => {
          if (nextDocuments.length === 0) {
            setReachedEnd(true);
          } else {
            donations.concat(nextDocuments);
          }
        }
      );
    }
  };

  if (initialLoad) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      {donations?.map((donation) => {
        const { amount, currency, name, message, timestamp } = donation.data();
        return (
          <Donation
            key={donation.id}
            amount={amount}
            currency={currency}
            name={name}
            message={message}
            timestamp={timestamp}
          />
        );
      })}
      {!reachedEnd && <button onClick={() => loadMore()}>Load more</button>}
    </div>
  );
}
