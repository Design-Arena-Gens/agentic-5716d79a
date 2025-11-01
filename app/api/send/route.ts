import { NextResponse } from "next/server";
import { demoCustomers } from "@/data/customers";
import { MessageRequestPayload, MessageResult } from "@/types";
import { sendPersonalizedText, sendText } from "@/lib/twilio";

export async function POST(request: Request) {
  const payload = (await request.json()) as MessageRequestPayload & {
    mimicPersona?: boolean;
  };

  if (!payload?.recipients?.length) {
    return NextResponse.json(
      { error: "Please provide at least one recipient." },
      { status: 400 }
    );
  }

  if (!payload.baseMessage?.trim()) {
    return NextResponse.json({ error: "Message body is required." }, { status: 400 });
  }

  const results: MessageResult[] = [];

  for (const recipientId of payload.recipients) {
    const profile = demoCustomers.find((item) => item.id === recipientId);

    if (!profile) {
      results.push({
        recipient: recipientId,
        status: "skipped",
        detail: "Recipient not found"
      });
      continue;
    }

    const personaTone = payload.persona?.tone ?? profile.preferences?.tone ?? "friendly";

    try {
      const result = payload.mimicPersona
        ? await sendPersonalizedText({
            to: profile.phone,
            recipientName: profile.name,
            baseMessage: payload.baseMessage,
            context:
              payload.context ??
              `Relationship: ${profile.relationship}. Use tags ${profile.tags.join(", ")}`,
            persona: {
              tone: personaTone,
              guidance: payload.persona?.guidance ?? "Sound like the business owner."
            }
          })
        : await sendText({
            to: profile.phone,
            body: payload.baseMessage
          });

      results.push(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      results.push({
        recipient: profile.phone,
        status: "failed",
        detail: message
      });
    }
  }

  return NextResponse.json({ results });
}
