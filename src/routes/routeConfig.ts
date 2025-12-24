
import { Image, Video, FileText, Mail, Chrome, Clock, Users, FileText as TermsIcon } from 'lucide-react';
import { LandingPage } from '../components/LandingPage';
import { ImageDetector } from '../components/ImageDetector';
import { VideoDetector } from '../components/VideoDetector';
import { TextDetector } from '../components/TextDetector';
import { EmailDetector } from '../components/EmailDetector';
import { ChromeExtension } from '../components/ChromeExtension';
import { History } from '../components/History';
import { Community } from '../components/Community';
import { Auth } from '../components/Auth';
import { TermsOfService } from '../components/TermsOfService';

export type TabType = 'landing' | 'image' | 'video' | 'text' | 'email' | 'extension' | 'history' | 'community' | 'terms';

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
    component: LandingPage,
  },
  {
    id: 'image',
    path: '/image-detection',
    label: 'Image Detection',
    icon: Image,
    component: ImageDetector,
  },
  {
    id: 'video',
    path: '/video-detection',
    label: 'Video Detection',
    icon: Video,
    component: VideoDetector,
  },
  {
    id: 'text',
    path: '/text-detection',
    label: 'Text Detection',
    icon: FileText,
    component: TextDetector,
  },
  {
    id: 'email',
    path: '/email-detection',
    label: 'Email Detection',
    icon: Mail,
    component: EmailDetector,
  },
  {
    id: 'extension',
    path: '/extension',
    label: 'Chrome Extension',
    icon: Chrome,
    component: ChromeExtension,
  },
  {
    id: 'history',
    path: '/history',
    label: 'History',
    icon: Clock,
    component: History,
  },
  {
    id: 'community',
    path: '/community',
    label: 'Community',
    icon: Users,
    component: Community,
  },
  {
    id: 'terms',
    path: '/terms-of-service',
    label: 'Terms of Service',
    icon: TermsIcon,
    component: TermsOfService,
  },
];

export const getRouteByTab = (tab: TabType): Route | undefined => {
  return routes.find(route => route.id === tab);
};

export const getRouteByPath = (path: string): Route | undefined => {
  return routes.find(route => route.path === path);
};
