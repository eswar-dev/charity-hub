import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";
import { ToastProvider } from "@/context/ToastContext";
import { PrototypeWatermark } from "@/components/shared/PrototypeWatermark";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charity Hub — Static Prototype",
  description:
    "Any event can become a reason to give. High-fidelity static prototype for founder review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-body)" }}>
        <PersonaProvider>
          <ToastProvider>
            {children}
            <PrototypeWatermark />
          </ToastProvider>
        </PersonaProvider>
      </body>
    </html>
  );
}
