import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { LogOut, LayoutDashboard, Moon, Sun, Menu, X, User as UserIcon, Users, BarChart3, Database } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminNav = [
    { name: 'Analytics', href: '/', icon: BarChart3 },
    { name: 'All Leads', href: '/leads', icon: Database },
    { name: 'Sales Team', href: '/team', icon: Users },
  ];

  const salesNav = [
    { name: 'My Leads', href: '/', icon: LayoutDashboard },
  ];

  const navigation = user?.role === 'Admin' ? adminNav : salesNav;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between py-4 px-4 border-b border-gray-200 dark:border-gray-700">
            <img src={logo} alt="Smart Leads" className="h-10 w-auto invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 object-contain transition-all" />
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.href); setSidebarOpen(false); }}
                  className={`${location.pathname === item.href ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'} group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center py-6 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
            <img src={logo} alt="Smart Leads" className="h-10 w-auto invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 object-contain transition-all" />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`${location.pathname === item.href || (item.href === '/' && location.pathname === '') ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'} group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-end items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="flex items-center space-x-3 relative">
              <button 
                onClick={() => setProfileOpen(true)}
                className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight">{user?.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</span>
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 focus:outline-none transition-colors"
              >
                <LogOut className="h-4 w-4 md:mr-1" /> <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 bg-gray-900/75 overflow-y-auto">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Your Profile
                </h3>
                <button onClick={() => setProfileOpen(false)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-2 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold mb-4 shadow-inner">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h4>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">{user?.role}</p>
              </div>

              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
                  <div className="mt-1 text-sm text-gray-900 dark:text-white font-medium">{user?.email}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account Created</label>
                  <div className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account ID</label>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-mono text-xs">{user?._id || 'N/A'}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
