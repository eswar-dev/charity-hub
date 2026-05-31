import type { Metadata } from "next";
import {
  Playfair_Display,
  DM_Sans,
  JetBrains_Mono,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";
import { HeaderOverlayProvider } from "@/context/HeaderOverlayContext";
import { ToastProvider } from "@/context/ToastContext";
import { PrototypeWatermark } from "@/components/shared/PrototypeWatermark";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { GuestBanner } from "@/components/layout/GuestBanner";

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

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
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
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} ${bebas.variable}`}
    >
      <body className="min-h-screen pb-16 antialiased md:pb-0" style={{ fontFamily: "var(--font-body)" }}>
        <PersonaProvider>
          <HeaderOverlayProvider>
            <ToastProvider>
              <GuestBanner />
              {children}
            <MobileBottomNav />
            <PrototypeWatermark />
            </ToastProvider>
          </HeaderOverlayProvider>
        </PersonaProvider>
      </body>
    </html>
  );
}
