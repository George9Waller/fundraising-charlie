import { updatePaidDonation } from "@/firebase/firestore";
import { buffer } from "stream/consumers";
import { ReadableStream } from "stream/web";
import Stripe from "stripe";

export default async function stripeWebhookProcessor(
  request: Request,
  webhookSecret: string
) {
  const sig = request.headers.get("stripe-signature");
  let event;

  if (!request.body || !sig) {
    return new Response(undefined, { status: 400 });
  }

  try {
    event = Stripe.webhooks.constructEvent(
      await buffer(request.body as ReadableStream),
      sig,
      webhookSecret
    );
  } catch (error) {
    return new Response(`Webhook error: ${error}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const { id, status, amount, metadata, currency } = event.data.object;
      if (status === "succeeded") {
        await updatePaidDonation(
          metadata.donationId,
          id,
          amount / 100,
          currency
        );
      }
  }

  return new Response(undefined, { status: 200 });
}
