"use client";

import { useListingContext } from "@/contexts/ListingContext";
import { useEffect, useState } from "react";
import { Building2, Home, Landmark } from "lucide-react";
import FeatureServices from "@/services/feature/feature.services";


type Feature = {
  _id: string;
  featureName: string;
};

export default function FeaturePage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const { setFeatureId, setFeatureType, setListingId } = useListingContext();
  const [selected, setSelected] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data:any = await FeatureServices.fetchFeatures();
        setFeatures(data.data);
      } catch (err) {
        console.error("Error fetching features", err);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const createListing = async () => {
      if (!selected) return;

      const selectedFeature = features.find((feature) => feature._id === selected);
      if (!selectedFeature) return;

      const name:any= selectedFeature.featureName.toLowerCase();

      setFeatureId(selected);
      setFeatureType(name);

      try {
        const listingRes:any = await FeatureServices.createListing({
          featureType: name,
          featureId: selected,
        });
        setListingId(listingRes.data._id);
      } catch (err) {
        console.error("Error creating listing", err);
      }
    };

    createListing();
  }, [selected, features, setFeatureId, setFeatureType, setListingId]);

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
          {features.map((feature) => (
            <div
              key={feature._id}
              onClick={() => setSelected(feature._id)}
              className={`relative cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 ${selected === feature._id
                  ? "border-primary ring-0 ring-primary"
                  : "border-gray-200"
                }`}
            >
              <div className="absolute top-2 right-2 w-5 h-5 border-1 rounded border-gray-300 flex items-center justify-center bg-white">
                {selected === feature._id && (
                  <span className="text-primary text-xs font-bold leading-none">
                    ✔
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2">
                {getIcon(feature.featureName)}
                <span className="font-medium">{feature.featureName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
