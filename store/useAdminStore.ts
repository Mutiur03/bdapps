import axios from "axios";
import { create } from "zustand";
import { useCommonStore } from "./useCommonStore";
const { fetchStartups } = useCommonStore.getState();
export interface SocialLink {
  id: string;
  title: string;
  url: string;
}

export interface AdminData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  role: string;
  companyRole: string;
  permissions: string[];
  profile_picture: File | string;
  company: string;
  experienceYears: string;
  customSocials: SocialLink[];
  createdAt: string;
  released_amount?: number;
  lastLogin: string;
  Project:
    | {
        id: string;
        title: string;
        profile_picture: string;
        cover_image: string;
        university: string;
        description: string;
        budget: string;
        pitch_video: string;
        raised_amount: string;
        category: { id: string; name: string };
        tags: string;
        status: string;
      }[]
    | [];
}

export interface PlatformStats {
  totalStartups: number;
  totalInvestors: number;
  totalFunding: number;
  pendingApprovals: number;
  activeProjects: number;
}

interface AdminStore {
  admin: AdminData | null;
  loading: boolean;
  investments: {
    id: string;
    amount: number;
    startupId: string;
    startupTitle: string;
    investorId: string;
    investorName: string;
    createdAt: string;
  }[];
  isSubmitting: boolean;
  error: string | null;
  stats: PlatformStats | null;
  fetchInvestments: () => Promise<void>;
  fetchAdmin: () => Promise<void>;
  updateAdmin: (data: Partial<AdminData>) => Promise<void>;
  updateAdminField: <K extends keyof AdminData>(
    field: K,
    value: AdminData[K]
  ) => void;
  addSocialLink: (title: string, url: string) => void;
  removeSocialLink: (id: string) => void;

  approveStartup: (id: string) => Promise<void>;
  rejectStartup: (id: string) => Promise<void>;
  deleteStartup: (id: string) => Promise<void>;

  fetchStats: () => Promise<void>;

  clearError: () => void;
}

const useAdminStore = create<AdminStore>((set, get) => ({
  admin: null,
  loading: true,
  error: null,
  stats: null,
  investments: [],
  isSubmitting: false,
  fetchInvestments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/admin/investments");
      console.log("Fetched investments:", response.data);
      set({ investments: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching investments:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch investments",
        loading: false,
      });
    }
  },

  fetchAdmin: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/admin/profile-update");
      console.log("Fetched admin profile:", response.data);
      const adminData = {
        ...response.data.data,
        customSocials: response.data.data.customSocials || [],
      };
      set({ admin: adminData, loading: false });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch admin profile",
        loading: false,
      });
    }
  },

  updateAdmin: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      const currentAdmin = get().admin;
      if (!currentAdmin) {
        throw new Error("No admin data available");
      }
      const updatedAdmin = { ...currentAdmin, ...data };
      const formData = new FormData();
      Object.entries(updatedAdmin).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (key === "profile_picture" && value instanceof File) {
          formData.append("profile_picture", value);
        } else if (
          value !== null &&
          value !== undefined &&
          typeof value !== "object"
        ) {
          formData.append(key, String(value));
        }
      });

      const response = await axios.put("/api/admin/profile-update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ admin: response.data.data });
    } catch (error) {
      console.error("Error updating admin profile:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update admin profile",
      });
    }
    set({ isSubmitting: false });
  },

  updateAdminField: (field, value) => {
    set((state) => {
      if (!state.admin) return state;
      return {
        admin: {
          ...state.admin,
          [field]: value,
        },
      };
    });
  },

  addSocialLink: (title, url) => {
    set((state) => {
      if (!state.admin) return state;

      const newLink: SocialLink = {
        id: Date.now().toString(),
        title: title.trim(),
        url: url.trim(),
      };

      return {
        admin: {
          ...state.admin,
          customSocials: [...(state.admin.customSocials || []), newLink],
        },
      };
    });
  },

  removeSocialLink: (id) => {
    set((state) => {
      if (!state.admin) return state;

      return {
        admin: {
          ...state.admin,
          customSocials: (state.admin.customSocials || []).filter(
            (social) => social.id !== id
          ),
        },
      };
    });
  },

  approveStartup: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.patch(`/api/admin/startups/${id}/approve`);

      fetchStartups();
    } catch (error) {
      console.error("Error approving startup:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to approve startup",
        loading: false,
      });
    }
  },

  rejectStartup: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.patch(`/api/admin/startups/${id}/reject`);
      fetchStartups();
    } catch (error) {
      console.error("Error rejecting startup:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to reject startup",
        loading: false,
      });
    }
  },

  deleteStartup: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/admin/startups/${id}`);
      fetchStartups();
    } catch (error) {
      console.error("Error deleting startup:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete startup",
        loading: false,
      });
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/admin/stats");
      console.log("Fetched platform stats:", response.data);
      set({ stats: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching stats:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to fetch stats",
        loading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAdminStore;
