"use server";
import RentCard from "@/components/card/RentCard/RentCard";
import FlatCategory from "@/components/flat/FlatCategory/FlatCategory";
import { getAllCategory } from "@/services/category";

import { getAllFeature } from "@/services/feature";
import { getAllFlats } from "@/services/flats";
import { IListingFor, IRent } from "@/types";
import React from "react";

// interface flatProps {
//   searchParams: { category?: string };
// }

interface flatProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const Flat: React.FC<flatProps> = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const { data: features } = await getAllFeature();

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Flat"
  );

  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);

  const categoryId = resolvedParams.category;

  const { data: flats } = await getAllFlats({
    category: categoryId !== "all" ? categoryId : undefined,
  });
  return (
    <div className="Container mt-16">
      <FlatCategory
        rentCategories={rentCategories}
        selectedCategoryId={categoryId || "all"}
      />

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
