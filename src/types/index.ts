export type PlanType = 'Free' | 'Plus' | 'Pro';

export interface PlanLimits {
  maxActivePlugins: number;
  maxDevelopPlugins: number;
  label: string;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive';
}

export interface UserData {
  id: string;
  username: string;
  firstName?: string;
  photoUrl?: string; // ДОБАВЬ ЭТУ СТРОЧКУ
  plan: PlanType;
  activePlugins: string[];
}

export const SUBSCRIPTION_PLANS: Record<PlanType, PlanLimits> = {
  Free: {
    maxActivePlugins: 7,
    maxDevelopPlugins: 3,
    label: 'Free'
  },
  Plus: {
    maxActivePlugins: 17,
    maxDevelopPlugins: 7,
    label: 'Plus'
  },
  Pro: {
    maxActivePlugins: 27,
    maxDevelopPlugins: 100,
    label: 'Pro'
  }
};
