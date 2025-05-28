"use client";

import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { VscLocation } from "react-icons/vsc";
import RentSearchModel from "@/components/modals/RentSearchModel";
import { Category } from "@/app/(HostLayout)/components/types/category";
import CategoryServices from "@/services/category/category.services";
import { useRouter } from "next/navigation";
interface LandSearchInputFieldProps {
  params?: {
    category?: string;
    location?: string;
    maxPrice?: string | number | null;
  };
}
const LandSearchInputField: React.FC<LandSearchInputFieldProps> = ({
  params,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [location, setLocation] = useState(params?.location ?? "");
  const [price, setPrice] = useState<number | "">(() => {
    const rawPrice = params?.maxPrice;
    if (typeof rawPrice === "number") return rawPrice;
    if (typeof rawPrice === "string" && !isNaN(Number(rawPrice))) {
      return Number(rawPrice);
    }
    return "";
  });
  const [categoryId, setCategoryId] = useState(params?.category ?? "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryServices.fetchLandCategories();

        setCategories(data?.data);
      } catch (error) {
        console.error("Failed to fetch land categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (location) queryParams.append("location", location);
    if (categoryId) queryParams.append("category", categoryId);
    if (price) queryParams.append("maxPrice", price.toString());

    queryParams.append("minPrice", "0");

    router.push(`/land?${queryParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full p-4 bg-white shadow-sm rounded-md"
    >
      <div className="lg:hidden flex items-center justify-between group">
        <p
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 font-medium sm:text-base text-[13px] text-[#262626]/40"
        >
          <span className="text-primary">
            <VscLocation />
          </span>
          <span>Search for the land you want!</span>
        </p>
        <p
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 text-[#262626]/50 uppercase font-medium group-hover:text-primary duration-300"
        >
          <span>
            <GoSearch />
          </span>
          <span className="tracking-wide cursor-pointer">Search</span>
        </p>
      </div>

      <div className="lg:flex hidden flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full md:w-1/4 bg-[#F5F5F5]  border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md p-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Where’s your place located?
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter location"
            className="w-full px-4 py-2 border-0 rounded-md focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md p-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Land Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter max price"
            className="w-full px-4 py-2 border-0 rounded-md focus:outline-none"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="w-full md:w-1/4 bg-[#F5F5F5]  border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md p-2">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category of Land
          </label>
          <select
            name="type"
            id="type"
            className="w-full px-4 py-2 border-0 rounded-md bg-[#F5F5F5] focus:outline-none"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="w-full md:w-auto flex items-end h-full">
          <button
            type="submit"
            className="w-full md:w-auto cursor-pointer px-6 md:py-[25px] bg-primary font-extrabold !text-white rounded-md hover:bg-primary/90 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile Modal */}
      {openModal && <RentSearchModel onClose={() => setOpenModal(false)} />}
    </form>
  );
};

export default LandSearchInputField;
