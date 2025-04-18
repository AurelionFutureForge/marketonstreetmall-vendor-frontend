export interface Banner {
  app_banner_id: string;
  app_banner_name: string;
  app_banner_url: string;
  app_banner_description: string;
  is_public: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface BannerListResponse {
  success: boolean;
  message: string;
  data: {
    data: Banner[];
    meta: {
      pagination: {
        total_data: number;
        per_page: number;
        current_page: number;
        total_pages: number;
      };
    };
  };
}

export interface CreateBannerRequest {
  app_banner_name: string;
  app_banner_url: string;
  app_banner_description: string;
}

export interface UpdateBannerRequest {
  app_banner_name: string;
  app_banner_url: string;
  app_banner_description: string;
  is_public: boolean;
  priority: number;
}

export interface BannerFilter {
  is_public?: boolean;
  search?: string;
}