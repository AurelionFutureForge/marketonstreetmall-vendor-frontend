export interface Order {
  order_id: string;
  customer_name: string;
  contact_number: string;
  total_order_amount: number;
  payment_method: string;
  status: string;
  fulfillment_status: string;
  order_items: string;
  created_at: string;
  tracking_id: string | null;
}

export interface OrderListResponse {
  success: boolean;
  message: string;
  data: {
    data: Order[];
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

export interface Product {
  product_id: string;
  product_title: string;
  thumbnail_url: string;
}

export interface OrderProduct {
  order_product_id: string;
  quantity: number;
  price_per_unit: number | null;
  total_price: number | null;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  sub_variant_id: string | null;
  product: Product;
}

export interface Shipment {
  shipment_id: string;
  shipment_number: string | null;
  shiprocket_id: string;
  status: string;
  status_code: string | null;
  courier_name: string | null;
  awb_code: string | null;
  created_at: string;
  updated_at: string;
  order_id: string;
  warehouse_id: string;
}

export interface BillingAddress {
  billing_city: string;
  billing_email: string;
  billing_phone: string;
  billing_state: string;
  billing_address: string;
  billing_country: string;
  billing_pincode: string;
  user_address_id: string;
  billing_address_2: string;
  billing_last_name: string;
  billing_customer_name: string;
}

export interface User {
  user_id: string;
  name: string;
  mobile_number: string;
  email: string;
}

export interface OrderItem {
  skn: string;
  name: string;
  amount: number;
  currency: string;
  quantity: number;
  product_id: string;
}

export interface DetailedOrder {
  order_id: string;
  payment_method: string;
  product_original_price: number;
  product_discount_price: number;
  total_order_commission: number;
  total_company_commission: number;
  total_downline_commission: number;
  total_order_amount: number;
  discount: number | null;
  coupon_code: string | null;
  dimensions: {
    height: number;
    length: number;
    weight: number;
    breadth: number;
  };
  order_items: OrderItem[];
  status: string;
  fulfillment_status: string;
  pickup_location: string | null;
  billing_address: BillingAddress;
  expected_delivery_date: string | null;
  shipment_created: boolean;
  tracking_id: string;
  tax_amount: number | null;
  tax_details: any | null;
  order_notes: string;
  order_source: string | null;
  affiliate_id: string | null;
  campaign_id: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: User;
  products: OrderProduct[];
  payments: any | null;
  refund: any | null;
  shipment: Shipment[];
}

export interface OrderDetailResponse {
  success: boolean;
  message: string;
  data: {
    data: DetailedOrder;
  };
}

export interface CreateShipmentRequest {
  user_id: string;
  productIds: string[];
  total: number;
}

export interface CreateShipmentResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface OrderFilter {
  status?: string;
  search?: string;
}