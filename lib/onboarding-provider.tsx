import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  height: number;
  weight: number;
  bodyType: 'slim' | 'regular' | 'oversize';
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  onboardingCompleted: boolean;
}

interface OnboardingContextType {
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = '@neuroshop_profile';

const defaultProfile: UserProfile = {
  height: 170,
  weight: 70,
  bodyType: 'regular',
  openness: 50,
  conscientiousness: 50,
  extraversion: 50,
  agreeableness: 50,
  neuroticism: 50,
  onboardingCompleted: false,
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setProfile(defaultProfile);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    const updated = { ...profile, ...data } as UserProfile;
    setProfile(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const completeOnboarding = async () => {
    await updateProfile({ onboardingCompleted: true });
  };

  const resetOnboarding = async () => {
    const reset = { ...defaultProfile };
    setProfile(reset);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
    } catch (error) {
      console.error('Failed to reset profile:', error);
    }
  };

  return (
    <OnboardingContext.Provider value={{ profile, updateProfile, completeOnboarding, resetOnboarding, loading }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
