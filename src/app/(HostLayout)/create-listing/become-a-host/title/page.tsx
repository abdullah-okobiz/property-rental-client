"use client";

import { useEffect, useState } from "react";
import { Input, Typography } from "antd";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

const { Title, Text } = Typography;

export default function TitlePage() {
  const [title, setTitle] = useState("");
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  useEffect(() => {
    const fetchTitle = async () => {
      if (!listingId || !featureType) return;
      try {
        const res:any = await CategoryServices.getListingTitle(
          featureType,
          listingId
        );
        console.log(res, "response title ");
        setTitle(res?.title || "");
      } catch (error) {
        console.error("Error fetching title:", error);
      }
    };
    fetchTitle();
  }, [listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    const res = await CategoryServices.updateListingTitle(
      featureType,
      listingId,
      title
    );
    console.log("result title ", res);
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [title, listingId, featureType]);

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4 px-4">
        <Title level={3}>Enter Listing Title</Title>
        <Text type="secondary">
          Give your listing a short and catchy title.
        </Text>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Cozy 2-bedroom apartment near Gulshan"
          size="large"
        />
      </div>
    </div>
  );
}
