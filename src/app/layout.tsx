import type { Metadata } from "next";

import "./globals.css";
import { lato } from "./font";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Rental",
  description:
    "Rental is one of the best property dealing website in local market of Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextTopLoader showSpinner={false} color="#F15927" />
      <body className={`${lato.className}} antialiased`}>{children}</body>
    </html>
  );
}
