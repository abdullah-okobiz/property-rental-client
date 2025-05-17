"use server";
import RentCard from "@/components/card/RentCard/RentCard";
import FlatCategory from "@/components/flat/FlatCategory/FlatCategory";
import { getAllCategory } from "@/services/category";

import { getAllFeature } from "@/services/feature";
import { getAllFlats } from "@/services/flats";
import { IListingFor, IRent } from "@/types";

interface flatProps {
  searchParams: { category?: string };
}

const Flat = async ({ searchParams }: flatProps) => {
  const { data: features } = await getAllFeature();

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Flat"
  );

  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);

  const categoryId = searchParams.category;

  const { data: flats } = await getAllFlats({
    category: categoryId !== "all" ? categoryId : undefined,
  });
  return (
    <div className="Container mt-16">
      <FlatCategory
        rentCategories={rentCategories}
        selectedCategoryId={categoryId || "all"}
      />

      <div>
        <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {flats?.slice(0, 8).map((rent: IRent) => (
            <RentCard key={rent._id} rent={rent}></RentCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flat;
