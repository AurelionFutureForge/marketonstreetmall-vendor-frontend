export interface breadcrumbValues {
  title: string;
  link:string
}

export interface RegisteredUser {
  readonly user_id: string;
  name: string;
  email: string;
  role: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UserLogin {
  readonly otp_id: string;
}

export interface AppUserSendOtp {
  mobile_number: string;
  otp_id: string;
}

export interface RegisteredAppUser {
  readonly s_no: number;
  user_id: string;
  name: string;
  age: string;
  mobile_number: string;
  email: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface DebouncingVerifyRole {
  success: boolean;
  message: string;
  data: {
    user_id: string;
    role: string;
  };
}

export interface SessionUserData {
  readonly s_no: number;
  readonly cms_user_id: string;
  name: string;
  readonly email: string;
  password: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  role: string;
  readonly tokenData: {
    readonly access_token: string;
    readonly refresh_token: string;
  };
  exp: number;
  iat: number;
  jti: number;
}

export interface UsersData {
  readonly s_no: number;
  readonly user_id: string;
  name: string;
  age: string;
  mobile_number: string;
  email: string;
  address: {
    billing_city: string;
    billing_email: string;
    billing_phone: string;
    billing_state: string;
    billing_address: string;
    billing_country: string;
    billing_pincode: string;
    billing_address_2: string;
    billing_last_name: string;
    billing_customer_name: string;
  };
  role: "CUSTOMER" | "ZONAL" | "FRANCISE_PARTNER" | "COMPANY" | "DISTRIBUTOR";
  createdAt: string;
  updatedAt: string;
  wishlist: string[];
  orders: string[];
  payments: string[];
  parentRelation: {
    readonly id: number;
    readonly parent_id: string;
    readonly child_id: string;
  } | null;
  childRelations:
    | {
        id: number;
        parent_id: string;
        child_id: string;
      }[]
    | null;
}

export interface userDataWithMeta {
  data: UsersData[];
  meta: {
    pagination: {
      total_data: number
      total_pages: number
      current_page: number
      per_page: number
    };
  };
}

export interface childrenDataWithMeta {
  data: UsersData[];
  meta: {
    pagination: {
      total_data: number
      total_pages: number
      current_page: number
      per_page: number
    };
  };
}

export interface AdminUser {
  s_no: number;
  cms_user_id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface typeRequestedDummyIdBy {
  user_id: string;
  name: string;
  email: string;
  _count: {
    childRelations: number;
  };
}

export interface typedummyIdRequests {
  request_dummy_id: string;
  requested_by_id: string;
  requested_role: string;
  requested_count: number;
  status: string;
  created_at: string;
  updated_at: string;
  requested_by: typeRequestedDummyIdBy;
  total_children: number;
}
export interface typeFetchDummyIdRequests{
  success: boolean,
  data: typedummyIdRequests[]
}