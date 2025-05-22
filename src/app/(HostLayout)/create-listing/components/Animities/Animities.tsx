"use client";
import { useEffect, useState } from "react";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

const HOUSE_RULES = [
  "Hot tub",
  "Patio",
  "Lake access",
  "Beach access",
  "Outdoor shower",
  "BBQ grill",
  "Indoor fireplace",
];

export default function Animities() {
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  const toggleRule = (rule: string) => {
    setSelectedRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
    );
  };

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    const res = await CategoryServices.updateHouseAminities(
      featureType,
      listingId,
      selectedRules
    );
    console.log("House rules updated:", res);
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [selectedRules, listingId, featureType]);

  return (
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <h2 className="text-xl font-semibold tracking-wide mb-4 text-center">
          Tell guests what your place has to offer
        </h2>
        <h5 className="text-sm text-gray-500 font-semibold tracking-wide mb-4 text-center">
          You can add more amenities after you publish your listing
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {HOUSE_RULES.map((rule) => (
            <div
              key={rule}
              onClick={() => toggleRule(rule)}
              className={`relative cursor-pointer border rounded-2xl p-4 text-center transition-all duration-200 ${
                selectedRules.includes(rule)
                  ? "border-primary ring-0 ring-primary"
                  : "border-gray-200"
              }`}
            >
              <div className="absolute top-2 right-2 w-5 h-5 border rounded border-gray-300 flex items-center justify-center bg-white">
                {selectedRules.includes(rule) && (
                  <span className="text-primary text-xs font-bold leading-none">
                    ✔
                  </span>
                )}
              </div>
              <span className="font-medium">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
