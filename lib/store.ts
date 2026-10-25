import { create } from "zustand";

interface AppState {
  isUsernameModalOpen: boolean;
  openUsernameModal: () => void;
  closeUsernameModal: () => void;

  isSupportModalOpen: boolean;
  openSupportModal: () => void;
  closeSupportModal: () => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isUsernameModalOpen: false,
  openUsernameModal: () => set({ isUsernameModalOpen: true }),
  closeUsernameModal: () => set({ isUsernameModalOpen: false }),

  isSupportModalOpen: false,
  openSupportModal: () => set({ isSupportModalOpen: true }),
  closeSupportModal: () => set({ isSupportModalOpen: false }),

  toastMessage: null,
  showToast: (msg: string) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3000);
  },
  clearToast: () => set({ toastMessage: null }),
}));
