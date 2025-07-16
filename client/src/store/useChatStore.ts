import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

// Define the shape of a user
export type SelectedUser = {
  _id: string;
  fullName: string;
  profilePic: string;
};

type Message = {
  _id: string;
  text: string;
  senderId: SelectedUser;
  recieverId: SelectedUser;
  image?: string;
  createdAt?: string;
};

// Zustand store interface
interface ChatProps {
  messages: Message[];
  users: SelectedUser[] | null;
  selectedUsers: SelectedUser | null;
  onlineUsers: string[];
  isUserLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUsers: SelectedUser | null) => void;
  sendMessage: (messageData: any) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

// Zustand store definition
export const useChatStore = create<ChatProps>((set, get) => ({
  messages: [],
  users: [],
  selectedUsers: null,
  isUserLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData: any) => {
    const { selectedUsers, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUsers?._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch messages");
    }
  },
  subscribeToMessages: () => {
    const { selectedUsers } = get(); // Get the currently selected user from the chat store
    if (!selectedUsers) return; // Do nothing if no user is selected

    const socket = useAuthStore.getState().socket; // Access the socket instance from the auth store

    // Set up a listener for the "newMessage" event from the server
    socket?.on("newMessage", (newMessage) => {
      // Append the new message to the existing messages array
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket; // Get the socket from the auth store

    // Remove the "newMessage" listener to avoid memory leaks or duplicate events
    socket?.off("newMessage");
  },
  setSelectedUser: (selectedUsers: SelectedUser | null) =>
    set({ selectedUsers }),
}));
