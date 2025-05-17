'use client';

import { useListingContext } from "@/contexts/ListingContext";
import { useState } from "react";


export default function DescriptionStep() {
  const { listingId, featureType } = useListingContext();
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;

    await fetch(`http://localhost:5000/api/v1/host/${featureType}/${listingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
  };

  return (
    <div>
      <h2>Add Description</h2>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save & Next
      </button>
    </div>
  );
}
