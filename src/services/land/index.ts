"use server";
import { apiBaseUrl } from "@/config/config";
import { LandSearchResponse } from "@/types/landTypes/landTypes";

type GetAllLandsParams = {
  page?: number;
  status?: string;
  sort?: number;
  category?: string;
};

export const getAllLands = async ({
  page = 1,
  status,
  sort,
  category,
}: GetAllLandsParams = {}) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  if (status) params.append("status", status);
  if (sort !== undefined) params.append("sort", sort.toString());
  if (category) params.append("category", category);

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
export const searchLandListings = async (params: {
  location?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
}): Promise<LandSearchResponse> => {
  const query = new URLSearchParams();

  if (params.location) query.append("location", params.location);
  if (params.category) query.append("category", params.category);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice.toString());
  if (params.minPrice) query.append("minPrice", params.minPrice.toString());

  const res = await fetch(`${apiBaseUrl}/land-search?${query.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch land");
  }

  return res.json();
};
