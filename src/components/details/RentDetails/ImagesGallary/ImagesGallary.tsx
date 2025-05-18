"use client";
import ImageModel from "@/components/modals/ImageModel";
import { apiBaseUrl } from "@/config/config";
import Image from "next/image";
import React, { useState } from "react";
import { TbGridDots } from "react-icons/tb";

interface ImagesGalleryProps {
  images: string[];
}
const ImagesGallery: React.FC<ImagesGalleryProps> = ({ images }) => {
  const [openGallery, setOpenGallery] = useState(false);
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-4 relative cursor-pointer">
        {/* Main large image */}
        <div onClick={() => setOpenGallery(true)} className="w-full h-[430px]">
          <Image
            src={apiBaseUrl + images[0]}
            alt="Main Image"
            width={500}
            height={500}
            className="w-full h-full object-fit rounded"
          />
        </div>

        {/* Remaining images */}
        <div
          onClick={() => setOpenGallery(true)}
          className="grid grid-cols-2 gap-2"
        >
          {images.slice(1, 5).map((img, index) => (
            <div key={index} className="w-full h-[210px]">
              <Image
                src={apiBaseUrl + img}
                alt={`Image ${index + 2}`}
                width={300}
                height={300}
                className="w-full h-full object-fit rounded"
              />
            </div>
          ))}
        </div>

        <div
          onClick={() => setOpenGallery(true)}
          className="flex items-center gap-2 border rounded px-2 cursor-pointer text-sm font-medium py-2 absolute bottom-5 right-5 bg-[#fff]"
        >
          <p>
            <TbGridDots />
          </p>
          <p>Show all photos</p>
        </div>
      </div>
      <div
        className={`w-full h-screen bg-white fixed top-0 left-0 z-50 p-6 overflow-y-auto overflow-x-hidden scrollbar-hide ${
          openGallery
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <ImageModel images={images} setOpenGallery={setOpenGallery} />
      </div>
    </div>
  );
};

export default ImagesGallery;
