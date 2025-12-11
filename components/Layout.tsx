import React, { useState } from 'react';
import { User } from '../types';
import { 
  LayoutDashboard, 
  CalendarDays, 
  MessageCircle, 
  BookOpen, 
  LogOut, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = user?.role === 'consultant' 
    ? [
      { id: 'consultant-dashboard', label: 'داشبورد', icon: LayoutDashboard },
      { id: 'messaging', label: 'پیام‌ها', icon: MessageCircle },
      { id: 'content', label: 'محتوای آموزشی', icon: BookOpen },
    ]
    : [
      { id: 'student-dashboard', label: 'داشبورد', icon: LayoutDashboard },
      { id: 'planning', label: 'برنامه درسی', icon: CalendarDays },
      { id: 'messaging', label: 'پیام به مشاور', icon: MessageCircle },
      { id: 'content', label: 'بانک محتوا', icon: BookOpen },
    ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-primary-600 text-white p-4 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center gap-2">
           <GraduationCap className="w-6 h-6" />
           <span className="font-bold text-lg">مشاوره حسام</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 right-0 h-screen w-64 bg-white shadow-xl z-20 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-100 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-100 mb-3">
             <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
          <span className="text-sm text-primary-600 font-medium">
            {user?.role === 'consultant' ? 'مشاور ارشد' : 'دانش‌آموز'}
          </span>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${currentPage === item.id 
                  ? 'bg-primary-50 text-primary-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;