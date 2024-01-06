import { getTotalPaid } from "@/firebase/firestore";
import { Currency } from "../utils";

export default async function Total() {
  const dbTotals = await getTotalPaid();

  const convertGbpToNzd = async (totalInGbp: number) => {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${
        process.env.FREE_CURRENCY_API_KEY
      }&currencies=${Currency.nzd.toUpperCase()}&base_currency=${Currency.gbp.toUpperCase()}`
    );
    if (response.ok) {
      const rate = (await response.json())?.data?.NZD;
      if (rate) {
        return { total: totalInGbp * rate, warning: undefined };
      }
    }
    return { total: totalInGbp * 2, warning: "APPROX_RATE" };
  };

  const goal = parseInt(process.env.NEXT_PUBLIC_TOTAL_GOAL_NZD || "0");
  const { total: gbpTotalConvertedToNzd, warning } = await convertGbpToNzd(
    dbTotals.gbp
  );
  const totalConverted = dbTotals.nzd + gbpTotalConvertedToNzd;

  return (
    <>
      <h1>Raised</h1>
      <h2
        className={`text-2xl mb-4 ${
          totalConverted >= goal && "text-[#00ff00]"
        } ${warning === "APPROX_RATE" && "text-[#ff8c00]"}`}
      >
        $
        {totalConverted.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>
      <h1>Target</h1>
      <h2 className="text-2xl mb-4">
        $
        {goal.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}
      </h2>
      <progress
        className="w-full border border-1"
        value={totalConverted.toFixed(2)}
        max={goal.toFixed(0)}
      >
        {(totalConverted / goal).toFixed(0)}%
      </progress>
      {warning === "APPROX_RATE" && (
        <p className="text-xs text-[#ff8c00]">
          An approximate exchange rate of 1 GBP = 2 NZD has been used as the
          current rate could not be obtained
        </p>
      )}
    </>
  );
}
