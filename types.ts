export enum ProjectStatus {
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export type FeatureType = 
  | 'img-to-prompt' 
  | 'img-to-img' 
  | 'text-to-img' 
  | 'text-to-video' 
  | 'ugc-tool' 
  | 'script-gen' 
  | 'auto-content' 
  | 'video-to-img' 
  | 'text-to-speech';

export interface UserSettings {
  apiKey: string;
  theme: 'dark' | 'light';
}

export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  aspectRatio: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  type?: FeatureType;
  status: ProjectStatus;
  prompt?: string;
  resultUrl?: string; // Can be image, video, or audio URL
  resultText?: string; // For scripts or prompts
  createdAt: string;
  thumbnail?: string;
  settings?: {
    ratio?: string;
    quality?: string;
    duration?: string;
    count?: number;
    engine?: string;
  };
  templateId?: string;
  script?: string;
  videoUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface FeatureMeta {
  id: FeatureType;
  name: string;
  description: string;
  icon: any;
  path: string;
  color: string;
}