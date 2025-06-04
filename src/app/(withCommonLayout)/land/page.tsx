"use server";
import RentCard from "@/components/card/RentCard/RentCard";
import LandSearchInputField from "@/components/home/search/searchContainer/LandSearchInputField";
import LandCategory from "@/components/land/LandCategory/LandCategory";
import { getAllCategory } from "@/services/category";

import { getAllFeature } from "@/services/feature";
import { getAllLands } from "@/services/land";
import { IListingFor, IRent } from "@/types";
import { Tabs } from "antd";

interface landProps {
  searchParams: Promise<{
    location?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const Land: React.FC<landProps> = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const { location, category, minPrice, maxPrice } = resolvedParams;

  const { data: features } = await getAllFeature();

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Land"
  );

  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);

  const categoryId = resolvedParams.category;

  const { data: lands } = await getAllLands({
    location,
    category: category !== "all" ? category : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  console.log("lands data ====", lands);
  const tabClass =
    "text-white bg-[#F2693C] !inline-block lg:px-4 px-2 py-1 lg:py-2 rounded lg:w-[60px] w-[50px]";
  const items = [
    {
      key: "land",
      label: <div className={tabClass}>Land</div>,
      children: <LandSearchInputField params={resolvedParams} />,
    },
  ];
  return (
    <div className="Container mt-8 md:my-10">
      <Tabs defaultActiveKey="land" type="card" items={items} />
      <div className="md:my-4">
        <LandCategory
          rentCategories={rentCategories}
          selectedCategoryId={categoryId || "all"}
        />
      </div>
      <div>
        <div className="mt-8">
          {lands?.filter((rent: IRent) => rent.publishStatus === "published")
            .length === 0 ? (
            <p className="text-center text-gray-500 lg:py-60 py-20">
              No published lands available at the moment.
            </p>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
              {lands
                ?.filter((rent: IRent) => rent.publishStatus === "published")
                .slice(0, 8)
                .map((rent: IRent) => (
                  <RentCard key={rent._id} rent={rent} linkPrefix="land" />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Land;
