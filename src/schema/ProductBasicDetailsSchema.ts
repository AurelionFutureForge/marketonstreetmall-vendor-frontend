// types/schema/ProductBasicDetailsSchema.ts
import * as z from "zod";

const attributeValueSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
});

const attributeGroupSchema = z.object({
  attributes_title: z.string().min(1, "Attribute title is required"),
  attribute_value: z.array(attributeValueSchema).min(1, "At least one attribute value is required"),
});

export const basicDetailsSchema = z.object({
  product_brand: z.string().min(1, "Brand name is required"),
  product_title: z.string().min(1, "Product title is required"),
  description: z.string().min(1, "Description is required"),
  product_original_price: z.number().min(0, "Original price must be greater than or equal to 0"),
  product_discount_price: z.number().min(0, "Discount price must be greater than or equal to 0"),
  total_stock_count: z.number().int().min(0, "Stock count must be greater than or equal to 0"),
  skn: z.string().min(1, "SKU is required"),
  refund_policy: z.boolean(),
  free_delivery: z.boolean(),
  dimensions: z.object({
    length: z.number().min(0),
    breadth: z.number().min(0),
    height: z.number().min(0),
    weight: z.number().min(0),
  }),
  pickup_location: z.string().min(1, "Pickup location is required"),
  fragile: z.boolean(),
  approx_cod_cost: z.number().min(0),
  category: z.string().min(1, "Category is required"),
  subcategoryGroup: z.string().min(1, "Subcategory group is required"),
  subcategory_id: z.string().min(1, "Subcategory is required"),
  ware_house_id: z.string().min(1, "Warehouse is required"),
  attributes: z.array(attributeGroupSchema),
  thumbnail_url: z.string().min(1, "Enter valid URL").url(),
});

export type BasicDetailsFormData = z.infer<typeof basicDetailsSchema>;