// app/create-listing/become-a-host/layout.tsx

import { ListingProvider } from "@/contexts/ListingContext";
import StepNavigation from "../components/stepNavigation/StepNavigation";
import NavBar from "../../components/hostNav/NavBar";


export default function BecomeAHostLayout({ children }: { children: React.ReactNode }) {
  return (
    <ListingProvider>
      <NavBar/>
      <div className="max-w-2xl mx-auto p-4">
        {children}
        <StepNavigation />
      </div>
    </ListingProvider>
  );
}
