import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";

interface AuthStore {
  authUser: any;
  isSigningUp: boolean;
  isLogingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  signup: (formData: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (formData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
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
  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account create Succesfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    try {
      set({ isLogingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      set({ isLogingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  },
}));
