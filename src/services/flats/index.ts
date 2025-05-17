"use server";
import { apiBaseUrl } from "@/config/config";

type GetAllFlatsParams = {
  page?: number;
  status?: string;
  sort?: number;
  category?: string;
};

export const getAllFlats = async ({
  page = 1,
  status,
  sort,
  category,
}: GetAllFlatsParams = {}) => {
  const params = new URLSearchParams();
  console.log("-------------------", params);
  // const res = await fetch(`${apiBaseUrl}/flat`);

  params.append("page", page.toString());
  if (status) params.append("status", status);
  if (sort !== undefined) params.append("sort", sort.toString());
  if (category) params.append("category", category);

  const url = `${apiBaseUrl}/flat?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch flat");
  return res.json();
};
