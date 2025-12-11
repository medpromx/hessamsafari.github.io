import { User, PlanItem, Message, EducationalContent, StudentStats } from './types';

export const CURRENT_CONSULTANT: User = {
  id: 'c1',
  name: 'مهندس حسام',
  role: 'consultant',
  email: 'hessam@konkur.ir',
  avatar: 'https://picsum.photos/200/200?random=1'
};

export const MOCK_STUDENTS: (User & { stats: StudentStats })[] = [
  {
    id: 's1',
    name: 'علی رضایی',
    role: 'student',
    email: 'ali@example.com',
    grade: 'دوازدهم',
    major: 'تجربی',
    avatar: 'https://picsum.photos/200/200?random=2',
    stats: { totalStudyHours: 45, totalTests: 320, averageExamScore: 78, planProgress: 85 }
  },
  {
    id: 's2',
    name: 'سارا محمدی',
    role: 'student',
    email: 'sara@example.com',
    grade: 'دوازدهم',
    major: 'ریاضی',
    avatar: 'https://picsum.photos/200/200?random=3',
    stats: { totalStudyHours: 38, totalTests: 250, averageExamScore: 65, planProgress: 60 }
  },
  {
    id: 's3',
    name: 'پویا کریمی',
    role: 'student',
    email: 'pouya@example.com',
    grade: 'یازدهم',
    major: 'تجربی',
    avatar: 'https://picsum.photos/200/200?random=4',
    stats: { totalStudyHours: 20, totalTests: 100, averageExamScore: 55, planProgress: 40 }
  }
];

export const MOCK_PLAN: PlanItem[] = [
  { id: '1', day: 'شنبه', subject: 'زیست‌شناسی', topic: 'فصل ۱: مولکول‌های زیستی', duration: 90, isDone: true, type: 'study' },
  { id: '2', day: 'شنبه', subject: 'ریاضی', topic: 'تابع', duration: 60, isDone: true, type: 'test' },
  { id: '3', day: 'شنبه', subject: 'شیمی', topic: 'استوکیومتری', duration: 75, isDone: false, type: 'study' },
  { id: '4', day: 'یکشنبه', subject: 'فیزیک', topic: 'سینماتیک', duration: 90, isDone: false, type: 'study' },
  { id: '5', day: 'یکشنبه', subject: 'ادبیات', topic: 'آرایه‌های ادبی', duration: 45, isDone: false, type: 'review' },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'c1', receiverId: 's1', content: 'سلام علی جان، گزارش هفته قبلت عالی بود.', timestamp: '1403/02/10 10:30', isRead: true },
  { id: 'm2', senderId: 's1', receiverId: 'c1', content: 'سلام استاد، ممنون. برای شیمی نیاز به منبع تست جدید دارم.', timestamp: '1403/02/10 11:00', isRead: false },
];

export const MOCK_CONTENT: EducationalContent[] = [
  { id: '1', title: 'تکنیک‌های تست‌زنی زیست', type: 'video', subject: 'زیست', description: 'روش‌های رد گزینه در سوالات شمارشی' },
  { id: '2', title: 'خلاصه‌نویسی فیزیک', type: 'pdf', subject: 'فیزیک', description: 'فرمول‌های فصل حرکت‌شناسی' },
  { id: '3', title: 'مدیریت زمان در آزمون', type: 'article', subject: 'مشاوره', description: 'چگونه وقت کم نیاوریم؟' },
];