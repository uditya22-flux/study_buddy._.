import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  avatarEmoji: string;
  theme: "light" | "dark";
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface AppState {
  user: User | null;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  viewMode: "grid" | "list";
  activeFolderId: string | null;
  expandedFolders: string[];
  chatOpen: boolean;
  chatMessages: ChatMessage[];
  searchQuery: string;

  setUser: (user: User | null) => void;
  setTheme: (theme: "light" | "dark") => void;
  setSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setActiveFolderId: (id: string | null) => void;
  toggleFolder: (id: string) => void;
  toggleChat: () => void;
  addChatMessage: (msg: ChatMessage) => void;
  updateLastStreamingMessage: (content: string) => void;
  setSearch: (q: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      theme: "light",
      sidebarOpen: true,
      viewMode: "grid",
      activeFolderId: null,
      expandedFolders: [],
      chatOpen: false,
      chatMessages: [],
      searchQuery: "",

      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setViewMode: (viewMode) => set({ viewMode }),
      setActiveFolderId: (activeFolderId) => set({ activeFolderId }),
      toggleFolder: (id) => set((state) => {
        const next = state.expandedFolders.includes(id) 
          ? state.expandedFolders.filter(f => f !== id)
          : [...state.expandedFolders, id];
        return { expandedFolders: next };
      }),
      toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen })),
      addChatMessage: (msg) => set((state) => ({ 
        chatMessages: [...state.chatMessages, msg] 
      })),
      updateLastStreamingMessage: (content) => set((state) => {
        const messages = [...state.chatMessages];
        const last = messages[messages.length - 1];
        if (last && last.isStreaming) {
          last.content += content;
        }
        return { chatMessages: messages };
      }),
      setSearch: (searchQuery) => set({ searchQuery }),
      logout: () => set({ user: null, chatMessages: [] }),
    }),
    {
      name: "study-buddy-storage",
      partialize: (state) => ({ 
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        viewMode: state.viewMode,
      }),
    }
  )
);
