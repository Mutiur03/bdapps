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
  adminId: string;
  description: string;
  budget: string;
  pitch_video: string;
  raised_amount: string;
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
  category: {
    id: string;
    name: string;
  };
}

export interface CommonStore {
  startups: Startup[];
  socialLinks: SocialLink[];
  fetchStartups: () => Promise<void>;
  setStartups: (startups: Startup[]) => void;
  setSocialLinks: (links: SocialLink[]) => void;
}
export const useCommonStore = create<CommonStore>((set) => ({
  startups: [],
  socialLinks: [],
  fetchStartups: async () => {
    try {
      const response = await axios.get("/api/projects");
      console.log("Fetched startups: Starting", response.data);

      set({ startups: response.data });
    } catch (error) {
      console.error("Failed to fetch startups:", error);
    }
  },
  setStartups: (startups) => set({ startups }),
  setSocialLinks: (links) => set({ socialLinks: links }),
}));
