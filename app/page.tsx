import { Suspense } from "react";
import DonationButtons from "./components/DonationButtons";
import Loading from "./loading";
import Total from "./components/Total";
import Donations from "./components/Donations";

export const dynamic = "force-dynamic";

export default async function Home() {
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
                <DonationButtons />
              </Suspense>
            </fieldset>
          </section>
        </div>
      </main>
    </div>
  );
}
