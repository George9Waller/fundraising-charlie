import { Suspense, useRef } from "react";
import DonationButtons from "./components/DonationButtons";
import Loading from "./loading";
import Total from "./components/Total";
import Donations from "./components/Donations";
import Carousel from "./components/Carousel";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <h1 className="mx-8 my-2 text-4xl">Fundraising for Charlie Hayes</h1>
      <main className="grid md:grid-cols-3 grid-cols-1 p-8 gap-y-8 sm:gap-8 md:grid-flow-row-dense">
        <div className="col-span-2 row-span-2">
          <section>
            <fieldset className="items-start">
              <p>
                We are thrilled to share the exciting news that Charlie Hayes, a
                talented young football player, has been selected to attend the
                2024 West Ham United Football Development Tour—a fantastic
                opportunity that could propel him towards a promising future in
                professional football!
              </p>
              <p>
                In 2023 Charlie was selected to attend the Australasian West Ham
                United camp on the Gold Coast in September.
              </p>
              <p>
                There were 420 kids at this camp, all hoping to be selected as
                one of the 30 to attend the West Ham Development Tour, in
                London, in 2024.
              </p>
              <p>
                After 4 gruelling days in the Gold Coast heat, Charlie showed
                his skill, determination and passion and was selected as one of
                the 30 kids. So exciting!
              </p>
              <p>
                He now has the opportunity to spend 12 days in the UK working
                with a variety of coaches from West Ham and other Premier League
                clubs, refining his footballing skills and knowledge and
                hopefully impressing them enough for them to continue to support
                his football journey.
              </p>
              <p>
                This is such an amazing opportunity and achievement for a 9 year
                old!
              </p>
              <p>
                Unfortunately this isn’t free, he needs to raise a massive
                amount of money to make this happen.
              </p>
              <p>
                He would really appreciate it if you could support in any way
                that you can.
              </p>
              <p>
                If you can’t help financially, then sharing this page with your
                friends, family, and fellow football enthusiasts would be really
                helpful.
              </p>
            </fieldset>
          </section>
        </div>
        <div className="col-span-2 row-span-2">
          <section className="w-full">
            <fieldset className="w-full object-scale-down">
              <Carousel
                items={[
                  <Image
                    key="charlie-1"
                    src="/img/charlie-1.jpeg"
                    alt=""
                    width={4032}
                    height={3024}
                    className="object-scale-down aspect-square"
                  />,
                  <Image
                    key="charlie-2"
                    src="/img/charlie-2.jpeg"
                    alt=""
                    width={2042}
                    height={2541}
                    className="object-scale-down aspect-square"
                  />,
                  <Image
                    key="charlie-3"
                    src="/img/charlie-3.jpeg"
                    alt=""
                    width={1908}
                    height={2619}
                    className="object-scale-down aspect-square"
                  />,
                ]}
              />
            </fieldset>
          </section>
        </div>
        <div className="">
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
        <div className="">
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
