"use client";
import { useRef } from "react";
import DonateDialog from "./DonateDialog";
import { Currency } from "../utils";

export default function DonationButtons({
  country,
  currency,
}: {
  country?: string;
  currency: Currency | undefined;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      {currency ? (
        <>
          <button
            className="w-1/2 h-1/2"
            onClick={() => modalRef.current?.showModal()}
          >
            Donate
          </button>
          <DonateDialog currency={currency} modalRef={modalRef} />
        </>
      ) : (
        <>
          <p className="text-lg">You are unable to donate at this time</p>
          <p className="text-sm">
            Donations can only be accepted from New Zealand or the UK
          </p>
          <p className="text-sm">
            {country
              ? `Your country has been identified as ${country}`
              : "We were unable to identify which country you are in"}
          </p>
        </>
      )}
    </>
  );
}
