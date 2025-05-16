'use client';

import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import { useEffect, useState } from "react";

export default function DescriptionStep() {
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();
  const [description, setDescription] = useState('');

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [description, listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    await fetch(`/host/${featureType}/${listingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Description</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Write about your listing..."
        rows={6}
      />
    </div>
  );
}
