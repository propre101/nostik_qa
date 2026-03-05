export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { Paddle, Environment, EventName } from "@paddle/paddle-node-sdk";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

function getPaddle() {
  return new Paddle(process.env.PADDLE_API_KEY!, {
    environment:
      process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
        ? Environment.production
        : Environment.sandbox,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("paddle-signature");

  if (!signature || !process.env.PADDLE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const paddle = getPaddle();
    const event = await paddle.webhooks.unmarshal(
      body,
      process.env.PADDLE_WEBHOOK_SECRET,
      signature
    );

    if (event.eventType === EventName.TransactionCompleted) {
      const customData = event.data.customData as Record<string, string> | null;
      const question = customData?.question;

      if (question) {
        const supabase = await createServiceRoleSupabase();
        await supabase.from("questions").insert({
          content: question,
          is_vip: true,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Paddle webhook error:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
