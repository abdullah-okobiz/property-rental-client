"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import React, { useRef } from "react";
import { TBanner } from "@/types";

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiBaseUrl } from "@/config/config";
import { Swiper as SwiperClass } from "swiper";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
interface BannerProps {
  banners: TBanner[];
}

const BannerSlider: React.FC<BannerProps> = ({ banners }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  console.log("try to find banner", banners);
  return (
    <div className="relative Container">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper as SwiperClass)}
        speed={1200}
        loop={true}
      >
        {banners?.map((banner: TBanner) => (
          <SwiperSlide key={banner._id}>
            <div className="2xl:h-[700px] xl:h-[500px] lg:h-[400px] h-[250px] rounded  relative">
              <Image
                src={apiBaseUrl + banner.bannerImage || ""}
                // src="https://i.ibb.co.com/BH68QtdS/slider-1.webp"
                alt="Banner"
                width={1600}
                height={600}
                className="w-full h-full rounded"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev flex items-center justify-center border-2 border-primary hover:border-[#fff] p-2 rounded-full text-primary hover:bg-primary hover:text-[#fff] duration-300 cursor-pointer absolute xl:left-46 lg:left-28 md:left-24 left-8 top-1/2 transform -translate-y-1/2  z-10"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <MdArrowBackIos className="text-2xl" />
      </button>
      <button
        className="custom-next border-2 border-primary hover:border-[#fff] p-2 rounded-full text-primary hover:bg-primary hover:text-[#fff] duration-300 cursor-pointer absolute xl:right-46 lg:right-28 md:right-24 right-8 top-1/2 transform -translate-y-1/2 l z-10"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <MdArrowForwardIos className="text-2xl" />
      </button>
    </div>
  );
};

export default BannerSlider;
