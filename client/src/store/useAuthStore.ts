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
  updateProfile: (formData: { profilePic: string }) => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set: any) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true }); //  Set loading state to show app is checking auth
    try {
      const res = await axiosInstance.get("/auth/check"); //  Send request to backend to verify if user is still authenticated
      //  If response contains user data (authenticated)
      if (res.data) {
        set({ authUser: res.data, isCheckingAuth: false }); //  Save user data in Zustand store
        localStorage.setItem("authUser", JSON.stringify(res.data)); //  Save user data in localStorage so it persists after refresh
      } else {
        set({ authUser: null, isCheckingAuth: false }); //  If no user returned, treat as not authenticated
        localStorage.removeItem("authUser"); //  Remove any old user data from localStorage
      }
    } catch (error) {
      console.log("Error in checkAuth:", error); //  If something goes wrong (e.g., request fails), log it
      set({ authUser: null, isCheckingAuth: false });
      localStorage.removeItem("authUser"); //  Reset auth state in Zustand and remove localStorage data
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
    set({ isLogingIn: true });
    try {
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
  updateProfile: async (data: { profilePic: string }) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.patch("/auth/user/profile", {
        profilePic: data.profilePic,
      });

      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      if (error.response?.status === 413) {
        toast.error("Image is too large. Please upload an image under 1MB.");
      } else {
        toast.error(error.response?.data?.error || "Failed to update profile");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
