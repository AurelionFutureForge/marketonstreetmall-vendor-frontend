// schemas/productSchema.ts

import { z } from "zod";

// Define the product type enum to match backend requirements
export const ProductType = {
  SIMPLE: "SIMPLE",
  WITH_VARIANTS: "WITH_VARIANTS",
  WITH_SUBVARIANTS: "WITH_SUBVARIANTS",
} as const;

// Create the schema for add product form
export const addProductSchema = z.object({
  product_title: z.string().min(1, "Product title is required"),
  skn: z.string().min(1, "SKN is required"),
  type_product: z.enum([
    ProductType.SIMPLE,
    ProductType.WITH_VARIANTS,
    ProductType.WITH_SUBVARIANTS
  ], {
    required_error: "Product type is required",
  }),
});

// Export type for form data
export type AddProductFormData = z.infer<typeof addProductSchema>;