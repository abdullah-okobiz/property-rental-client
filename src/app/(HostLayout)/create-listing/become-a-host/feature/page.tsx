"use client";

import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import { useEffect, useState } from "react";
import { Building2, Home, Landmark } from "lucide-react";
import FeatureServices from "@/services/feature/feature.services";
import { Feature } from "@/types/blogTypes/blogTypes";

import { Skeleton, message } from "antd";
import { FeatureType } from "@/app/(hostLayout)/components/types/feature";
import { ListingResponse } from "@/app/(hostLayout)/components/types/listing";

export default function FeaturePage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setFeatureId, setFeatureType, setListingId } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();
  const [messageApi, contextHolder] = message.useMessage();

  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await FeatureServices.fetchFeatures();
        setFeatures(data?.data || []);
      } catch (err) {
        console.error("Error fetching features", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selected) {
      setError("Please select a feature before continuing.");
      return;
    }
    setError("");

    const selectedFeature = features.find(
      (feature) => feature._id === selected
    );
    if (!selectedFeature) return;

    const featureNameLower = selectedFeature.featureName.toLowerCase();

    const name = featureNameLower as FeatureType;

    setFeatureId(selected);
    setFeatureType(name);

    try {
      const listingRes: ListingResponse = await FeatureServices.createListing({
        featureType: name,
        featureId: selected,
      });
      messageApi.success(`${name} initialize Successfully`);

      const listingId = listingRes?.data?._id;

      if (listingId) {
        localStorage.setItem("listingId", listingId);
      }
      setListingId(listingId);
    } catch (err) {
      console.error("Error creating listing", err);
      messageApi.error("Failed to Initialized");
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [selected, features]);

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
      {contextHolder}
      <div className="w-full max-w-6xl space-y-6">
        <h2 className="text-xl font-semibold tracking-wide mb-4 text-center">
          Which of these best describes your place?
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton.Button
                key={idx}
                active
                block
                style={{ height: 150, borderRadius: 16 }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature._id}
                onClick={() => setSelected(feature._id)}
                className={`relative cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 ${
                  selected === feature._id
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
        )}
      </div>
    </div>
  );
}
