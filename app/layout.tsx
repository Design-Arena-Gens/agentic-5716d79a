import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Agent Texter",
  description: "Personalized SMS outreach agent for customers and clients."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
