export type Role = 'consultant' | 'student';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar?: string;
  grade?: string; // e.g., '12th Grade'
  major?: string; // e.g., 'Experimental Science'
}

export interface StudentStats {
  totalStudyHours: number;
  totalTests: number;
  averageExamScore: number;
  planProgress: number;
}

export interface PlanItem {
  id: string;
  day: string;
  subject: string;
  topic: string;
  duration: number; // in minutes
  isDone: boolean;
  type: 'study' | 'test' | 'review';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface EducationalContent {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'article';
  subject: string;
  description: string;
}