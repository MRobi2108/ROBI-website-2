import { VideoTemplate, Project, ProjectStatus } from './types';

export const MOCK_TEMPLATES: VideoTemplate[] = [
  {
    id: 't1',
    name: 'Tech Product Launch',
    description: 'Futuristic and clean layout for software or gadget reveals.',
    thumbnail: 'https://picsum.photos/400/225?random=1',
    aspectRatio: '16:9',
    tags: ['Tech', 'Business', 'Clean']
  },
  {
    id: 't2',
    name: 'TikTok Viral Explainer',
    description: 'Fast-paced, vertical format optimized for social media engagement.',
    thumbnail: 'https://picsum.photos/225/400?random=2',
    aspectRatio: '9:16',
    tags: ['Social', 'Vertical', 'Fast']
  },
  {
    id: 't3',
    name: 'Corporate News',
    description: 'Professional news anchor style for company updates.',
    thumbnail: 'https://picsum.photos/400/225?random=3',
    aspectRatio: '16:9',
    tags: ['News', 'Corporate', 'Formal']
  },
  {
    id: 't4',
    name: 'Lifestyle Vlog',
    description: 'Warm filters and slow transitions for travel or food content.',
    thumbnail: 'https://picsum.photos/300/300?random=4',
    aspectRatio: '1:1',
    tags: ['Lifestyle', 'Travel', 'Soft']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Q3 Marketing Strategy',
    status: ProjectStatus.COMPLETED,
    templateId: 't3',
    script: 'Welcome to the Q3 marketing update. We are seeing 20% growth...',
    thumbnail: 'https://picsum.photos/400/225?random=10',
    createdAt: '2023-10-24T10:00:00Z',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4'
  },
  {
    id: 'p2',
    title: 'Product Demo: SmartWatch',
    status: ProjectStatus.PROCESSING,
    templateId: 't1',
    script: 'Introducing the new SmartWatch X. Sleek design, infinite battery...',
    thumbnail: 'https://picsum.photos/400/225?random=11',
    createdAt: '2023-10-25T14:30:00Z'
  },
  {
    id: 'p3',
    title: 'Daily Vlog #45',
    status: ProjectStatus.DRAFT,
    templateId: 't2',
    script: '',
    thumbnail: 'https://picsum.photos/225/400?random=12',
    createdAt: '2023-10-26T09:15:00Z'
  }
];