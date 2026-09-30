export type ExperienceType =
  | 'hackathon'
  | 'internship'
  | 'workshop'
  | 'seminar'
  | 'college_event'
  | 'project'
  | 'competition'
  | 'certification'
  | 'volunteering'
  | 'conference'
  | 'achievement';

export type ToneType =
  | 'authentic_storyteller'
  | 'high_energy_achiever'
  | 'educational_takeaways'
  | 'humble_reflective'
  | 'crisp_minimalist'
  | 'casual_relatable';

export type ConceptAngle =
  | 'balanced'
  | 'technical_deep_dive'
  | 'leadership_collaboration'
  | 'failure_to_breakthrough'
  | 'peer_learnings'
  | 'career_milestone'
  | 'custom';

export interface ExperienceFormState {
  experienceType: ExperienceType;
  title: string;
  rawExperience: string;
  role: string;
  organization: string;
  keyMetrics: string;
  keyLearnings: string;
  mentorsOrTeam: string;
  tone: ToneType;
  conceptAngle: ConceptAngle;
  customPrompt: string;
  authorName: string;
  authorTitle: string;
}

export interface LinkedInPost {
  hook: string;
  content: string;
  takeaways: string[];
  hashtags: string[];
  suggestedMediaPrompt: string;
  estimatedReadTime: string;
}

export interface TwitterPost {
  singleTweet: string;
  thread: string[];
  hashtags: string[];
}

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  visualNote: string;
}

export interface InstagramPost {
  caption: string;
  carouselSlides: CarouselSlide[];
  hashtags: string[];
  visualStyleSuggestion: string;
}

export interface ThreadsPost {
  content: string;
  conversationalPrompt: string;
}

export interface StarMethod {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface PortfolioPost {
  title: string;
  starMethod: StarMethod;
  oneParagraphSummary: string;
  bulletPoints: string[];
  tags: string[];
}

export interface GeneratedAnalysis {
  coreTheme: string;
  keyLessons: string[];
  detectedImpact: string[];
  antiCringeFeedback: string;
}

export interface GeneratedPostsData {
  analysis: GeneratedAnalysis;
  posts: {
    linkedin: LinkedInPost;
    twitter: TwitterPost;
    instagram: InstagramPost;
    threads: ThreadsPost;
    portfolio: PortfolioPost;
  };
}

export interface SavedHistoryItem {
  id: string;
  timestamp: number;
  input: ExperienceFormState;
  output: GeneratedPostsData;
}

export interface HookSuggestion {
  type: 'story' | 'question' | 'contrarian' | 'metric_first' | 'vulnerable';
  text: string;
}
