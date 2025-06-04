"use server";
import RentCard from "@/components/card/RentCard/RentCard";
import FlatCategory from "@/components/flat/FlatCategory/FlatCategory";
import FlatSearchInputField from "@/components/home/search/searchContainer/FlatSearchInputField";
import { getAllCategory } from "@/services/category";

import { getAllFeature } from "@/services/feature";
import { getAllFlats } from "@/services/flats";
import { IListingFor, IRent } from "@/types";
import { Tabs } from "antd";
import React from "react";

interface flatProps {
  searchParams: Promise<{
    location?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const Flat: React.FC<flatProps> = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const { location, category, minPrice, maxPrice } = resolvedParams;
  const { data: features } = await getAllFeature();

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Flat"
  );

  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);

  const categoryId = resolvedParams.category;

  const { data: flats } = await getAllFlats({
    location,
    category: category !== "all" ? category : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  const tabClass =
    "text-white bg-[#F2693C] !inline-block lg:px-4 px-2 py-1 lg:py-2 rounded lg:w-[60px] w-[50px]";
  const items = [
    {
      key: "Flat",
      label: <div className={tabClass}>Flat</div>,
      children: <FlatSearchInputField params={resolvedParams} />,
    },
  ];
  return (
    <div className="Container mt-8 md:my-10">
      <Tabs defaultActiveKey="Flat" type="card" items={items} />
      <div className="my-4">
        <FlatCategory
          rentCategories={rentCategories}
          selectedCategoryId={categoryId || "all"}
        />
      </div>

      {/* <div>
        <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {flats?.slice(0, 8).map((rent: IRent) => (
            <RentCard key={rent._id} rent={rent} linkPrefix="flat"></RentCard>
          ))}

          {flats
            ?.filter((rent: IRent) => rent.publishStatus === "published")
            .slice(0, 8)
            .map((rent: IRent) => (
              <RentCard key={rent._id} rent={rent} linkPrefix="rent" />
            ))}
        </div>
      </div> */}

      <div>
        <div className="mt-8">
          {flats?.filter((rent: IRent) => rent.publishStatus === "published")
            .length === 0 ? (
            <p className="text-center text-gray-500 lg:py-60 py-20">
              No published flats available at the moment.
            </p>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
              {flats
                ?.filter((rent: IRent) => rent.publishStatus === "published")
                .slice(0, 8)
                .map((rent: IRent) => (
                  <RentCard key={rent._id} rent={rent} linkPrefix="flat" />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flat;
