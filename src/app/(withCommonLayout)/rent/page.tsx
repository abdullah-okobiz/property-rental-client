"use server";

import RentCard from "@/components/card/RentCard/RentCard";
import RentCategory from "@/components/rent/RentCategory/RentCategory";
import { getAllCategory } from "@/services/category";
import { getAllFeature } from "@/services/feature";
import { getAllRents } from "@/services/rents";
import { IListingFor, IRent } from "@/types";
import React from "react";

interface RentProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const Rent: React.FC<RentProps> = async ({ searchParams }) => {
  const { data: features } = await getAllFeature();
  const resolvedParams = await searchParams;
  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Rent"
  );
  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);
  console.log("rentcategoris == ", rentCategories);

  const categoryId = resolvedParams.category;
  const { data: rents } = await getAllRents({
    category: categoryId !== "all" ? categoryId : undefined,
  });

  return (
    <div className="Container mt-16">
      <RentCategory
        rentCategories={rentCategories}
        selectedCategoryId={categoryId || "all"}
      />

      {/* <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {rents
          ?.filter((rent: IRent) => rent.status === "published")
          .slice(0, 8)
          .map((rent: IRent) => (
            <RentCard key={rent._id} rent={rent} linkPrefix="rent" />
          ))}
      </div> */}

      <div className="mt-8">
        {rents?.filter((rent: IRent) => rent.status === "published").length ===
        0 ? (
          <p className="text-center text-gray-500 lg:py-60 py-20">
            No published rents available at the moment.
          </p>
        ) : (
          <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
            {rents
              ?.filter((rent: IRent) => rent.status === "published")
              .map((rent: IRent) => (
                <RentCard key={rent._id} rent={rent} linkPrefix="rent" />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;
