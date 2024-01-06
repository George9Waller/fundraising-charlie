import {
  collection,
  orderBy,
  query,
  where,
  limit,
  onSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getAggregateFromServer,
  sum,
} from "firebase/firestore";
import { db } from "./firebase";
import { Currency } from "@/app/utils";

export interface Donation {
  id: string;
  amount: number;
  currency: Currency;
  paid: boolean;
  timestamp: string;
  name?: string;
  message?: string;
  payment_intent_id?: string;
}

const DONATIONS_COLLECTION = "donations";

export const getDonations = (
  maxRecords: number,
  setRecords: (records: QueryDocumentSnapshot<Donation>[]) => void
) => {
  const q = query(
    collection(db, DONATIONS_COLLECTION),
    where("is_paid", "==", true),
    orderBy("timestamp", "desc"),
    limit(maxRecords)
  );
  return onSnapshot(q, (snapshot) =>
    setRecords((snapshot as QuerySnapshot<Donation>).docs)
  );
};

export const getDonationId = () => {
  return doc(collection(db, DONATIONS_COLLECTION)).id;
};

export const createDonation = async (
  id: string,
  name?: string,
  message?: string
) => {
  await setDoc(doc(collection(db, DONATIONS_COLLECTION), id), {
    name,
    message,
  });
};

export const updatePaidDonation = async (
  donationId: string,
  paymentIntentId: string,
  amount: number,
  currency: string
) => {
  const docRef = doc(db, DONATIONS_COLLECTION, donationId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    await updateDoc(docRef, {
      payment_intent_id: paymentIntentId,
      amount,
      currency,
      is_paid: true,
      timestamp: new Date().toISOString(),
    });
  } else {
    throw new Error(
      `Donation does not exist in db, donation_id=${donationId} payment_intent_id=${paymentIntentId}`
    );
  }
};

const getTotalForCurrency = async (currency: Currency) => {
  return (
    await getAggregateFromServer(
      query(
        collection(db, DONATIONS_COLLECTION),
        where("is_paid", "==", true),
        where("currency", "==", currency)
      ),
      { total: sum("amount") }
    )
  ).data().total;
};

export const getTotalPaid = async () => {
  const nzdTotal = await getTotalForCurrency(Currency.nzd);
  const gbpTotal = await getTotalForCurrency(Currency.gbp);

  return { [Currency.nzd]: nzdTotal, [Currency.gbp]: gbpTotal };
};
