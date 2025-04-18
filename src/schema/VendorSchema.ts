import * as z from "zod";

export const vendorProfileSchema = z.object({
  vendor_id: z.string(),
  business_name: z.string(),
  legal_name: z.string(),
  email: z.string().email(),
  phone: z.string(),

  gstin: z.string().optional(),
  pan: z.string().optional(),
  commission_rate: z.number().optional(),
  onboarding_completed: z.boolean().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),

  bank_details: z.object({
    bank_detail_id: z.string(),
    account_name: z.string(),
    account_number: z.string(),
    ifsc_code: z.string(),
    bank_name: z.string(),
    branch_name: z.string(),
    is_verified: z.boolean(),
    vendor_id: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }).optional().nullable(),

  warehouse: z.object({
    warehouse_id: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    contact_person: z.string(),
    contact_phone: z.string(),
    verified_at: z.string().datetime(),
    is_primary: z.boolean(),
    verification_status: z.string(),
    vendor_id: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }).optional().nullable(),
});

export type VendorProfile = z.infer<typeof vendorProfileSchema>;