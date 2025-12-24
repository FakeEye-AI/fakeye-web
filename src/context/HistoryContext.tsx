import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type HistoryItemType = 'image' | 'video' | 'text' | 'email';

export interface HistoryItem {
  id: string;
  type: HistoryItemType;
  timestamp: number;
  isAIGenerated: boolean;
  confidence: number;
  preview?: string;
  metadata?: {
    fileName?: string;
    subject?: string;
    sender?: string;
    textLength?: number;
    phishingRisk?: string;
  };
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  deleteItem: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('ai-detector-history');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('ai-detector-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory, deleteItem }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within HistoryProvider');
  }
  return context;
}
