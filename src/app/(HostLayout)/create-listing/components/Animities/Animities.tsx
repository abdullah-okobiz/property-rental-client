"use client";

import { useEffect, useState } from "react";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

import { Skeleton, message, Image } from "antd";
import { Amenity } from "@/app/(HostLayout)/components/types/category";

export default function Amenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    try {
      await CategoryServices.updateHouseAminities(
        featureType,
        listingId,
        selectedAmenities
      );
      messageApi.success("Amenities updated successfully");
    } catch (err) {
      console.error(err);
      messageApi.error("Failed to update amenities");
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [selectedAmenities]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const data: any = await CategoryServices.getAmenities();
        setAmenities(data?.data);
      } catch (err) {
        console.error(err);
        messageApi.error("Failed to load amenities");
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  return (
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center">
      {contextHolder}
      <div className="w-full max-w-6xl space-y-6">
        <h2 className="text-xl font-semibold tracking-wide mb-4 text-center">
          Tell guests what your place has to offer
        </h2>
        <h5 className="text-sm text-gray-500 font-semibold tracking-wide mb-4 text-center">
          You can add more amenities after you publish your listing
        </h5>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton.Button
                key={idx}
                active
                block
                style={{ height: 80, borderRadius: 16 }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {amenities?.map((amenity) => (
              <div
                key={amenity._id}
                onClick={() => toggleAmenity(amenity._id)}
                className={`relative cursor-pointer border rounded-2xl p-4 text-center transition-all duration-200 ${
                  selectedAmenities.includes(amenity._id)
                    ? "border-primary ring-0 ring-primary"
                    : "border-gray-200"
                }`}
              >
                <div className="absolute top-2 right-2 w-5 h-5 border rounded border-gray-300 flex items-center justify-center bg-white">
                  {selectedAmenities.includes(amenity._id) && (
                    <span className="text-primary text-xs font-bold leading-none">
                      ✔
                    </span>
                  )}
                </div>
                <Image
                  src={amenity.amenitiesImage.replace("/public", "")}
                  alt={amenity.amenitiesLabel}
                  height={50}
                  preview={false}
                  className="mx-auto mb-2"
                />
                <span className="font-medium">{amenity.amenitiesLabel}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
