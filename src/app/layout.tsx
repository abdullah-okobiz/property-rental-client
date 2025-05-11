import { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NextTopLoader from "nextjs-toploader"; 
import { ReactNode } from "react";
import { Lato } from "next/font/google"; 
import AuthProvider from "@/providers/AuthProvider";

// Create QueryClient instance
const queryClient = new QueryClient();

// const lato = Lato({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homzystay",
  description:
    "Rental is one of the best property dealing website in local market of Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <NextTopLoader showSpinner={false} color="#F15927" />
      {/* <body className={`${lato.className} antialiased`}> */}
      <body className={`antialiased`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
