// types/types/TopProductTypes.ts
export interface Product {
  product_id: string;
  product_title: string;
  skn: string;
  product_brand: string;
  thumbnail_url: string;
  type_product: string;
  product_original_price: number;
  product_discount_price: number;
  total_stock_count: number;
  is_public: boolean;
  free_delivery: boolean;
  created_at: string;
  updated_at: string;
}

export interface TopProduct {
  top_product_id: string;
  product_id: string;
  status: string;
  is_public: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface TopProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: TopProduct[];
    meta: {
      pagination: {
        total_data: number;
        limit: number;
        current_page: number;
        total_pages: number;
      };
    };
  };
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: Product[];
    meta: {
      total_records: number;
      total_pages: number;
      current_page: number;
      per_page: number;
    };
  };
}

export interface TopProductFilter {
  is_public?: boolean;
  search?: string;
  status?: string;
}

export interface AddTopProductRequest {
  product_ids: string[];
}

export interface UpdateTopProductRequest {
  top_product_id: string;
  is_public: boolean;
  priority: number;
}