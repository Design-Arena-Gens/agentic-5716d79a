import { useMemo } from "react";
import { CustomerProfile } from "@/types";
import clsx from "clsx";

interface RecipientsPickerProps {
  customers: CustomerProfile[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function RecipientsPicker({ customers, selectedIds, onChange }: RecipientsPickerProps) {
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const toggleSelection = (id: string) => {
    const next = new Set(selectedSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(Array.from(next));
  };

  return (
    <div className="grid two-col">
      {customers.map((customer) => {
        const isSelected = selectedSet.has(customer.id);
        return (
          <button
            key={customer.id}
            type="button"
            onClick={() => toggleSelection(customer.id)}
            className={clsx("card", "recipient-card", {
              selected: isSelected
            })}
            style={{
              borderColor: isSelected ? "rgba(37, 99, 235, 0.35)" : undefined,
              boxShadow: isSelected
                ? "0 16px 28px -20px rgba(37, 99, 235, 0.65)"
                : undefined
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ margin: 0 }}>{customer.name}</h3>
                <p style={{ color: "var(--muted)", margin: "0.25rem 0 0" }}>
                  {customer.relationship.toUpperCase()} • {customer.phone}
                </p>
              </div>
              <span className="badge">{customer.preferences?.tone ?? "friendly"}</span>
            </div>
            <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {customer.tags.map((tag) => (
                <span
                  key={tag}
                  className="pill"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.125rem 0.5rem",
                    background: "rgba(17, 24, 39, 0.05)"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
              Best time: {customer.preferences?.bestTime ?? "Anytime"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
