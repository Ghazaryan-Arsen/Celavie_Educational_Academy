export type CourseCategory = 'language' | 'smm';

export interface BaseCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  features: string[];
  schedule: string[];
  faq: { question: string; answer: string }[];
}

export interface LanguageCourse extends BaseCourse {
  category: 'language';
  language: string;
  flagEmoji: string;
  cefrLevels: string[];
  whatYouWillLearn: string[];
  learningPath: { step: number; title: string; description: string }[];
  niceExchangeAddon: boolean;
}

export interface SMMCourse extends BaseCourse {
  category: 'smm';
  tier: 'starter' | 'pro' | 'expert';
  whatYouWillMaster: string[];
  curriculum: { module: string; topics: string[] }[];
  realWorldProjects: string[];
  careerOutcomes: string[];
}

export type Course = LanguageCourse | SMMCourse;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  courseName: string;
  comment: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'language' | 'smm' | 'nice-exchange' | 'registration';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
}
