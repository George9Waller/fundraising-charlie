import { Suspense } from "react";
import DonationButtons from "./components/DonationButtons";
import Loading from "./loading";
import Total from "./components/Total";
import { getCurrencyFromCountry } from "./utils";
import Donations from "./components/Donations";

export default async function Home() {
  const getCurrency = async () => {
    "use client"
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

  const { country, currency } = await getCurrency();

  return (
    <div className="min-h-screen">
      <main className="grid sm:grid-cols-3 grid-cols-1 p-8 gap-y-8 sm:gap-8">
        <div className="flex flex-col col-span-2 gap-6">
          <h1 className="text-4xl">Fundraising for Charlie Hayes</h1>
          <p>Some description about what we are fundraising for and why</p>
        </div>
        <div className="h-full">
          <section>
            <fieldset>
              <Suspense fallback={<Loading fillScreen={false} />}>
                <Total />
              </Suspense>
            </fieldset>
          </section>
        </div>
        <div className="col-span-2 row-span-2">
          <section>
            <fieldset>
              <legend>Donations</legend>
              <Donations />
            </fieldset>
          </section>
        </div>
        <div className="min-h-[200px]">
          <section>
            <fieldset>
              <legend>Donate</legend>
              <Suspense fallback={<Loading fillScreen={false} />}>
                <DonationButtons country={country} currency={currency} />
              </Suspense>
            </fieldset>
          </section>
        </div>
      </main>
    </div>
  );
}
