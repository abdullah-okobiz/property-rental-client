import Navbar from "@/components/header/Navbar/Navbar";
import Footer from "./footer/page";
import { DateRangeProvider } from "@/contexts/DateRangeContext";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <DateRangeProvider>{children}</DateRangeProvider>
      <Footer />
    </div>
  );
}
