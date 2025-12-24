// Image Detection APIs
export const imageDetectionAPI = {
  analyze: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Replace with your actual API endpoint
    const response = await fetch('/api/detection/image', {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
};

// Video Detection APIs
export const videoDetectionAPI = {
  analyze: async (videoFile: File) => {
    const formData = new FormData();
    formData.append('video', videoFile);
    
    // Replace with your actual API endpoint
    const response = await fetch('/api/detection/video', {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
};

// Text Detection APIs
export const textDetectionAPI = {
  analyze: async (text: string) => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/detection/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    return response.json();
  },
};

// Email Detection APIs
export const emailDetectionAPI = {
  analyze: async (email: string) => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/detection/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },
};

// History APIs
export const historyAPI = {
  getHistory: async () => {
    const response = await fetch('/api/history');
    return response.json();
  },
  
  deleteHistory: async (id: string) => {
    const response = await fetch(`/api/history/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
  
  clearHistory: async () => {
    const response = await fetch('/api/history', {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Community APIs
export const communityAPI = {
  getPosts: async () => {
    const response = await fetch('/api/community/posts');
    return response.json();
  },
  
  createPost: async (data: any) => {
    const response = await fetch('/api/community/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  likePost: async (postId: string) => {
    const response = await fetch(`/api/community/posts/${postId}/like`, {
      method: 'POST',
    });
    return response.json();
  },
};

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
  
  register: async (username: string, email: string, password: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    return response.json();
  },
  
  logout: async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    return response.json();
  },
  
  getCurrentUser: async () => {
    const response = await fetch('/api/auth/me');
    return response.json();
  },
};
