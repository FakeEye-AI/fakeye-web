import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { HistoryItemType } from './HistoryContext';

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  type: HistoryItemType;
  timestamp: number;
  isAIGenerated: boolean;
  confidence: number;
  preview?: string;
  description?: string;
  likes: string[]; // Array of user IDs who liked
  comments: {
    id: string;
    userId: string;
    username: string;
    userAvatar?: string;
    content: string;
    timestamp: number;
  }[];
  metadata?: {
    fileName?: string;
    subject?: string;
    sender?: string;
    textLength?: number;
    phishingRisk?: string;
  };
}

interface CommunityContextType {
  posts: CommunityPost[];
  addPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'userId' | 'username' | 'userAvatar' | 'likes' | 'comments'>) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const stored = localStorage.getItem('ai-detector-community');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ai-detector-community', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<CommunityPost, 'id' | 'timestamp' | 'userId' | 'username' | 'userAvatar' | 'likes' | 'comments'>) => {
    if (!user) return;

    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      timestamp: Date.now(),
      likes: [],
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    if (!user) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const likes = post.likes.includes(user.id)
            ? post.likes.filter((id) => id !== user.id)
            : [...post.likes, user.id];
          return { ...post, likes };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!user) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            userId: user.id,
            username: user.username,
            userAvatar: user.avatar,
            content,
            timestamp: Date.now(),
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <CommunityContext.Provider
      value={{
        posts,
        addPost,
        likePost,
        addComment,
        deletePost,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within CommunityProvider');
  }
  return context;
}
