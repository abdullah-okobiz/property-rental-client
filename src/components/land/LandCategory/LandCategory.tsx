"use client";
import { poppins } from "@/app/font";
import { ICategory } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  rentCategories: ICategory[];
  selectedCategoryId: string;
}

const LandCategory: React.FC<Props> = ({
  rentCategories,
  selectedCategoryId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryId);
    }

    router.push(`/land?${newParams.toString()}`);
  };

  const allCategories = [
    { _id: "all", categoryName: "All Lands" },
    ...rentCategories,
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {allCategories.map((category) => {
        const isSelected = selectedCategoryId === category._id;

        return (
          <div key={category._id}>
            <p
              onClick={() => handleSelect(category._id)}
              className={`
                border 
                ${
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-[#262626]/40 text-black"
                }
                hover:border-primary hover:text-white hover:bg-primary 
                duration-300 rounded px-2 py-1 text-sm font-medium cursor-pointer 
                ${poppins.className}
              `}
            >
              {category.categoryName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LandCategory;
