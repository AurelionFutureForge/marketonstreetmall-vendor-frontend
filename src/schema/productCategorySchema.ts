import { z } from "zod";

// Product-Category Types
const AddProductCategorySchema = z.object({
  name: z.string(),
  image_url: z.string(),
});

const UpdateProductCategorySchema = z.object({
  is_public: z.boolean(),
  name: z.string(),
  image_url: z.string(),
});

export type AddProductCategoryTypes = z.infer<typeof AddProductCategorySchema>;
export type UpdateProductCategoryTypes = z.infer<
  typeof UpdateProductCategorySchema
>;

export { AddProductCategorySchema, UpdateProductCategorySchema };

//Product-Group Types
const AddProductGroupSchema = z.object({
  name: z.string()
});

const UpdateProductGroupSchema = z.object({
  is_public: z.boolean(),
  name: z.string(),
});

export type AddProductGroupTypes = z.infer<typeof AddProductGroupSchema>;
export type UpdateProductGroupTypes = z.infer<
  typeof UpdateProductGroupSchema
>;

export { AddProductGroupSchema, UpdateProductGroupSchema };

// Product-Sub Category Types
const AddProductSubCategorySchema = z.object({
  name: z.string(),
  image_url: z.string(),
});

const UpdateProductSubCategorySchema = z.object({
  is_public: z.boolean(),
  name: z.string(),
  image_url: z.string(),
});

//Product
export const addProductFormDataSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required'),
  ProductTitle: z.string().min(1, 'Product title is required'),
  description: z.string().min(1, 'Description is required').email('Invalid email address'),
  productOriginalPrice: z.string().regex(/^\d+$/, "Product Original Price is required"),
  productDiscountPrice: z.string().regex(/^\d+$/, "Product Discounted Price is required"),
  totalStockCount: z.string().regex(/^\d+$/, "Total Stock Count is required"),
  skuNumber: z.string().min(1, 'SKU Number is required'),
  refundPolicy: z.string().min(1, 'Refund Policy is required'),
  freeDelivery: z.string().min(1, 'Free Delivery is required'),
  lengthDimension:z.string().regex(/^\d+$/, "Length dimension is required"),
  breadthDimension:z.string().regex(/^\d+$/, "Breadth dimension is required"),
  heightDimension:z.string().regex(/^\d+$/, "Height dimension is required"),
  weightDimension:z.string().regex(/^\d+$/, "Weight dimension is required"),
  pickupLocation: z.string().min(1, 'Pickup Location is required'),
  fragile: z.string().min(1, 'Fragile is required'),
  approxCodCost: z.string().regex(/^\d+$/, "Approx COD Cost is required"),
})

export type AddProductSubCategoryTypes = z.infer<typeof AddProductSubCategorySchema>;
export type UpdateProductSubCategoryTypes = z.infer<
  typeof UpdateProductSubCategorySchema
>;
export type AddProductTypes = z.infer<typeof addProductFormDataSchema>

export { AddProductSubCategorySchema, UpdateProductSubCategorySchema };


