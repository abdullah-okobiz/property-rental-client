"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllRents = async () => {
  const res = await fetch(`${apiBaseUrl}/rent`);

  return res.json();
};
