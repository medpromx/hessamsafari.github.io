import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import ConsultantDashboard from './pages/ConsultantDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Planning from './pages/Planning';
import Messaging from './pages/Messaging';
import Content from './pages/Content';
import Layout from './components/Layout';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('');

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('konkur_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Set default page based on role
      setCurrentPage(parsedUser.role === 'consultant' ? 'consultant-dashboard' : 'student-dashboard');
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('konkur_user', JSON.stringify(newUser));
    setCurrentPage(newUser.role === 'consultant' ? 'consultant-dashboard' : 'student-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('konkur_user');
    setCurrentPage('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'consultant-dashboard':
        return <ConsultantDashboard />;
      case 'student-dashboard':
        return user ? <StudentDashboard user={user} /> : null;
      case 'planning':
        return <Planning />;
      case 'messaging':
        return user ? <Messaging currentUser={user} /> : null;
      case 'content':
        return <Content />;
      default:
        return <div className="p-8 text-center text-gray-500">صفحه مورد نظر یافت نشد.</div>;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;