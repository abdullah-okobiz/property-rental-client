"use server";
import { apiBaseUrl } from "@/config/config";

type GetAllFlatsParams = {
  page?: number;
  status?: string;
  sort?: number;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const getAllFlats = async ({
  page = 1,
  status,
  sort,
  category,
  location,
  minPrice,
  maxPrice,
}: GetAllFlatsParams = {}) => {
  const params = new URLSearchParams();
  console.log("-------------------", params);
  // const res = await fetch(`${apiBaseUrl}/flat`);

  params.append("page", page.toString());
  if (status) params.append("status", status);
  if (sort !== undefined) params.append("sort", sort.toString());
  if (category) params.append("category", category);
  if (location) params.append("location", location);
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());

  const url = `${apiBaseUrl}/flat?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch flat");
  return res.json();
};

export const getSingleFlatBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/flat/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch flat");
  }

  return res.json();
};
