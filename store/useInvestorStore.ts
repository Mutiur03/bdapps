import axios from "axios";
import { create } from "zustand";

export interface SocialLink {
  id: string;
  title: string;
  url: string;
}
interface Investment {
  id: number;
  amount: string;
  createdAt: string;
}
export interface InvestorData {
  name: string;
  email: string;
  phone: string;
  location: string;
  profile_picture: File | string;
  bio: string;

  company: string;
  role: string;
  experienceYears: string;

  investmentFocus: string[];
  minInvestment: number;
  maxInvestment: number;
  preferredStages: string[];

  customSocials: SocialLink[];
}

interface InvestorStore {
  investor: InvestorData | null;
  error: string | null;
  isSubmitting: boolean;
  investments: Investment[] | null;
  loading: boolean;
  fetchInvestor: () => Promise<void>;
  fetchInvestments: () => Promise<void>;
  submitInvestment: (amount: string) => Promise<void>;
  updateInvestor: (data: Partial<InvestorData>) => Promise<void>;
  updateInvestorField: <K extends keyof InvestorData>(
    field: K,
    value: InvestorData[K]
  ) => void;
  addItemToArray: <K extends keyof InvestorData>(
    field: K,
    item: InvestorData[K] extends (infer U)[] ? U : never
  ) => void;
  removeItemFromArray: <K extends keyof InvestorData>(
    field: K,
    item: InvestorData[K] extends (infer U)[] ? U : never
  ) => void;
  addSocialLink: (title: string, url: string) => void;
  removeSocialLink: (id: string) => void;
}

const useInvestorStore = create<InvestorStore>((set, get) => ({
  investor: null,
  error: null,
  isSubmitting: false,
  loading: true,
  investments: null,
  fetchInvestor: async () => {
    try {
      const response = await fetch("/api/investor/profile_update");
      if (!response.ok) {
        throw new Error("Failed to fetch investor profile");
      }
      const data = await response.json();
      console.log("Fetched investor profile:", data);

      set({ investor: data });
    } catch (error) {
      console.error("Error fetching investor profile:", error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },
  fetchInvestments: async () => {
    try {
      const response = await axios.get("/api/investor/investment");
      console.log("Fetched investments:", response.data);
      set({ investments: response.data || [] });
    } catch (error) {
      console.error("Error fetching investments:", error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
    set({ loading: false });
  },
  submitInvestment: async (amount: string) => {
    set({ isSubmitting: true, error: null });
    try {
      const currentInvestor = get().investor;
      if (!currentInvestor) {
        throw new Error("No investor data available");
      }
      console.log("Submitting investment of amount:", amount);

      const response = await axios.post("/api/investor/investment", {
        amount,
      });
      if (!response.data) {
        throw new Error("Failed to submit investment");
      }
      set({
        investments: [...(get().investments || []), response.data],
      });
      set({ loading: false });
    } catch (error) {
      console.error("Error submitting investment:", error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
    set({ isSubmitting: false });
  },
  updateInvestor: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      const currentInvestor = get().investor;
      if (!currentInvestor) {
        throw new Error("No investor data available");
      }
      console.log("Updating investor profile with data:", data);
      const updatedInvestor = { ...currentInvestor, ...data };
      const formData = new FormData();
      Object.entries(updatedInvestor).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          console.log("Appending array:", key, value);
          formData.append(key, JSON.stringify(value));
        }
        if (key === "profile_picture" && value instanceof File) {
          formData.append("profile_picture", value);
        } else if (
          value !== null &&
          value !== undefined &&
          typeof value !== "object"
        ) {
          formData.append(key, String(value));
        }
      });

      formData.append(
        "customSocials",
        JSON.stringify(updatedInvestor.customSocials)
      );
      console.log("FormData for update:", ...formData.entries());

      const response = await axios.put(
        "/api/investor/profile_update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response) {
        throw new Error("Failed to update investor profile");
      }
      const confirmedData = response.data;
      set({ investor: confirmedData, loading: false });
    } catch (error) {
      console.error("Error updating investor profile:", error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
    set({ isSubmitting: false });
  },

  updateInvestorField: (field, value) => {
    set((state) => {
      if (!state.investor) return state;
      console.log("Updating field:", field, "with value:", value);

      return {
        investor: {
          ...state.investor,
          [field]: value,
        },
      };
    });
  },

  addItemToArray: (field, value) => {
    set((state) => {
      if (!state.investor) return state;
      const fieldValue = state.investor[field];
      if (!Array.isArray(fieldValue)) return state;
      if ((fieldValue as any[]).includes(value)) return state;

      return {
        investor: {
          ...state.investor,
          [field]: [...fieldValue, value] as InvestorData[typeof field],
        },
      };
    });
  },

  removeItemFromArray: (field, value) => {
    set((state) => {
      if (!state.investor) return state;
      const fieldValue = state.investor[field];
      if (!Array.isArray(fieldValue)) return state;

      return {
        investor: {
          ...state.investor,
          [field]: fieldValue.filter(
            (item: any) => item !== value
          ) as InvestorData[typeof field],
        },
      };
    });
  },

  addSocialLink: (title, url) => {
    set((state) => {
      if (!state.investor) return state;

      const newLink: SocialLink = {
        id: Date.now().toString(),
        title: title.trim(),
        url: url.trim(),
      };

      return {
        investor: {
          ...state.investor,
          customSocials: [...state.investor.customSocials, newLink],
        },
      };
    });
  },

  removeSocialLink: (id) => {
    set((state) => {
      if (!state.investor) return state;

      return {
        investor: {
          ...state.investor,
          customSocials: state.investor.customSocials.filter(
            (social) => social.id !== id
          ),
        },
      };
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useInvestorStore;
