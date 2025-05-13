"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllRents = async () => {
  const res = await fetch(
    `${apiBaseUrl}/rent?page=1&status=in_progress&sort=1`
  );

  return res.json();
};
