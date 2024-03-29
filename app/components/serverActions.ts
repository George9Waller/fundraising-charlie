"use server";
import Stripe from "stripe";
import { Currency } from "../utils";
import { createDonation, getDonationId } from "@/firebase/firestore";

export const getCheckoutUrl = async (
  currency: Currency,
  amount: number,
  name?: string,
  message?: string
) => {
  const donationId = getDonationId();

  const config: Stripe.Checkout.SessionCreateParams = {
    line_items: [
      {
        price_data: {
          currency,
          tax_behavior: "exclusive",
          unit_amount: amount * 100,
          product_data: {
            name: "Donation for Charlie Hayes",
            description:
              "A donation towards sports opportunities for Charlie Hayes",
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        donationId,
      },
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donation-succeeded/`,
  };

  if (currency === Currency.nzd) {
    const checkoutSessionUrl = await new Stripe(
      process.env.STRIPE_SECRET_KEY_NZ as string
    ).checkout.sessions
      .create(config)
      .then((response) => {
        return response.url;
      })
      .catch(() => {
        return undefined;
      });
    if (checkoutSessionUrl) {
      await createDonation(donationId, name, message);
    }

    return checkoutSessionUrl;
  } else {
    const checkoutSessionUrl = await new Stripe(
      process.env.STRIPE_SECRET_KEY_UK as string
    ).checkout.sessions
      .create(config)
      .then((response) => {
        return response.url;
      })
      .catch(() => {
        return undefined;
      });
    if (checkoutSessionUrl) {
      await createDonation(donationId, name, message);
    }

    return checkoutSessionUrl;
  }
};

export const lookupIpCountryViaAPI = async (ip: string) => {
  "use server";
  const response = await fetch(
    `http://api.ipapi.com/api/${ip}?access_key=${process.env.IPAPI_API_KEY}&fields=country_code`
  );
  return (await response.json())["country_code"];
};
