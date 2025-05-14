import NavBar from "../components/hostNav/NavBar";


 

export default function HostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar/>
      {children}
     
    </div>
  );
}
