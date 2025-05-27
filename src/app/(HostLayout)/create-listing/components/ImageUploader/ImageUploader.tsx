"use client";

import React, { useState, useRef } from "react";
import { useListingContext } from "@/contexts/ListingContext";
import ListingImageApis from "@/services/imageListing/imageListing.service";
import { message, Typography } from "antd";

const { Title, Text } = Typography;

const ImageUploader: React.FC = () => {
  const { listingId, featureType } = useListingContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !listingId || !featureType) return;

    const formData = new FormData();
    formData.append("images", file);

    try {
      setLoading(true);
      const res = await ListingImageApis.uploadImage(
        featureType,
        listingId,
        formData
      );
      messageApi.success("Image Upload Successfully");

      console.log("res == ", res);
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error("Upload failed", error);
      messageApi.error("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!listingId || !featureType) return;

    try {
      setLoading(true);
      await ListingImageApis.deleteImage(featureType, listingId);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Delete failed", error);
      alert("Image delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {contextHolder}
      <div>
        <Title level={3}>Share some photos of your place</Title>
        <Text type="secondary">You can add more later.</Text>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
          loading
            ? "opacity-50 pointer-events-none"
            : "hover:bg-gray-50 border-gray-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="max-w-xs max-h-60 object-cover rounded-xl mx-auto"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-sm hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Click to upload or drag & drop image
            </p>
            <div className="text-sm text-gray-400">(Supported: .jpg, .png)</div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
