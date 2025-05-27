"use client";

import { useEffect, useState } from "react";
import { Input, message, Typography } from "antd";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

const { Title, Text } = Typography;

export default function TitlePage() {
  const [title, setTitle] = useState("");
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchTitle = async () => {
      if (!listingId || !featureType) return;
      try {
        const res: any = await CategoryServices.getListingTitle(
          featureType,
          listingId
        );

        console.log(res?.data?.title, "response title ");
        setTitle(res?.data?.title || "");
      } catch (error) {
        console.error("Error fetching title:", error);
      }
    };
    fetchTitle();
  }, [listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    try {
      const res = await CategoryServices.updateListingTitle(
        featureType,
        listingId,
        title
      );
      messageApi.success(`Title Updated Successfully `);
      console.log("result title ", res);
    } catch (error) {
      console.error(error);
      messageApi.error(`Title Updated Failed`);
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [title, listingId, featureType]);

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      {contextHolder}
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
