
import { Image, Video, FileText, Mail, Chrome, Clock, Users } from 'lucide-react';

export type TabType = 'landing' | 'image' | 'video' | 'text' | 'email' | 'extension' | 'history' | 'community';

export interface Route {
  id: TabType;
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

export const routes: Route[] = [
  {
    id: 'landing',
    path: '/',
    label: 'Home',
    icon: () => null,
    component: () => null,
  },
  {
    id: 'image',
    path: '/image-detection',
    label: 'Image Detection',
    icon: Image,
    component: () => null,
  },
  {
    id: 'video',
    path: '/video-detection',
    label: 'Video Detection',
    icon: Video,
    component: () => null,
  },
  {
    id: 'text',
    path: '/text-detection',
    label: 'Text Detection',
    icon: FileText,
    component: () => null,
  },
  {
    id: 'email',
    path: '/email-detection',
    label: 'Email Detection',
    icon: Mail,
    component: () => null,
  },
  {
    id: 'extension',
    path: '/extension',
    label: 'Chrome Extension',
    icon: Chrome,
    component: () => null,
  },
  {
    id: 'history',
    path: '/history',
    label: 'History',
    icon: Clock,
    component: () => null,
  },
  {
    id: 'community',
    path: '/community',
    label: 'Community',
    icon: Users,
    component: () => null,
  },
];

export const getRouteByTab = (tab: TabType): Route | undefined => {
  return routes.find(route => route.id === tab);
};

export const getRouteByPath = (path: string): Route | undefined => {
  return routes.find(route => route.path === path);
};
