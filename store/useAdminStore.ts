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
  category: { id: string; name: string };
  tags: string;
  trending?: boolean;
  image?: string;
  logo?: string;
  createdAt: string;
  status: string;
  adminId: number | null;
  admin: {
    id: string;
    name: string;
    profile_picture: string;
  };
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
  Project: {
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
  }[] | [];
}

// export interface InvestorProfile {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   profile_picture: string;
//   bio: string;
//   company: string;
//   role: string;
//   experienceYears: string;
//   investmentFocus: string[];
//   minInvestment: number;
//   maxInvestment: number;
//   preferredStages: string[];
//   customSocials: SocialLink[];
//   status: "active" | "inactive" | "pending";
//   createdAt: string;
// }

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
  error: string | null;
  startups: Startup[] | null;
  // investors: InvestorProfile[] | null;
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

  // Startup management
  fetchStartups: () => Promise<void>;
  approveStartup: (id: string) => Promise<void>;
  rejectStartup: (id: string) => Promise<void>;
  deleteStartup: (id: string) => Promise<void>;

  // Investor management
  // fetchInvestors: () => Promise<void>;
  // approveInvestor: (id: string) => Promise<void>;
  // suspendInvestor: (id: string) => Promise<void>;
  // deleteInvestor: (id: string) => Promise<void>;

  // Platform statistics
  fetchStats: () => Promise<void>;

  // Utility functions
  clearError: () => void;
}

const useAdminStore = create<AdminStore>((set, get) => ({
  admin: null,
  loading: false,
  error: null,
  startups: null,
  // investors: null,
  stats: null,
  investments: [],

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

  fetchStartups: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/admin/startups");
      console.log("Fetched startups:", response.data);
      set({ startups: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching startups:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch startups",
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
    set({ loading: true, error: null });
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
      set({ admin: response.data.data, loading: false });
    } catch (error) {
      console.error("Error updating admin profile:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update admin profile",
        loading: false,
      });
    }
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

  // fetchInvestors: async () => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await axios.get("/api/admin/investors");
  //     console.log("Fetched investors:", response.data);
  //     set({ investors: response.data, loading: false });
  //   } catch (error) {
  //     console.error("Error fetching investors:", error);
  //     set({
  //       error:
  //         error instanceof Error ? error.message : "Failed to fetch investors",
  //       loading: false,
  //     });
  //   }
  // },

  approveStartup: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.patch(`/api/admin/startups/${id}/approve`);
      // Refresh startups list
      get().fetchStartups();
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
      get().fetchStartups();
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
      get().fetchStartups();
    } catch (error) {
      console.error("Error deleting startup:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete startup",
        loading: false,
      });
    }
  },

  // approveInvestor: async (id) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await axios.patch(`/api/admin/investors/${id}/approve`);
  //     get().fetchInvestors();
  //   } catch (error) {
  //     console.error("Error approving investor:", error);
  //     set({
  //       error:
  //         error instanceof Error ? error.message : "Failed to approve investor",
  //       loading: false,
  //     });
  //   }
  // },

  // suspendInvestor: async (id) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await axios.patch(`/api/admin/investors/${id}/suspend`);
  //     get().fetchInvestors();
  //   } catch (error) {
  //     console.error("Error suspending investor:", error);
  //     set({
  //       error:
  //         error instanceof Error ? error.message : "Failed to suspend investor",
  //       loading: false,
  //     });
  //   }
  // },

  // deleteInvestor: async (id) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await axios.delete(`/api/admin/investors/${id}`);
  //     get().fetchInvestors();
  //   } catch (error) {
  //     console.error("Error deleting investor:", error);
  //     set({
  //       error:
  //         error instanceof Error ? error.message : "Failed to delete investor",
  //       loading: false,
  //     });
  //   }
  // },

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
