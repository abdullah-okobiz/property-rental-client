"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllLands = async () => {
  const res = await fetch(`${apiBaseUrl}/land`);

  return res.json();
};
