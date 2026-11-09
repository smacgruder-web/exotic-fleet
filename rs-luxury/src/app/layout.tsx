import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/CormorantGaramond-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/CormorantGaramond-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/CormorantGaramond-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/CormorantGaramond-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "../fonts/Manrope-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Manrope-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Manrope-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Manrope-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Manrope-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RS Luxury & Exotic Rentals",
    template: "%s · RS Luxury",
  },
  description:
    "Elite exotic cars, Presidential Sprinters, and chauffeur service across the DMV and Miami — executive travel, weddings, red-carpet events, and secure transit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <SiteHeader />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
