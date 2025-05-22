"use client";

import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import { useEffect, useState } from "react";
import CategoryServices from "@/services/category/category.services";

import { Home, Building2, Landmark, Warehouse } from "lucide-react";
import { Category } from "@/app/(HostLayout)/components/types/category";

export default function CategoryPage() {
  const { featureId, listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      if (!featureId) return;

      try {
        const res = await CategoryServices.fetchCategories(featureId);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [featureId]);

  const handleSubmit = async () => {
    if (!selected) {
      setError("Please select a category before continuing.");
      return;
    }

    setError("");

    if (!listingId || !featureType) return;

    try {
      const categoryPatchRes = await CategoryServices.setListingCategory({
        featureType,
        listingId,
        categoryId: selected,
      });
      console.log("categoryPatchRes ==", categoryPatchRes);
    } catch (err) {
      console.error("Error setting listing category:", err);
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [selected, listingId, featureType]);

  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "apartment":
      case "flat":
        return <Building2 className="w-8 h-8 text-primary" />;
      case "house":
        return <Home className="w-8 h-8 text-primary" />;
      case "land":
        return <Landmark className="w-8 h-8 text-primary" />;
      case "warehouse":
        return <Warehouse className="w-8 h-8 text-primary" />;
      default:
        return <Home className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-[calc(80vh-100px)] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <h2 className="text-xl font-semibold tracking-wide mb-6 text-center">
          Which category best describes your place?
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => setSelected(category._id)}
              className={`relative cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 ${
                selected === category._id
                  ? "border-primary ring-0 ring-primary"
                  : "border-gray-200"
              }`}
            >
              <div className="absolute top-2 right-2 w-5 h-5 border rounded border-gray-300 flex items-center justify-center bg-white">
                {selected === category._id && (
                  <span className="text-primary text-xs font-bold leading-none">
                    ✔
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2">
                {getCategoryIcon(category.categoryName)}
                <span className="font-medium">{category.categoryName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
