"use client";

import { useListingContext } from "@/contexts/ListingContext";
import { useEffect, useState } from "react";
import { Building2, Home, Landmark } from "lucide-react";

export default function FeaturePage() {
  const [features, setFeatures] = useState([]);
  const { setFeatureId, setFeatureType, setListingId } = useListingContext();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/admin/feature")
      .then((res) => res.json())
      .then((data) => setFeatures(data.data));
  }, []);

  useEffect(() => {
    if (!selected) return;

    const selectedFeature: any = features.find((f: any) => f._id === selected);
    if (!selectedFeature) return;

    const name = selectedFeature.featureName.toLowerCase();
    setFeatureId(selected);
    setFeatureType(name);

    fetch(`http://localhost:5000/api/v1/host/${name}/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingFor: [selected] }),
    })
      .then((res) => res.json())
      .then((data) => setListingId(data.data._id));
  }, [selected]);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "rent":
        return <Home className="w-8 h-8 text-primary" />;
      case "flat":
        return <Building2 className="w-8 h-8 text-primary" />;
      case "land":
        return <Landmark className="w-8 h-8 text-primary" />;
      default:
        return <Home className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <h2 className="text-xl font-semibold tracking-wide mb-6 text-center">
          Which of these best describes your place?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f: any) => (
            <div
              key={f._id}
              onClick={() => setSelected(f._id)}
              className={`relative cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 ${
                selected === f._id
                  ? "border-primary ring-0 ring-primary"
                  : "border-gray-200"
              }`}
            >
              <div className="absolute top-2 right-2 w-5 h-5 border-1 rounded border-gray-300 flex items-center justify-center bg-white">
                {selected === f._id && (
                  <span className="text-primary text-xs font-bold leading-none">
                    ✔
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2">
                {getIcon(f.featureName)}
                <span className="font-medium">{f.featureName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
