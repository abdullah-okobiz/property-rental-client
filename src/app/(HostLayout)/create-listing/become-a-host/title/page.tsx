 
'use client';

import { useState } from 'react';
import StepNavigation from '../../components/stepNavigation/StepNavigation';
import { useListingContext } from '@/contexts/ListingContext';


export default function TitlePage() {
  const [title, setTitle] = useState('');
  const { listingId, featureType } = useListingContext();

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    await fetch(`/host/${featureType}/${listingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Enter Listing Title</h1>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <StepNavigation onNextSubmit={handleSubmit} />
    </div>
  );
}
