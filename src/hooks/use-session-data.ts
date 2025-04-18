"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type SessionUser = {
  vendor_id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  access_token?: string;
  refresh_token?: string;
};

type SessionData = {
  authenticated: boolean;
  user: SessionUser | null;
  loading: boolean;
};

export function useSessionData(): SessionData {
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState<SessionData>({
    authenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated" && session?.user) {
      setSessionData({
        authenticated: true,
        user: {
          vendor_id: session.user.vendor_id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
          access_token: session.user.access_token,
          refresh_token: session.user.refresh_token,
        },
        loading: false,
      });
    } else {
      setSessionData({
        authenticated: false,
        user: null,
        loading: false,
      });
    }
  }, [session, status]);

  return sessionData;
}
