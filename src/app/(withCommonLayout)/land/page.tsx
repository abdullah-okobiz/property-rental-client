"use server";
import RentCard from "@/components/card/RentCard/RentCard";
import LandCategory from "@/components/land/LandCategory/LandCategory";
import { getAllCategory } from "@/services/category";

import { getAllFeature } from "@/services/feature";
import { getAllLands } from "@/services/land";
import { IListingFor, IRent } from "@/types";

interface landProps {
  searchParams: { category?: string };
}

const Land = async ({ searchParams }: landProps) => {
  const { data: features } = await getAllFeature();

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Land"
  );

  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);

  const categoryId = searchParams.category;

  const { data: lands } = await getAllLands({
    category: categoryId !== "all" ? categoryId : undefined,
  });
  return (
    <div className="Container mt-16">
      <LandCategory
        rentCategories={rentCategories}
        selectedCategoryId={categoryId || "all"}
      />

      <div>
        <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {lands?.slice(0, 8).map((rent: IRent) => (
            <RentCard key={rent._id} rent={rent}></RentCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Land;
