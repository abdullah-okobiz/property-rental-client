"use server";
import { apiBaseUrl } from "@/config/config";
import { LandSearchResponse } from "@/types/landTypes/landTypes";

type GetAllLandsParams = {
  page?: number;
  status?: string;
  sort?: number;
  category?: string;

  location?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const getAllLands = async ({
  page = 1,
  status,
  sort,
  category,
  location,
  minPrice,
  maxPrice,
}: GetAllLandsParams = {}) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  if (status) params.append("status", status);
  if (sort !== undefined) params.append("sort", sort.toString());
  if (category) params.append("category", category);
  if (location) params.append("location", location);
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());

  const url = `${apiBaseUrl}/land?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch land");
  return res.json();
};

export const getSingleLandBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/land/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch land");
  }

  return res.json();
};
