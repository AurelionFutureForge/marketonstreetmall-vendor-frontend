// types/schema/BannerSchema.ts
import * as z from "zod";

export const bannerFormSchema = z.object({
  app_banner_name: z.string().min(1, "Banner name is required"),
  app_banner_url: z.string().min(1, "Banner URL is required"),
  app_banner_description: z.string().min(1, "Description is required"),
});

export type BannerFormData = z.infer<typeof bannerFormSchema>;