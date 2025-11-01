import { PersonaTone } from "@/types";

interface PersonaControlsProps {
  tone: PersonaTone;
  guidance: string;
  mimicPersona: boolean;
  onToneChange: (tone: PersonaTone) => void;
  onGuidanceChange: (value: string) => void;
  onTogglePersona: (value: boolean) => void;
}

export function PersonaControls({
  tone,
  guidance,
  mimicPersona,
  onToneChange,
  onGuidanceChange,
  onTogglePersona
}: PersonaControlsProps) {
  return (
    <div className="card" style={{ display: "grid", gap: "1rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>Persona Guidance</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Teach the agent how to text like you. Toggle off to send raw messages.
          </p>
        </div>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          <input
            type="checkbox"
            checked={mimicPersona}
            onChange={(event) => onTogglePersona(event.target.checked)}
          />
          Mimic my voice
        </label>
      </header>

      <div>
        <label style={{ display: "block", fontWeight: 600 }}>Tone</label>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          {(["friendly", "professional", "enthusiastic"] as const).map((currentTone) => (
            <button
              type="button"
              key={currentTone}
              onClick={() => onToneChange(currentTone)}
              style={{
                padding: "0.5rem 0.9rem",
                borderRadius: "999px",
                border:
                  tone === currentTone ? "2px solid var(--primary)" : "1px solid var(--border)",
                background: tone === currentTone ? "rgba(37, 99, 235, 0.1)" : "white",
                color: tone === currentTone ? "var(--primary)" : "var(--text)",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {currentTone[0].toUpperCase() + currentTone.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
          Signature details
        </label>
        <textarea
          rows={4}
          value={guidance}
          onChange={(event) => onGuidanceChange(event.target.value)}
          placeholder="E.g. Remind them I appreciate their loyalty, mention the upcoming launch, sign off as 'Sam from BrightCo'."
          style={{
            width: "100%",
            borderRadius: "0.75rem",
            border: "1px solid var(--border)",
            padding: "0.75rem",
            resize: "vertical",
            fontFamily: "inherit"
          }}
        />
      </div>
    </div>
  );
}
