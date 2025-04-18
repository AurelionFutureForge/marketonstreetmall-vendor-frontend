import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface AppBanner {
  app_banner_id: string;
  app_banner_name: string;
  app_banner_url: string;
  app_banner_description: string;
  is_public: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

interface BannerCardProps {
  banner: AppBanner;
}

export function BannerCard({ banner }: BannerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9] w-full bg-gray-100 dark:bg-gray-900">
        <Image
          width={500}
          height={500}
          src={banner.app_banner_url}
          alt={banner.app_banner_name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">
            {banner.app_banner_name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            banner.is_public
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
          }`}>
            {banner.is_public ? "Public" : "Private"}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {banner.app_banner_description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <span className="font-medium">Priority:</span> {banner.priority + 1}
          </span>
          <span>
            Updated {formatDistanceToNow(new Date(banner.updated_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}