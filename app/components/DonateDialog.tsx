"use client";
import { useEffect, useState } from "react";
import { Currency, getCurrencyWithSymbol } from "../utils";
import Donation from "./Donation";
import { getCheckoutUrl } from "./serverActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  currency: Currency;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export default function DonateDialog({ currency, modalRef }: Props) {
  const lowerBound = currency === Currency.nzd ? 10.0 : 5.0;
  const upperBound = 10000.0;
  const amountOptions =
    currency === Currency.nzd ? [20, 40, 100] : [10, 20, 50];

  const router = useRouter();
  const [initialProgress, setInitialProgress] = useState(0);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(lowerBound);

  const advancePage = () => {
    if (page < 6) {
      setPage(page + 1);
    }
  };

  const goBackAPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const setAmountWithBounds = (newAmount: number) => {
    let safeNewAmount = newAmount;
    if (newAmount < lowerBound) {
      safeNewAmount = lowerBound;
    }
    if (newAmount > upperBound) {
      safeNewAmount = upperBound;
    }
    setAmount(safeNewAmount);
  };

  useEffect(() => setAmountWithBounds(0), []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (initialProgress >= 100 && page === 1) {
      advancePage();
    }
    if (initialProgress < 100) {
      timer = setTimeout(() => {
        setInitialProgress(initialProgress + 1);
      }, 15);
    }
    return () => clearTimeout(timer);
  }, [initialProgress]);

  const goToCheckout = () => {
    setPage(6);
    getCheckoutUrl(currency, amount, name, message).then((url) => {
      if (url) {
        router.push(url);
      } else {
        toast.error("Unable to proceed to payment");
        setPage(5);
      }
    });
  };

  const closeModal = () => {
    modalRef.current?.close();
    setPage(1);
    setInitialProgress(0);
  };

  return (
    <dialog ref={modalRef} onClose={() => closeModal()}>
      <div className="flex flex-col h-full w-full items-center justify-center overflow-hidden p-4">
      {page > 1 && (
        <div className="self-start absolute top-0 left-0">
          <button onClick={() => closeModal()}>&#10006;</button>
        </div>
      )}

      <div className={`page ${page === 1 && "active"}`}>
        <h1 className="text-2xl font-semi-bold">
          Thank you for wishing to donate
        </h1>
        <progress value={initialProgress} max={100}>
          {initialProgress}%
        </progress>
      </div>
      <div className={`page ${page === 2 && "active"} overflow-hidden`}>
        <h1 className="text-lg">
          Would you like to display a name with your donation?
        </h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          autoComplete="on"
          name="name"
          placeholder="John Smith"
          autoFocus
          required={false}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => advancePage()}>
          <span className={`fade-text ${name === "" && "active"}`}>
            Remain anonymous
          </span>
          <span className={`fade-text ${name !== "" && "active"}`}>Next</span>
        </button>
      </div>
      <div className={`page ${page === 3 && "active"}`}>
        <h1 className="text-lg">
          Would you like to display a message with your donation?
        </h1>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          required={false}
          autoFocus
          className="min-w-[200px] w-3/4"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-2 w-1/2 justify-center">
          <button onClick={() => goBackAPage()}>Back</button>
          <button onClick={() => advancePage()}>
            <span className={`fade-text ${message === "" && "active"}`}>
              Continue <span className="text-xs ">(without message)</span>
            </span>
            <span className={`fade-text ${message !== "" && "active"}`}>
              Continue
            </span>
          </button>
        </div>
      </div>
      <div className={`page ${page === 4 && "active"}`}>
        <h1 className="text-lg">How much would you like to donate</h1>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={amount}
            step="1.00"
            autoFocus
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            onBlur={() => setAmountWithBounds(amount)}
            className="border-none h-[50px] w-[100px] text-xl"
          />
          <span className="font-bold text-xl">{currency.toUpperCase()}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setAmountWithBounds(amount - 1)}
            disabled={amount <= lowerBound}
          >
            -
          </button>
          <button
            onClick={() => setAmountWithBounds(amount + 1)}
            disabled={amount >= upperBound}
          >
            +
          </button>
          {amountOptions.map((option) => (
            <button key={option} onClick={() => setAmountWithBounds(option)}>
              {getCurrencyWithSymbol(option, currency)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 w-1/2 justify-center flex-wrap">
          <button onClick={() => goBackAPage()}>Back</button>
          <button onClick={() => advancePage()}>Continue</button>
        </div>
      </div>
      <div className={`page ${page === 5 && "active"} grow`}>
        <h1 className="text-2xl font-semi-bold">Preview</h1>
        <div className="w-full h-full p-8">
          <Donation
            name={name}
            message={message}
            currency={currency}
            amount={amount}
            timestamp={new Date().toISOString()}
          />
        </div>
        <div className="flex gap-2 w-1/2 justify-center flex-wrap">
          <button onClick={() => goBackAPage()}>Back</button>
          <button onClick={() => goToCheckout()}>Donate</button>
        </div>
        <p className="text-center">
          All donations are strictly for the charitable purpose of providing a
          sporting opportunity to Charlie Hayes
        </p>
      </div>
      <div className={`page ${page === 6 && "active"} grow`}>
        <h1 className="text-2xl font-semi-bold">
          Redirecting you to the payments screen
        </h1>
      </div>
      </div>
    </dialog>
  );
}
