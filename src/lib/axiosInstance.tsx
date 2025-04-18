import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const baseAppURL = process.env.NEXT_PUBLIC_BASE_APP_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosAppInstance = axios.create({
  baseURL: baseAppURL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Create axios interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      // Add logging to debug session access
      console.log("Session in request interceptor:", session?.user);

      if (session?.user?.access_token) {
        config.headers["Authorization"] = `Bearer ${session.user.access_token}`;
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Add debugging for error response
    console.log("Error response:", error.response?.status);
    console.log("Original request:", originalRequest);

    // If error is 400 and we haven't retried yet
    if (error.response?.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get session and add debug logging
        const session = await getSession();
        console.log("Session in refresh attempt:", session?.user);

        if (!session?.user?.refresh_token) {
          console.log("No refresh token found in session");
          throw new Error("No refresh token available");
        }

        // Call refresh token endpoint with explicit payload logging
        const refreshPayload = {
          refresh_token: session.user.refresh_token
        };
        console.log("Refresh token payload:", refreshPayload);

        const response = await axios.post(
          `${baseURL}/auth/refresh-token`,
          refreshPayload
        );

        if (response.data) {
          // Log successful token refresh
          console.log("Token refresh successful:", response.data);

          // Update session with new tokens
          const event = new CustomEvent("tokenRefreshed", {
            detail: response.data
          });
          window.dispatchEvent(event);

          // Update original request with new token
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);

        // Add delay before sign out to avoid immediate redirect
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await signOut({ callbackUrl: "/" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
