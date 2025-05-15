'use client';

import { useListingContext } from '@/contexts/ListingContext';
import { useEffect, useState } from 'react';


export default function CategoryPage() {
  const { featureId, listingId, featureType } = useListingContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!featureId) return;
    fetch(`http://localhost:5000/api/v1/admin/category?feature_id=${featureId}`)
      .then(res => res.json())
      .then(data => setCategories(data.data));
  }, [featureId]);

  const handleCategorySelect = (catId: string) => {
    fetch(`http://localhost:5000/api/v1/host/${featureType}/${listingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: catId }),
    });
  };

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Select a Category</h2>
      <ul className="space-y-2">
        {categories.map((c: any) => (
          <li key={c._id}>
            <button
              className="px-4 py-2 bg-gray-100 rounded w-full text-left"
              onClick={() => handleCategorySelect(c._id)}
            >
              {c.categoryName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
