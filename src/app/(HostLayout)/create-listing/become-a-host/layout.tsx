// app/create-listing/become-a-host/layout.tsx

import { ListingProvider } from "@/contexts/ListingContext";
import StepNavigation from "../components/stepNavigation/StepNavigation";
import NavBar from "../../components/hostNav/NavBar";

export default function BecomeAHostLayout({ children }: { children: React.ReactNode }) {
  return (
    <ListingProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        {/* Main content area with scroll */}
        <main className="flex-grow max-w-2xl w-full mx-auto p-4">
          {children}
        </main>

        {/* Sticky footer navigation */}
        <div className="sticky bottom-0 bg-white border-t p-4 shadow-md z-50">
          <div className="max-w-2xl mx-auto">
            <StepNavigation />
          </div>
        </div>
      </div>
    </ListingProvider>
  );
}
