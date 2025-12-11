import React from 'react';
import { MOCK_STUDENTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookCheck, Activity, Search } from 'lucide-react';

const ConsultantDashboard: React.FC = () => {
  const data = MOCK_STUDENTS.map(s => ({
    name: s.name.split(' ')[0], // First name for chart
    hours: s.stats.totalStudyHours,
    score: s.stats.averageExamScore
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">داشبورد مدیریت</h1>
           <p className="text-gray-500 mt-1">خوش آمدی، مهندس حسام</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow">
          + افزودن دانش‌آموز
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">تعداد دانش‌آموزان</p>
            <p className="text-2xl font-bold text-gray-800">{MOCK_STUDENTS.length} نفر</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
             <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">میانگین تراز کل</p>
            <p className="text-2xl font-bold text-gray-800">6800</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <BookCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">تکمیل برنامه‌ها</p>
            <p className="text-2xl font-bold text-gray-800">78%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">وضعیت دانش‌آموزان</h2>
            <div className="relative">
               <input type="text" placeholder="جستجو..." className="pl-3 pr-8 py-1 text-sm border rounded-lg w-32 focus:w-48 transition-all" />
               <Search className="w-4 h-4 text-gray-400 absolute right-2 top-2" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-100">
                  <th className="pb-3 font-normal">نام دانش‌آموز</th>
                  <th className="pb-3 font-normal">رشته</th>
                  <th className="pb-3 font-normal">پیشرفت</th>
                  <th className="pb-3 font-normal">وضعیت</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {MOCK_STUDENTS.map((student, idx) => (
                  <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 flex items-center gap-3">
                      <img src={student.avatar} alt="" className="w-8 h-8 rounded-full" />
                      <span className="font-medium text-gray-700">{student.name}</span>
                    </td>
                    <td className="py-4 text-gray-500">{student.major}</td>
                    <td className="py-4">
                       <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[100px]">
                          <div 
                            className="bg-primary-500 h-1.5 rounded-full" 
                            style={{ width: `${student.stats.planProgress}%` }}
                          ></div>
                       </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        student.stats.planProgress > 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.stats.planProgress > 70 ? 'فعال' : 'نیاز به پیگیری'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">مقایسه عملکرد (ساعت مطالعه)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="hours" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;