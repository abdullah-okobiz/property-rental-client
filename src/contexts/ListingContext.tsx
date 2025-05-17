
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ListingContextType = {
  listingId: string | null;
  featureType: 'rent' | 'flat' | 'land' | null;
  featureId: string | null;
  setListingId: (id: string) => void;
  setFeatureType: (type: 'rent' | 'flat' | 'land') => void;
  setFeatureId: (id: string) => void;
};

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const useListingContext = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error('useListingContext must be used within a ListingProvider');
  }
  return context;
};

export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [listingId, setListingId] = useState<string | null>(null);
  const [featureType, setFeatureType] = useState<'rent' | 'flat' | 'land' | null>(null);
  const [featureId, setFeatureId] = useState<string | null>(null);
  console.log("listing id = ", listingId,
    "feature type",
    featureType,
    "feature id = ",)

  return (
    <ListingContext.Provider
      value={{
        listingId,
        featureType,
        featureId,
        setListingId,
        setFeatureType,
        setFeatureId,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
