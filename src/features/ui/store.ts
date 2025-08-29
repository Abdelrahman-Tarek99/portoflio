import { create } from "zustand";

type Theme = "light" | "dark" | "system";

type UIState = {
  theme: Theme;
  isMobileMenuOpen: boolean;
  modals: Record<string, boolean>;
  setTheme: (t: Theme) => void;
  toggleMobileMenu: (open?: boolean) => void;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  theme: "system",
  isMobileMenuOpen: false,
  modals: {},
  setTheme: (t) => set({ theme: t }),
  toggleMobileMenu: (open) =>
    set((s) => ({ isMobileMenuOpen: open ?? !s.isMobileMenuOpen })),
  openModal: (key) => set((s) => ({ modals: { ...s.modals, [key]: true } })),
  closeModal: (key) => set((s) => ({ modals: { ...s.modals, [key]: false } })),
}));
