"use client";
import { Input, message } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import { useEffect, useState } from "react";
import CategoryServices from "@/services/category/category.services";

export default function LocationPage() {
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchLocation = async () => {
      if (!listingId || !featureType) return;
      try {
        const res: any = await CategoryServices.getListingLocation(
          featureType,
          listingId
        );
        console.log(res, "response Location ");
        setLocation(res?.data?.location || "");
      } catch (error) {
        console.error("Error fetching Location:", error);
      }
    };
    fetchLocation();
  }, [listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    try {
      const res = await CategoryServices.updateListingLocation(
        featureType,
        listingId,
        location
      );
      messageApi.success(`Location Updated successfully`);
      console.log("Location updated:", res);
    } catch (err) {
      console.error("Error updating location:", err);
      messageApi.error("Location updated Failed");
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [location, listingId, featureType]);

  return (
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center">
      {contextHolder}
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
            Where’s your place located?
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Your address helps guests find and book your place.
          </p>
        </div>

        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter the address or city
          </label>
          <Input
            size="large"
            placeholder="e.g. Dhanmondi, Dhaka"
            prefix={<EnvironmentOutlined />}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

// "use client";

// export const dynamic = "force-dynamic";

// import React from "react";

// export default function LocationPage() {
//   return <div>{/* <LocationStep /> */}</div>;
// }
