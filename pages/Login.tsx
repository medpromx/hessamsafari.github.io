import React, { useState } from 'react';
import { User } from '../types';
import { CURRENT_CONSULTANT, MOCK_STUDENTS } from '../constants';
import { GraduationCap, ArrowLeft, UserCircle2 } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'student' | 'consultant'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock Authentication Logic
    if (role === 'consultant') {
      if (username === 'hessam' && password === 'admin') {
        onLogin(CURRENT_CONSULTANT);
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است (hessam/admin)');
      }
    } else {
      const student = MOCK_STUDENTS.find(s => s.email.includes(username));
      // For demo, just checking if username matches email prefix part or "ali"
      if ((username === 'ali' || username === 'sara' || username === 'pouya') && password === '1234') {
        const found = MOCK_STUDENTS.find(s => s.email.startsWith(username));
        if (found) onLogin(found);
      } else {
        setError('دانش‌آموز یافت نشد (ali/1234)');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-teal-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8 text-center bg-primary-50">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">سامانه مشاوره حسام</h1>
          <p className="text-gray-500 text-sm">لطفا جهت ورود اطلاعات خود را وارد کنید</p>
        </div>

        <div className="p-8">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                role === 'student' ? 'bg-white text-primary-700 shadow' : 'text-gray-500'
              }`}
            >
              دانش‌آموز
            </button>
            <button
              onClick={() => setRole('consultant')}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                role === 'consultant' ? 'bg-white text-primary-700 shadow' : 'text-gray-500'
              }`}
            >
              مشاور
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {role === 'consultant' ? 'نام کاربری' : 'ایمیل یا نام کاربری'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder={role === 'consultant' ? 'hessam' : 'ali'}
                />
                <UserCircle2 className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>ورود به پنل</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>حساب کاربری ندارید؟ <a href="#" className="text-primary-600 hover:underline">ثبت درخواست مشاوره</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;