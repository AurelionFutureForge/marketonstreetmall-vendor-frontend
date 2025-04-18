'use client';
import axios from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { vendorProfileSchema, VendorProfile } from "@/schema/VendorSchema";

export interface ApiResponse<T> {
  data: T;
}

export const getVendorProfileApi = async (): Promise<VendorProfile> => {
  try {
    const response = await axiosInstance.get<ApiResponse<VendorProfile>>(
      "/vendor/profile"
    );
    const validatedData = vendorProfileSchema.parse(response.data.data);
    return validatedData;
  } catch (error) {
    console.log("Error fetching vendor profile:", error);
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message.error);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
