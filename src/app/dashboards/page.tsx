"use client";

import { useSessionData } from "@/hooks/use-session-data";

export default function DashboardPage() {
  const { user, loading } = useSessionData();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-card rounded-lg border shadow">
        <h2 className="text-2xl font-bold mb-4">Welcome to your dashboard</h2>

        {loading ? (
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-opacity-50 border-t-transparent"></div>
            <p>Loading user information...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-medium">{user?.name || "User"}</span>
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-background rounded border">
                <p className="font-medium text-sm text-muted-foreground mb-1">
                  User ID
                </p>
                <p className="font-mono text-sm break-all">{user?.vendor_id}</p>
              </div>
              <div className="p-4 bg-background rounded border">
                <p className="font-medium text-sm text-muted-foreground mb-1">
                  Email
                </p>
                <p>{user?.email || "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
