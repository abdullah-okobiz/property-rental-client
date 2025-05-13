"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllBanners = async () => {
  const res = await fetch(`${apiBaseUrl}/admin/banner`);
console.log(res)
  return res.json();
};
