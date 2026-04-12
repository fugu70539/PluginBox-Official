import { create } from 'zustand';
import { UserData, PlanType } from '@/types';

interface AppState {
  user: UserData | null;
  setUser: (user: UserData) => void;
  updatePlan: (plan: PlanType) => void;
  togglePlugin: (pluginId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: '1',
    username: 'User',
    plan: 'Free',
    activePlugins: [],
  },
  setUser: (user) => set({ user }),
  updatePlan: (plan) => set((state) => ({
    user: state.user ? { ...state.user, plan } : null
  })),
  togglePlugin: (pluginId) => set((state) => {
    if (!state.user) return state;
    const isFiltered = state.user.activePlugins.includes(pluginId);
    return {
      user: {
        ...state.user,
        activePlugins: isFiltered
          ? state.user.activePlugins.filter(id => id !== pluginId)
          : [...state.user.activePlugins, pluginId]
      }
    };
  }),
}));
