"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllFlats = async () => {
  const res = await fetch(`${apiBaseUrl}/rent`);

  return res.json();
};
