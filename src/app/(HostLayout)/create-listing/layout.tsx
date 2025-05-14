import NavBar from "../components/hostNav/NavBar";


 

export default function CreateListLayout({
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
