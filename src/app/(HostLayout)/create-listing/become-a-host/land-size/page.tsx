"use client";
import { InputNumber } from "antd";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import { useEffect, useState } from "react";
import CategoryServices from "@/services/category/category.services";

export default function LandSizePage() {
  const { listingId: contextId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  const [listingId, setListingId] = useState<string | null>(contextId ?? null);
  const [landSize, setLandSize] = useState<number | null>(null);

  // On mount, fallback to localStorage if context has no ID
  useEffect(() => {
    if (!contextId) {
      const storedId = localStorage.getItem("listingId");
      if (storedId) {
        setListingId(storedId);
      }
    }
  }, [contextId]);

  // Fetch land size once listingId and featureType are available
  useEffect(() => {
    const fetchLandSize = async () => {
      if (!listingId || !featureType) return;
      try {
        const res: any = await CategoryServices.getListingLandSize(
          featureType,
          listingId
        );
        setLandSize(res?.landSize ?? null);
      } catch (error) {
        console.error("Error fetching land size:", error);
      }
    };
    fetchLandSize();
  }, [listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType || landSize === null) return;
    try {
      await CategoryServices.updateListingLandSize(
        featureType,
        listingId,
        landSize
      );
    } catch (error) {
      console.error("Error updating land size:", error);
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [landSize, listingId, featureType]);

  return (
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
            What’s the land size?
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Please enter the land size in square feet.
          </p>
        </div>

        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Land Size (sqft)
          </label>
          <InputNumber
            size="large"
            min={0}
            value={landSize ?? undefined}
            onChange={(value) => setLandSize(value ?? null)}
            className="!w-full rounded-xl"
            placeholder="Enter land size"
          />
        </div>
      </div>
    </div>
  );
}
