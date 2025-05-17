"use server";
import { apiBaseUrl } from "@/config/config";

type GetAllRentsParams = {
  page?: number;
  status?: string;
  sort?: number;
  category?: string;
};

export const getAllRents = async ({
  page = 1,
  status,
  sort,
  category,
}: GetAllRentsParams = {}) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  if (status) params.append("status", status);
  if (sort !== undefined) params.append("sort", sort.toString());
  if (category) params.append("category", category);

  const url = `${apiBaseUrl}/rent?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch rents");
  return res.json();
};
