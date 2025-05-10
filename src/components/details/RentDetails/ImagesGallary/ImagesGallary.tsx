import Image from "next/image";
import React from "react";

const ImagesGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Main large image */}
      <div className="w-full h-[420px]">
        <Image
          src={images[0]}
          alt="Main Image"
          width={500}
          height={500}
          className="w-full h-full object-fit rounded"
        />
      </div>

      {/* Remaining images */}
      <div className="grid grid-cols-2 gap-2">
        {images.slice(1).map((img, index) => (
          <div key={index} className="w-full h-[205px]">
            <Image
              src={img}
              alt={`Image ${index + 2}`}
              width={300}
              height={300}
              className="w-full h-full object-fit rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesGallery;
