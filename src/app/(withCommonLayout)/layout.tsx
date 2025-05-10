
import Navbar from "@/components/header/Navbar/Navbar";
import Footer from "./footer/page";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      {children}
     <Footer/>
    </div>
  );
}
