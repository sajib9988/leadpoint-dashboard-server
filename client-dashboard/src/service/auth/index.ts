/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData: FieldValues) => {
  try {
    console.log("Making API call to:", `${process.env.NEXT_PUBLIC_BASE_API}/user/register`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    console.log("Login result:", result);
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }
    if (result.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }
    console.log("token", result.data.accessToken);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  console.log(
    "Retrieved accessToken:",
    accessToken ? "Token exists" : "No token found"
  );

  if (accessToken) {
    try {
      // Assuming jwtDecode might return a promise or be async based on previous 'await'
      // If jwtDecode is synchronous, the 'await' can be removed.
      // For safety and consistency with prior use, keeping await.
      const decodedData = await jwtDecode(accessToken);
      return decodedData;
    } catch (error) {
      console.error("Error decoding access token:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
