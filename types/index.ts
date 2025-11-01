export type PersonaTone = "friendly" | "professional" | "enthusiastic";

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  relationship: "customer" | "client" | "partner";
  tags: string[];
  preferences?: {
    bestTime: string;
    tone: PersonaTone;
    topics: string[];
  };
}

export interface OutreachDraft {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  personaTone: PersonaTone;
  recipients: string[];
}

export interface MessageRequestPayload {
  recipients: string[];
  baseMessage: string;
  context?: string;
  scheduleAt?: string;
  persona?: {
    tone: PersonaTone;
    guidance: string;
  };
}

export interface MessageResult {
  recipient: string;
  status: "sent" | "failed" | "skipped";
  detail: string;
  sid?: string;
}
