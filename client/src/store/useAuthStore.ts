import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

interface AuthStore {
  authUser: any;
  isSigningUp: boolean;
  isLogingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set: any) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ authUser: null });
    }
  },
}));
