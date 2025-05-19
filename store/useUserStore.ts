import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Project } from "./useProjectStore";
interface SocialLinks {
  platform: string;
  url: string;
}
interface User {
  id: string;
  phone: string;
  password: string;
  name: string | null;
  profile_picture: string | File | null;
  university: string | null;
  department: string | null;
  year_of_study: string | null;
  graduation_year: string | null;
  cgpa: number | null;
  student_id: string | null;
  student_id_front: string | null;
  student_id_back: string | null;
  nid_front: string | null;
  nid_back: string | null;
  university_email: string | null;
  date_of_birth: string | null;
  address: string | null;
  bio: string | null;
  skills: string | null;
  interests: string | null;
  social_links: SocialLinks[] | null;
  career_goals: string | null;
  role: string;
  isActivated: boolean;
  isVerified: boolean;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  Project: Project[];
}
interface UserStore {
  user: User | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  getUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  pushUser: () => Promise<void>;
}
const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      user: null,
      isLoading: true,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      clearUser: () => set({ user: null }),
      getUser: async () => {
        try {
          const response = await axios.get(`/api/getuser`);
          console.log(response.data);
          set({ user: response.data });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },
      updateUser: async (userData: Partial<User>) => {
        try {
          const currentUser = get().user;
          if (!currentUser) return;
          const updatedUser = { ...currentUser, ...userData };

          set({ user: updatedUser });
          return Promise.resolve();
        } catch (error) {
          console.error("Error updating user data:", error);
          return Promise.reject(error);
        }
      },
      pushUser: async () => {
        try {
          const currentUser = get().user;
          if (!currentUser) return;
          const updatedUser = { ...currentUser };
          const formData = new FormData();
          for (const key in updatedUser) {
            if (updatedUser[key as keyof User] !== null) {
              if (key === "social_links") {
                formData.append(
                  key,
                  JSON.stringify(updatedUser[key as keyof User])
                );
              } else if (key === "profile_picture") {
                const value = updatedUser[key as keyof User];
                if (value instanceof File) {
                  formData.append(key, value);
                } else if (typeof value === "string") {
                  formData.append(key, value);
                }
              } else {
                formData.append(key, updatedUser[key as keyof User] as string);
              }
            }
          }
          console.log("Form data to be sent:", ...formData.entries());
          const response = await axios.post(
            `/api/user/profile_update`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Response from server:", response.data);
        } catch (error) {
          console.error("Error pushing user data:", error);
        }
      },
    }),
    {
      name: "user-store",
    }
  )
);
export default useUserStore;
