'use client';

import { useEffect, useState } from 'react';
import { useListingContext } from '@/contexts/ListingContext';

import { useListingStepContext } from '@/contexts/ListingStepContext';
import CategoryServices from '@/services/category/category.services';

export default function TitlePage() {
  const [title, setTitle] = useState('');
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
   const res= await CategoryServices.updateListingTitle(featureType, listingId, title);
   console.log("result title ",res)
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [title, listingId, featureType]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Enter Listing Title</h1>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
