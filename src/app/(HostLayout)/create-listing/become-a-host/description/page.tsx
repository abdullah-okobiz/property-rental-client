"use client";

import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import { Input, Typography } from "antd";
import { useEffect, useState } from "react";
import CategoryServices from "@/services/category/category.services";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function DescriptionStep() {
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    const res = await CategoryServices.updateListingDescription(
      featureType,
      listingId,
      description
    );
    console.log("res==== ", res);
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
