import { create } from 'zustand';

interface UIState {
  isLoading: boolean;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  };
  modal: {
    visible: boolean;
    title: string;
    content: string;
  };

  setLoading: (loading: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  showModal: (title: string, content: string) => void;
  hideModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  toast: {
    message: '',
    type: 'info',
    visible: false,
  },
  modal: {
    visible: false,
    title: '',
    content: '',
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  showToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    set({
      toast: {
        message,
        type,
        visible: true,
      },
    });
    setTimeout(() => {
      set((state) => ({
        toast: { ...state.toast, visible: false },
      }));
    }, 3000);
  },

  hideToast: () => {
    set((state) => ({
      toast: { ...state.toast, visible: false },
    }));
  },

  showModal: (title: string, content: string) => {
    set({
      modal: {
        visible: true,
        title,
        content,
      },
    });
  },

  hideModal: () => {
    set((state) => ({
      modal: { ...state.modal, visible: false },
    }));
  },
}));
