"use client";
import { useEffect, useRef, useState } from "react";
import DonateDialog from "./DonateDialog";
import { Currency, getCurrencyFromCountry } from "../utils";
import Loading from "../loading";

export default function DonationButtons() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState<Currency>();

  useEffect(() => {
    const getCurrency = async () => {
      "use client";
      let country;
      let ip;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/geo-stats`
      );
      if (response.ok) {
        const data = await response.json();
        country = data.country;
        ip = data.ip;
      }

      if (!country && ip) {
        country = (
          await (
            await fetch(
              `http://api.ipapi.com/api/${ip}?access_key=${process.env.IPAPI_API_KEY}&fields=country_code`
            )
          ).json()
        )["country_code"];
      }
      return { country, currency: getCurrencyFromCountry(country) };
    };

    getCurrency().then(({ country, currency }) => {
      setCountry(country);
      setCurrency(currency);
      setInitialLoad(false);
    });
  }, []);

  const modalRef = useRef<HTMLDialogElement>(null);

  if (initialLoad) {
    return <Loading fillScreen={false} />;
  }

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
          <p className="text-xs">
            Donations can only be accepted from New Zealand or the UK
          </p>
          <p className="text-xs">
            {country
              ? `Your country has been identified as ${country}`
              : "We were unable to identify which country you are in"}
          </p>
        </>
      )}
    </>
  );
}
