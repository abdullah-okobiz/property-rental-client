"use client";

import React, { useState } from "react";
import { IRent } from "@/types";
import RentCard from "@/components/card/RentCard/RentCard";
import Image from "next/image";

import loader from "@/assets/images/load-more.png";

interface RentListProps {
  rents: IRent[];
}

const RentList: React.FC<RentListProps> = ({ rents }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const publishedRents = rents.filter((rent) => rent.status === "published");

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more on each click
  };

  return (
    <div className="mt-8">
      {publishedRents.length === 0 ? (
        <p className="text-center text-gray-500 lg:py-60 py-20">
          No published rents available at the moment.
        </p>
      ) : (
        <>
          <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
            {publishedRents.slice(0, visibleCount).map((rent) => (
              <RentCard key={rent._id} rent={rent} linkPrefix="rent" />
            ))}
          </div>

          {visibleCount < publishedRents.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="flex justify-center items-center gap-[10px] px-[10px] py-[6px] border border-solid border-[#FDCDBE] rounded-[8px] mx-auto cursor-pointer"
              >
                <div
                  className="px-[8px] py-[7px] rounded-[30px]"
                  style={{
                    background:
                      "linear-gradient(182.07deg, rgba(241, 89, 39, 0) -68.03%, rgba(241, 89, 39, 0.467) -13.86%, rgb(241, 89, 39) 98.26%)",
                  }}
                >
                  <Image
                    src={loader}
                    alt="load more icon"
                    width={12}
                    height={15}
                    className="max-w-[12px] h-auto"
                  />
                </div>
                <div className="text-[#202020] text-base font-medium leading-6">
                  Load More
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentList;
