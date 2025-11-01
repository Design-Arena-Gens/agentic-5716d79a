'use client';

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { RecipientsPicker } from "@/components/RecipientsPicker";
import { PersonaControls } from "@/components/PersonaControls";
import { MessageComposer } from "@/components/MessageComposer";
import { ActivityFeed } from "@/components/ActivityFeed";
import { CustomerProfile, MessageResult, PersonaTone } from "@/types";
import clsx from "clsx";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function Home() {
  const { data, error } = useSWR<{ customers: CustomerProfile[] }>("/api/customers", fetcher);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [mimicPersona, setMimicPersona] = useState<boolean>(true);
  const [tone, setTone] = useState<PersonaTone>("friendly");
  const [guidance, setGuidance] = useState(
    "Sign off as Sam. Mention gratitude for their continued support."
  );
  const [logs, setLogs] = useState<MessageResult[]>([]);
  const [sending, setSending] = useState(false);

  const customers = useMemo(() => data?.customers ?? [], [data?.customers]);

  useEffect(() => {
    if (!selectedRecipients.length && customers.length) {
      setSelectedRecipients(customers.slice(0, 1).map((customer) => customer.id));
    }
  }, [customers, selectedRecipients.length]);

  const selectedProfiles = useMemo(() => {
    return customers.filter((customer) => selectedRecipients.includes(customer.id));
  }, [customers, selectedRecipients]);

  const handleSend = async (message: string, context?: string) => {
    if (!selectedRecipients.length) {
      alert("Select at least one recipient.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipients: selectedRecipients,
          baseMessage: message,
          context,
          persona: {
            tone,
            guidance
          },
          mimicPersona
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to send messages");
      }

      setLogs((previous) => [...payload.results, ...previous].slice(0, 25));
    } catch (sendError) {
      const detail = sendError instanceof Error ? sendError.message : "Unknown error";
      setLogs((previous) => [
        {
          recipient: "system",
          status: "failed",
          detail
        },
        ...previous
      ]);
      console.error(sendError);
    } finally {
      setSending(false);
    }
  };

  if (error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Failed to load customers.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", display: "grid", gap: "1.5rem" }}>
      <header className={clsx("card")} style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>Agent Texter</h1>
            <p style={{ margin: "0.25rem 0 0", color: "var(--muted)", maxWidth: "32rem" }}>
              Select the people you serve, craft a seed message, and let the agent text them in your
              voice.
            </p>
          </div>
          <span className="badge">Auto-personalization ready</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div className="pill" style={{ background: "rgba(37, 99, 235, 0.1)", padding: "0.4rem 0.75rem" }}>
            Selected: {selectedRecipients.length}
          </div>
          <div className="pill" style={{ background: "rgba(17, 24, 39, 0.05)", padding: "0.4rem 0.75rem" }}>
            Persona mode: {mimicPersona ? "On" : "Off"}
          </div>
        </div>
      </header>

      <section className="grid two-col">
        <div className="card" style={{ display: "grid", gap: "1rem" }}>
          <h2 style={{ margin: 0 }}>Pick recipients</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Choose existing contacts. You can sync with a CRM by plugging in Supabase later.
          </p>
          <RecipientsPicker
            customers={customers}
            selectedIds={selectedRecipients}
            onChange={setSelectedRecipients}
          />
        </div>

        <PersonaControls
          tone={tone}
          guidance={guidance}
          mimicPersona={mimicPersona}
          onToneChange={setTone}
          onGuidanceChange={setGuidance}
          onTogglePersona={setMimicPersona}
        />
      </section>

      <section className="grid two-col">
        <MessageComposer onSend={handleSend} loading={sending} />
        <div className="card" style={{ display: "grid", gap: "1rem" }}>
          <h2 style={{ margin: 0 }}>Recipient insights</h2>
          {selectedProfiles.length ? (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {selectedProfiles.map((profile) => (
                <div
                  key={profile.id}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)"
                  }}
                >
                  <strong>{profile.name}</strong>
                  <p style={{ margin: "0.25rem 0 0", color: "var(--muted)" }}>
                    Prefers {profile.preferences?.tone ?? "friendly"} tone • Best time{" "}
                    {profile.preferences?.bestTime ?? "Anytime"}
                  </p>
                  <p style={{ margin: "0.35rem 0 0", fontSize: "0.85rem" }}>
                    Focus on {profile.preferences?.topics.join(", ") ?? "relationship check-in"}.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--muted)" }}>Pick at least one recipient to see signals.</p>
          )}
        </div>
      </section>

      <ActivityFeed logs={logs} />
    </main>
  );
}
