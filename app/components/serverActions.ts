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
  let stripe: Stripe;
  switch (currency) {
    case Currency.nzd:
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY_NZ as string);
    case Currency.gbp:
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY_UK as string);
  }
  const donationId = getDonationId();

  const checkoutSessionUrl = await stripe.checkout.sessions
    .create({
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
      // add an id to the payment intent metadata
    })
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  if (checkoutSessionUrl) {
    await createDonation(donationId, name, message);
  }

  return checkoutSessionUrl;
};
