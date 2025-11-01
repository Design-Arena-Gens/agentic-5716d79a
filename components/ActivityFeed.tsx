import { MessageResult } from "@/types";

interface ActivityFeedProps {
  logs: MessageResult[];
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
  if (!logs.length) {
    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Activity</h2>
        <p style={{ color: "var(--muted)" }}>Sent message history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: "grid", gap: "1rem" }}>
      <header>
        <h2 style={{ margin: 0 }}>Latest Sends</h2>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Monitor delivery status and personalization responses.
        </p>
      </header>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {logs.map((log) => (
          <div
            key={`${log.recipient}-${log.sid ?? log.detail}`}
            style={{
              padding: "0.75rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              background: "rgba(17, 24, 39, 0.015)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{log.recipient}</strong>
              <span
                className="badge"
                style={{
                  background:
                    log.status === "sent"
                      ? "rgba(22, 163, 74, 0.15)"
                      : log.status === "failed"
                      ? "rgba(220, 38, 38, 0.15)"
                      : "rgba(217, 119, 6, 0.15)",
                  color:
                    log.status === "sent"
                      ? "var(--success)"
                      : log.status === "failed"
                      ? "var(--danger)"
                      : "var(--warning)"
                }}
              >
                {log.status.toUpperCase()}
              </span>
            </div>
            <p style={{ margin: "0.35rem 0 0", color: "var(--muted)", fontSize: "0.85rem" }}>
              {log.detail}
            </p>
            {log.sid ? (
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.75rem", color: "var(--muted)" }}>
                SID: {log.sid}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
