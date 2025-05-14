import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
}
interface UserStore {
  user: User | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: true,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
    }
  )
);
export default useUserStore;
