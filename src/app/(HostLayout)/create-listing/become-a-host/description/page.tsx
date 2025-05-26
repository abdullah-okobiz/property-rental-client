"use client";

import { useEffect, useState } from "react";
import { Input, Typography } from "antd";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function DescriptionStep() {
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      if (!listingId || !featureType) return;
      try {
        const res: any = await CategoryServices.getListingDescription(
          featureType,
          listingId
        );
        console.log("Fetched description:", res);
        setDescription(res?.data?.description || "");
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };
    fetchDescription();
  }, [listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    try {
      const res = await CategoryServices.updateListingDescription(
        featureType,
        listingId,
        description
      );
      console.log("Description updated:", res);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [description, listingId, featureType]);

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <div className="w-full max-w-3xl px-4 space-y-4">
        <Title level={3}>Add Description</Title>
        <Text type="secondary">
          Describe your place. Mention the highlights, special amenities,
          neighborhood, etc.
        </Text>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Spacious and bright 3-bedroom apartment with a beautiful view of the lake..."
          rows={6}
        />
      </div>
    </div>
  );
}
