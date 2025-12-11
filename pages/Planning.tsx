import React, { useState } from 'react';
import { MOCK_PLAN } from '../constants';
import { PlanItem } from '../types';
import { Check, Clock, BookOpen, Filter } from 'lucide-react';

const Planning: React.FC = () => {
  const [items, setItems] = useState<PlanItem[]>(MOCK_PLAN);

  const toggleStatus = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ));
  };

  const days = ['شنبه', 'یکشنبه']; // For demo simplicity

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">برنامه مطالعاتی هفته</h1>
        <button className="flex items-center gap-2 text-gray-600 bg-white px-3 py-2 rounded-lg border hover:bg-gray-50">
          <Filter size={18} />
          <span className="text-sm">فیلتر کردن</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map(day => (
          <div key={day} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">{day}</h3>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">۱۵ اردیبهشت</span>
            </div>
            <div className="divide-y divide-gray-100">
              {items.filter(i => i.day === day).length === 0 ? (
                <div className="p-8 text-center text-gray-400">برنامه‌ای ثبت نشده</div>
              ) : (
                items.filter(i => i.day === day).map(item => (
                  <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        item.isDone ? 'bg-primary-500 border-primary-500' : 'border-gray-300 group-hover:border-primary-400'
                      }`}
                    >
                      {item.isDone && <Check size={14} className="text-white" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-gray-800">{item.subject}</span>
                         <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                           item.type === 'study' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                         }`}>
                           {item.type === 'study' ? 'مطالعه' : item.type === 'test' ? 'تست' : 'مرور'}
                         </span>
                      </div>
                      <p className="text-xs text-gray-500">{item.topic}</p>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded">
                      <Clock size={12} />
                      <span>{item.duration} دقیقه</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        
        {/* Add Card Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-primary-400 hover:text-primary-500 cursor-pointer transition-colors bg-gray-50/50">
           <BookOpen size={32} className="mb-2" />
           <span className="font-medium">مشاهده روزهای آینده</span>
        </div>
      </div>
    </div>
  );
};

export default Planning;