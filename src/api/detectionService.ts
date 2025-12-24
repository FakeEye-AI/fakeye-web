import { apiClient } from './client';

export interface DetectionResult {
  isAI: boolean;
  confidence: number;
  details: string;
}

export interface DetectionResponse {
  success: boolean;
  data?: DetectionResult;
  error?: string;
}

// Image Detection
export const imageDetectionService = {
  analyzeImage: async (imageFile: File): Promise<DetectionResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch('/api/detection/image', {
        method: 'POST',
        body: formData,
      });
      
      return response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze image',
      };
    }
  },
};

// Video Detection
export const videoDetectionService = {
  analyzeVideo: async (videoFile: File): Promise<DetectionResponse> => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      
      const response = await fetch('/api/detection/video', {
        method: 'POST',
        body: formData,
      });
      
      return response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze video',
      };
    }
  },
};

// Text Detection
export const textDetectionService = {
  analyzeText: async (text: string): Promise<DetectionResponse> => {
    return apiClient.post('/detection/text', { text });
  },
};

// Email Detection
export const emailDetectionService = {
  analyzeEmail: async (email: string): Promise<DetectionResponse> => {
    return apiClient.post('/detection/email', { email });
  },
};
