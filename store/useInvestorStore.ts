import axios from "axios";
import { create } from "zustand";

export interface SocialLink {
  id: string;
  title: string;
  url: string;
}
export interface Startup {
  id: string;
  title: string;
  profile_picture: string;
  cover_image: string;
  university: string;
  description: string;
  budget: string;
  pitch_video: string;
  raised_amount: string;
  category: string;
  tags: string;
  trending?: boolean;
  image?: string;
  logo?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    department: string;
    university: string;
    university_email: string;
    profile_picture: string;
  };
  projectMembers: {
    id: string;
    user: {
      id: string;
      name: string;
      university: string;
      university_email: string;
      profile_picture: string;
    };
  }[];
  milestones: {
    id: string;
    title: string;
    description: string;
    status: string;
    amount: number;
    raised_amount: number;
    deadlineAt: string;
    createdAt: string;
    updatedAt: string;
    projectId: string;
    completedAt: string;
    plannedAt: string;
    progress: number;
  }[];
  documents: {
    id: string;
    projectId: string;
    document: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  }[];
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
  loading: boolean;
  error: string | null;
  startups: Startup[] | null;

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
  fetchStartups: () => Promise<void>;
}

const useInvestorStore = create<InvestorStore>((set, get) => ({
  investor: null,
  loading: false,
  error: null,
  startups: null,
  fetchStartups: async () => {
    try {
      const response = await axios.get("/api/projects");
      console.log("Fetched projects:", response.data);
      set({ startups: response.data });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },

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

  updateInvestor: async (data) => {
    set({ loading: true, error: null });
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
