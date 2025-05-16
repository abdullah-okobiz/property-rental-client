"use client";

import { useListingContext } from "@/contexts/ListingContext";
import { useEffect, useState } from "react";
import CategoryServices from "@/services/category/category.services";


type Category = {
  _id: string;
  categoryName: string;
};

export default function CategoryPage() {
  const { featureId, listingId, featureType } = useListingContext();
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      if (!featureId) return;

      try {
        const res: any = await CategoryServices.fetchCategories(featureId);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [featureId]);


  const handleCategorySelect = async (catId: string) => {
    if (!featureType || !listingId) return;

    try {
      await CategoryServices.setListingCategory({
        featureType,
        listingId,
        categoryId: catId,
      });
    } catch (err) {
      console.error("Error setting listing category:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Select a Category</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id}>
            <button
              className="px-4 py-2 bg-gray-100 rounded w-full text-left hover:bg-gray-200 transition"
              onClick={() => handleCategorySelect(category._id)}
            >
              {category.categoryName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
