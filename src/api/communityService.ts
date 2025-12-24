import { apiClient } from './client';

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
  image?: string;
}

export const communityService = {
  getPosts: async (): Promise<CommunityPost[]> => {
    return apiClient.get('/community/posts');
  },
  
  createPost: async (data: { content: string; image?: File }): Promise<CommunityPost> => {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.image) {
      formData.append('image', data.image);
    }
    
    const response = await fetch('/api/community/posts', {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },
  
  likePost: async (postId: string): Promise<void> => {
    return apiClient.post(`/community/posts/${postId}/like`);
  },
  
  deletePost: async (postId: string): Promise<void> => {
    return apiClient.delete(`/community/posts/${postId}`);
  },
};
