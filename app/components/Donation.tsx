"use client"
import { getCurrencyWithSymbol } from "../utils";

interface Props {
  name?: string | null;
  message?: string | null;
  amount: number;
  currency: string;
  timestamp: string;
}

export default function Donation({
  name,
  message,
  amount,
  currency,
  timestamp,
}: Props) {
  const localDatetime = new Date(timestamp).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className="card">
      <h2 className="text-lg">
        <span className="font-semibold">{getCurrencyWithSymbol(amount, currency)}</span> | {name || "Anonymous"}
      </h2>
      {message && <p>{message}</p>}
      <small className="text-xs">{localDatetime}</small>
    </div>
  );
}
