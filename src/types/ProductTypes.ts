// types/productTypes.ts
export interface Product {
  product_id: string;
  product_title: string;
  skn: string;
  product_brand: string;
  type_product: string;
  product_original_price: number;
  product_discount_price: number;
  thumbnail_url: string;
  total_stock_count: number;
  is_public: boolean;
  free_delivery: boolean;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  total_records: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: Meta;
}

// types/product.ts
export type ProductType = "SIMPLE" | "WITH_VARIANTS" | "WITH_SUBVARIANTS";

export interface ProductData {
  product_id: string;
  product_brand: string;
  product_title: string;
  type_product: ProductType;
  description: string | null;
  product_original_price: number | null;
  product_discount_price: number | null;
  total_stock_count: number | null;
  is_public: boolean;
  refund_policy: boolean;
  free_delivery: boolean;
  star_rating: number | null;
  pickup_location: string | null;
  image_url: string;
  attributes: any[];
  variants: any[];
}

interface Step {
  id: number;
  title: string;
  component: React.ComponentType<any>;
}

// types/product.ts
export interface Warehouse {
  ware_house_id: string;
  address_nickname: string;
  address_details: any;
  contact_info: any;
  pickup_location: string;
  comment: string;
  order_id: string | null;
}

export interface Category {
  category_id: string;
  name: string;
  image_url: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubcategoryGroup {
  group_id: string;
  name: string;
  category_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  subcategory_id: string;
  name: string;
  image_url: string | null;
  is_public: boolean;
  group_id: string;
  subcategory_group: {
    name: string;
    category: {
      name: string;
      category_id: string;
    };
  };
  category_id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}