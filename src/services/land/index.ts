"use server";
import { apiBaseUrl } from "@/config/config";

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

