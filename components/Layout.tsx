import React, { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  MicrophoneIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon, 
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  FilmIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline';
import { getCurrentUser } from '../services/authService';

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getCurrentUser();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Gambar → Prompt', path: '/tool/img-to-prompt', icon: DocumentTextIcon },
    { name: 'Gambar → Gambar', path: '/tool/img-to-img', icon: PhotoIcon },
    { name: 'Teks → Gambar', path: '/tool/text-to-img', icon: PhotoIcon },
    { name: 'Teks → Video', path: '/tool/text-to-video', icon: VideoCameraIcon },
    { name: 'Video → Gambar', path: '/tool/video-to-img', icon: FilmIcon },
    { name: 'Teks → Suara', path: '/tool/text-to-speech', icon: MicrophoneIcon },
    { name: 'UGC Tool', path: '/tool/ugc-tool', icon: RectangleGroupIcon },
    { name: 'Script Generator', path: '/tool/script-gen', icon: DocumentTextIcon },
    { name: 'Auto Content', path: '/tool/auto-content', icon: SparklesIcon },
    { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">r</span>
            </div>
            <span className="text-xl font-bold tracking-tight">roLb<span className="text-indigo-500">Website</span></span>
            <button 
              className="ml-auto lg:hidden text-slate-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive(item.path) 
                    ? 'bg-slate-800 text-indigo-400 border-l-2 border-indigo-500' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Footer User Profile */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={user?.avatar || "https://picsum.photos/id/64/100/100"} 
                alt="User" 
                className="h-10 w-10 rounded-full border border-slate-700"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'Guest'}</p>
                <p className="text-xs text-slate-500 truncate">Unlimited Plan</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm px-2 py-1 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between">
           <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">r</span>
            </div>
            <span className="text-lg font-bold">roLb</span>
           </div>
           <button onClick={() => setMobileMenuOpen(true)} className="text-slate-400">
             <Bars3Icon className="h-7 w-7" />
           </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;