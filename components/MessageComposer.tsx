import { FormEvent, useState } from "react";

interface MessageComposerProps {
  onSend: (message: string, context?: string) => Promise<void>;
  loading: boolean;
}

export function MessageComposer({ onSend, loading }: MessageComposerProps) {
  const [message, setMessage] = useState(
    "Hey there! Wanted to personally check in and share a quick update."
  );
  const [context, setContext] = useState("Mention the spring promo and upcoming meetup.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSend(message, context);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: "grid", gap: "1rem" }}>
      <header>
        <h2 style={{ margin: 0 }}>Compose Message</h2>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Draft the message seeds. The agent will adapt it to each recipient when mimic mode is on.
        </p>
      </header>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
          Base message
        </label>
        <textarea
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          style={{
            width: "100%",
            borderRadius: "0.75rem",
            border: "1px solid var(--border)",
            padding: "0.75rem",
            fontFamily: "inherit",
            resize: "vertical"
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
          Context cues (optional)
        </label>
        <input
          type="text"
          value={context}
          onChange={(event) => setContext(event.target.value)}
          placeholder="Add hints about promos, events, gratitude, etc."
          style={{
            width: "100%",
            borderRadius: "0.75rem",
            border: "1px solid var(--border)",
            padding: "0.75rem"
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.9rem 1.25rem",
          borderRadius: "0.9rem",
          border: "none",
          background: "var(--primary)",
          color: "white",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: loading ? "wait" : "pointer",
          boxShadow: "0 15px 30px -15px rgba(37, 99, 235, 0.8)"
        }}
      >
        {loading ? "Sending texts..." : "Send texts"}
      </button>
    </form>
  );
}
