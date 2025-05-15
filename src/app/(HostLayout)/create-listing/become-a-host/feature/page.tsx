'use client';
 
import { useListingContext } from '@/contexts/ListingContext';
import { useEffect, useState } from 'react';


export default function FeaturePage() {
  const [features, setFeatures] = useState([]);

  const { setFeatureId, setFeatureType, setListingId } = useListingContext();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/admin/feature')
      .then(res => res.json())
      .then(data => setFeatures(data.data));
  }, []);
 console.log("feature data = ", features)
  useEffect(() => {
    if (!selected) return;

    const selectedFeature:any = features.find((f: any) => f._id === selected);
    if (!selectedFeature) return;

    const name = selectedFeature.featureName.toLowerCase();
    setFeatureId(selected);
    setFeatureType(name);

    // Create new listing
    fetch(`http://localhost:5000/api/v1/host/${name}/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingFor: [selected] }),
    })
      .then(res => res.json())
      .then(data => setListingId(data.data._id));
  }, [selected]);

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Select a Feature</h2>
      <ul className="space-y-2">
        {features.map((f: any) => (
          <li key={f._id}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="feature"
                value={f._id}
                onChange={() => setSelected(f._id)}
              />
              <span>{f.featureName}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
