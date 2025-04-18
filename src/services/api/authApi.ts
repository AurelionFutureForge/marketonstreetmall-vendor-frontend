import axios from "axios";
import { axiosAppInstance, axiosInstance } from "@/lib/axiosInstance";
import { AppUserSendOtp, UserLogin } from "@/types/AuthCmsUserTypes";
import {
  ChangeAdminPasswordValues,
  LoginUserFieldValues,
} from "@/schema/cmsUserSchema";

export interface ApiResponse<T> {
  data: T;
}

export const loginApi = async (
  data: LoginUserFieldValues
): Promise<UserLogin> => {
  try {
    const response = await axiosInstance.post<ApiResponse<UserLogin>>(
      "/auth/login",
      data
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occured");
      }
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const RegisteredUserApi = async (data: any) => {
  try {
    const response = await axiosInstance.post("/app-users", data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occured");
      }
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

//send otp

export const sendAppUserOtp = async (
  mobileNumber: string
): Promise<AppUserSendOtp> => {
  try {
    const response = await axiosInstance.post<ApiResponse<AppUserSendOtp>>(
      "/app-users/send-otp",
      { mobile_number: mobileNumber }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occured");
      }
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const verifyAppUserOtp = async (otp_id: string, otp: string) => {
  try {
    const response = await axiosInstance.post("/app-users/verify-otp", {
      otp_id: otp_id,
      otp: otp,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occured");
      }
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const forgotPasswordApi = async (data: { email: string }) => {
  try {
    const response = await axiosInstance.post("/vendor/auth/forgot-password", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const resetPasswordApi = async (data: {
  new_password: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post("/vendor/auth/reset-password", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateAdminPasswordApi = async (
  id: string,
  data: ChangeAdminPasswordValues
) => {
  try {
    const response = await axiosInstance.post(`/auth/change-password`, {
      cms_user_id: id,
      old_password: data?.old_password,
      new_password: data?.new_password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message.error);
      } else {
        throw new Error("An unexpected error occured");
      }
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};
