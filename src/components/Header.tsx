import { Bell, Search, Plus, Globe, ChevronDown, User, Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserMode } from '../App';
import { useState } from 'react';
import { NotificationCenter } from './NotificationCenter';
import { useNotifications } from '../context/NotificationContext';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onSendClick: () => void;
  onCreateLinkClick: () => void;
  userMode: UserMode;
}

export function Header({ onSendClick, onCreateLinkClick, userMode }: HeaderProps) {
  const isEnterprise = userMode === 'enterprise';
  const { unreadCount } = useNotifications();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-sm font-bold text-primary-navy">
            {isEnterprise ? t('enterprise') : t('dashboard')}
          </h1>
        </div>

        <div className="h-4 w-px bg-gray-200" />
        
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 transition-colors group"
          >
            <Languages className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-navy" />
            <span className="text-[11px] font-bold text-gray-600 uppercase">
              {i18n.language.split('-')[0].toUpperCase()}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-300" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-left transition-colors",
                    i18n.language.startsWith(lang.code) ? "bg-accent-emerald/5 text-accent-emerald" : "text-gray-600 hover:bg-gray-50 hover:text-primary-navy"
                  )}
                >
                  <span>{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {isEnterprise && (
          <div className="hidden xl:flex items-center gap-4">
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Network Status</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                <span className="text-[10px] font-bold text-accent-emerald uppercase tracking-tighter">Live</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input 
            type="text" 
            placeholder={t('search')} 
            className="bg-gray-100 rounded-full pl-8 pr-4 py-1.5 text-[11px] w-56 focus:outline-none focus:ring-1 focus:ring-accent-emerald transition-all font-bold"
          />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onSendClick}
            className="bg-accent-emerald text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-accent-emerald/90 transition-all active:scale-95"
          >
            {t('send_payment')}
          </button>
          
          <button 
            onClick={onCreateLinkClick}
            className="bg-white border border-gray-100 text-primary-navy px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
          >
            {t('create')}
          </button>
        </div>
        
        <div className="h-6 w-px bg-gray-100 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-1.5 text-gray-400 hover:text-primary-navy transition-colors ring-1 ring-transparent hover:ring-gray-100 rounded-full"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-status-red rounded-full border border-white" />
            )}
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <button className="flex items-center gap-2 p-0.5 pr-3 hover:bg-gray-50 rounded-full transition-all group">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bhooshan" 
                 alt="Profile" 
                 className="w-full h-full object-cover" 
               />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-primary-navy leading-tight">B. Ram</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Admin</span>
            </div>
          </button>
        </div>
      </div>

      <NotificationCenter 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </header>
  );
}
