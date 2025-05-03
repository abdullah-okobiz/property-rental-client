"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllBanners = async () => {
  const res = await fetch(`${apiBaseUrl}/admin/banner`);

  return res.json();
};
