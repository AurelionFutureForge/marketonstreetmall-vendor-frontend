import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OtpStore {
  otpId: string | null;
  setOtpId: (otpId: string) => void;
  clearOtpId: () => void;
}

interface OtpUserDataStore {
  otpData: any | null;
  setOtpData: (otpData: any) => void;
  clearOtpData: () => void;
}

interface OtpRecipientNumberStore {
  otpRecipientNumber: string | null;
  setOtpRecipientNumber: (otpRecipientNumber: string) => void;
  clearOtpRecipientNumber: () => void;
}

export interface UserData {
  user: {
    readonly s_no: number;
    readonly cms_user_id: string;
    name: string;
    readonly email: string;
    password: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    role: string;
  };
  setUser: (user: object) => void;
  deleteUser: () => void;
}

interface AddAppUserFieldValues {
  user: {
    name: string;
    age: string;
    mobile_number: string;
    role: string;
    email:string;
    parent_id: string;
  };
  setUser: (user: object) => void;
  deleteUser: () => void;
}

export const useUserOtpIdStore = create<OtpStore, any>(
  persist(
    (set) => ({
      otpId: null,
      setOtpId: (otpId: string) => set({ otpId }),
      clearOtpId: () => ({ otpId: null }),
    }),
    { name: "otp_id" }
  )
);

export const useUserOtpRecipientNumberStore = create<OtpRecipientNumberStore, any>(
  persist(
    (set) => ({
      otpRecipientNumber: null,
      setOtpRecipientNumber: (otpRecipientNumber: string) => set({ otpRecipientNumber }),
      clearOtpRecipientNumber: () => ({ otpRecipientNumber: null }),
    }),
    { name: "otp_recipient_number" }
  )
);

export const useUserOtpDataStore = create<OtpUserDataStore, any>(
  persist(
    (set) => ({
      otpData: null,
      setOtpData: (otpData: any) => set({ otpData }),
      clearOtpData: () => ({ otpData: null }),
    }),
    { name: "otp_data" }
  )
);



const initialUserData = {
  s_no: 0,
  cms_user_id: "",
  name: "",
  email: "",
  password: "",
  createdAt: "",
  updatedAt: "",
  role: "",
};

export const useUserDataStore = create<UserData, any>(
  persist(
    (set) => ({
      user: { ...initialUserData },
      setUser: (user: object) =>
        set((state) => ({ user: { ...state.user, ...user } })),
      deleteUser: () => set({ user: { ...initialUserData } }),
    }),
    { name: "userData" }
  )
);

const initialAppUserData = {
  name: "",
  age: "",
  mobile_number: "",
  role: "",
  parent_id: "",
  email:""
};

export const useAppUserDataStore = create<AddAppUserFieldValues, any>(
  persist(
    (set) => ({
      user: { ...initialAppUserData },
      setUser: (user: object) =>
        set((state) => ({ user: { ...state.user, ...user } })),
      deleteUser: () => set({ user: { ...initialAppUserData } }),
    }),
    { name: "appUserData" }
  )
);
