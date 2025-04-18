import { create } from 'zustand';
import axiosInstance from "@/lib/axiosInstance";
import axios from 'axios';

interface StepData {
  [key: number]: {
    data: any;
    isValid: boolean;
  };
}

interface ProductState {
  productId: string | null;
  productData: any;
  activeStep: number;
  stepData: StepData;
  setProblemId: (id: string) => void;
  setProblemData: (data: any) => void;
  setActiveStep: (step: number) => void;
  updateStepData: (step: number, data: any, isValid: boolean) => void;
  submitStepData: (step: number) => Promise<void>;
  resetStore: () => void;
}

const initialState = {
  productId: null,
  productData: null,
  activeStep: 1,
  stepData: {},
};

export const useProductStore = create<ProductState>((set, get) => ({
  ...initialState,

  setProblemId: (id) => set({ productId: id }),
  setProblemData: (data) => set({ productData: data }),
  setActiveStep: (step) => set({ activeStep: step }),

  updateStepData: (step, data, isValid) => set((state) => ({
    stepData: {
      ...state.stepData,
      [step]: {
        data: data,
        isValid: isValid
      }
    }
  })),

  resetStore: () => set(initialState),

  submitStepData: async (step) => {
    const { productId, stepData } = get();
    if (!productId) throw new Error("Product ID not set");

    const dataToSubmit = {
      step,
      data: stepData[step].data
    };

    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/update-basic-details/${productId}`,
        dataToSubmit
      );
      set({ productData: response.data.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message.error)
        } else {
          throw new Error("An unexpected error occured");
        }
      } else {
        throw new Error("An unexpected error occured");
      }
    }
  }
}));