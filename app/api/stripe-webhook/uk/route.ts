import stripeWebhookProcessor from "../webhookProcessor";

export async function POST(request: Request) {
  return await stripeWebhookProcessor(
    request,
    process.env.STRIPE_WEBHOOK_SECRET_UK as string
  );
}
