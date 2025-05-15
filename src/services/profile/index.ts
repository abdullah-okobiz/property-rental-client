"use server";
import { apiBaseUrl } from "@/config/config";

export const getProfileWork = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/profile/work`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};


export const getProfileLocation = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/profile/location`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};


export const getProfileLanguage = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/profile/language`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const getProfileBio = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/profile/bio`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const getProfileAvatar = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiBaseUrl}/profile/avatar`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
