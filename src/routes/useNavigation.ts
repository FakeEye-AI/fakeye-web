// Route hooks and utilities
import { useCallback } from 'react';

export type TabType = 'landing' | 'image' | 'video' | 'text' | 'email' | 'extension' | 'history' | 'community' | 'terms';

export const useNavigation = () => {
  const navigateTo = useCallback((tab: TabType) => {
    // This will be integrated with your existing setActiveTab state
    return tab;
  }, []);
  
  return { navigateTo };
};

export const isValidRoute = (tab: any): tab is TabType => {
  const validTabs: TabType[] = [
    'landing',
    'image',
    'video',
    'text',
    'email',
    'extension',
    'history',
    'community',
    'terms',
  ];
  return validTabs.includes(tab);
};
