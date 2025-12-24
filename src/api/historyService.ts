import { apiClient } from './client';

export interface HistoryItem {
  id: string;
  type: 'image' | 'video' | 'text' | 'email';
  result: boolean;
  confidence: number;
  timestamp: string;
}

export const historyService = {
  getHistory: async (): Promise<HistoryItem[]> => {
    return apiClient.get('/history');
  },
  
  deleteHistoryItem: async (id: string): Promise<void> => {
    return apiClient.delete(`/history/${id}`);
  },
  
  clearHistory: async (): Promise<void> => {
    return apiClient.delete('/history');
  },
  
  addHistoryItem: async (item: Omit<HistoryItem, 'id' | 'timestamp'>): Promise<HistoryItem> => {
    return apiClient.post('/history', item);
  },
};
