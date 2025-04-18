import { useQuery } from "@tanstack/react-query";
import { getVendorProfileApi } from "../api/VendorApi";

export function useGetVendorProfile() {
  return useQuery({
    queryKey: ["VendorProfile"],
    queryFn: getVendorProfileApi,
  });
}
