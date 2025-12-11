import React from 'react';
import { User, PlanItem } from '../types';
import { MOCK_PLAN } from '../constants';
import { Clock, CheckCircle2, TrendingUp, AlertCircle, PlayCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface StudentDashboardProps {
  user: User;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const todaysPlan = MOCK_PLAN.filter(p => p.day === 'شنبه'); // Mocking "today" as Saturday
  
  // Mock trend data
  const studyTrend = [
    { day: 'ش', hours: 5 },
    { day: 'ی', hours: 6 },
    { day: 'د', hours: 4 },
    { day: 'س', hours: 7 },
    { day: 'چ', hours: 6 },
    { day: 'پ', hours: 8 },
    { day: 'ج', hours: 5 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
       <header className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">سلام، {user.name} 👋</h1>
           <p className="text-gray-500 mt-1">امروزت رو با انرژی شروع کن!</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
           📅 شنبه، ۱۵ اردیبهشت
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl text-white shadow-lg">
           <div className="flex justify-between items-start mb-2">
             <Clock className="opacity-80" />
             <span className="text-xs bg-white/20 px-2 py-0.5 rounded">هفتگی</span>
           </div>
           <p className="text-2xl font-bold">32 <span className="text-sm font-normal opacity-80">ساعت</span></p>
           <p className="text-xs opacity-80 mt-1">+2 ساعت نسبت به هفته قبل</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-2 text-green-600">
             <CheckCircle2 />
             <span className="text-xs bg-green-50 px-2 py-0.5 rounded">برنامه</span>
           </div>
           <p className="text-2xl font-bold text-gray-800">85%</p>
           <p className="text-xs text-gray-400 mt-1">پیشرفت برنامه امروز</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-2 text-purple-600">
             <TrendingUp />
             <span className="text-xs bg-purple-50 px-2 py-0.5 rounded">تراز</span>
           </div>
           <p className="text-2xl font-bold text-gray-800">6400</p>
           <p className="text-xs text-gray-400 mt-1">آخرین آزمون</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-2 text-orange-600">
             <AlertCircle />
             <span className="text-xs bg-orange-50 px-2 py-0.5 rounded">یادآور</span>
           </div>
           <p className="text-sm font-bold text-gray-800 pt-2">آزمون جامع</p>
           <p className="text-xs text-gray-400 mt-1">۲ روز باقی‌مانده</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">برنامه امروز</h2>
          <div className="space-y-4">
            {todaysPlan.map((item) => (
              <div key={item.id} className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50">
                <div className={`p-3 rounded-lg mr-4 ml-4 ${
                  item.type === 'study' ? 'bg-blue-100 text-blue-600' :
                  item.type === 'test' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                }`}>
                   {item.type === 'study' ? <Clock size={20}/> : <PlayCircle size={20}/>}
                </div>
                <div className="flex-1">
                   <h3 className="font-bold text-gray-800">{item.subject}</h3>
                   <p className="text-sm text-gray-500">{item.topic}</p>
                </div>
                <div className="text-left ml-4">
                   <span className="block font-bold text-gray-700">{item.duration} دقیقه</span>
                   <span className="text-xs text-gray-400">زمان هدف</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${item.isDone ? 'bg-green-500 border-green-500' : 'border-gray-300'}
                `}>
                   {item.isDone && <CheckCircle2 className="text-white w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Chart & Notifications */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-800 mb-4">نمودار مطالعه هفته</h2>
             <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studyTrend}>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <Line type="monotone" dataKey="hours" stroke="#0d9488" strokeWidth={3} dot={{r: 4, fill: '#0d9488'}} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
          
          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
            <h3 className="font-bold text-teal-800 mb-2">پیام مشاور (حسام)</h3>
            <p className="text-sm text-teal-700 leading-relaxed">
              علی جان، تحلیل آزمون دیروزت رو دیدم. توی زیست پیشرفت خوبی داشتی اما برای فیزیک باید روی تست‌های زمان‌دار بیشتر کار کنی. برنامه این هفته رو تغییر دادم.
            </p>
            <button className="mt-4 text-xs font-bold text-teal-600 hover:text-teal-800">پاسخ دادن →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;