import axios from "axios";
import { create } from "zustand";

export interface SocialLink {
  id: string;
  title: string;
  url: string;
}

export interface InvestorData {
  // Personal information
  name: string;
  email: string;
  phone: string;
  location: string;
  profile_picture: File | string;
  bio: string;

  // Professional information
  company: string;
  role: string;
  experienceYears: string;

  // Investment preferences
  investmentFocus: string[];
  minInvestment: number;
  maxInvestment: number;
  preferredStages: string[];

  customSocials: SocialLink[];
}

interface InvestorStore {
  // State
  investor: InvestorData | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchInvestor: () => Promise<void>;
  updateInvestor: (data: Partial<InvestorData>) => Promise<void>;
  updateInvestorField: <K extends keyof InvestorData>(
    field: K,
    value: InvestorData[K]
  ) => void;
  addItemToArray: (
    field: "investmentFocus" | "preferredStages",
    value: string
  ) => void;
  removeItemFromArray: (
    field: "investmentFocus" | "preferredStages",
    value: string
  ) => void;
  addSocialLink: (title: string, url: string) => void;
  removeSocialLink: (id: string) => void;
  clearError: () => void;
}

const useInvestorStore = create<InvestorStore>((set, get) => ({
  investor: null, // Start with null, will fetch from API
  loading: false,
  error: null,

  // Fetch investor profile from backend
  fetchInvestor: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/investor/profile_update");
      if (!response.ok) {
        throw new Error("Failed to fetch investor profile");
      }
      const data = await response.json();
      console.log("Fetched investor profile:", data);
      
      set({ investor: data, loading: false });
    } catch (error) {
      console.error("Error fetching investor profile:", error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  // Update investor profile in backend
  updateInvestor: async (data) => {
    set({ loading: true, error: null });
    try {
      const currentInvestor = get().investor;
      if (!currentInvestor) {
        throw new Error("No investor data available");
      }
      console.log("Updating investor profile with data:", data);

      const updatedInvestor = { ...currentInvestor, ...data };

      // Create FormData for file upload
      const formData = new FormData();

      // Add all investor data to FormData
      Object.entries(updatedInvestor).forEach(([key, value]) => {
        // Handle arrays specially
        if (Array.isArray(value)) {
          console.log("Appending array:", key, value);
          
          formData.append(key, JSON.stringify(value));
        }
        // Handle file objects
         if (key === "profile_picture" && value instanceof File) {
          formData.append("profile_picture", value);
        }
        // Handle other fields
        else if (
          value !== null &&
          value !== undefined &&
          typeof value !== "object"
        ) {
          formData.append(key, String(value));
        }
      });

      // Add custom socials as JSON
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
      if (state.investor[field].includes(value)) return state;

      return {
        investor: {
          ...state.investor,
          [field]: [...state.investor[field], value],
        },
      };
    });
  },

  removeItemFromArray: (field, value) => {
    set((state) => {
      if (!state.investor) return state;

      return {
        investor: {
          ...state.investor,
          [field]: state.investor[field].filter((item) => item !== value),
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
