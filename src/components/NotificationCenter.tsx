import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Check, Info, AlertTriangle, AlertCircle, Trash2 } from 'lucide-react';
import { useNotifications, Notification } from '../context/NotificationContext';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const { t } = useTranslation();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-accent-emerald" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-status-amber" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-status-red" />;
      default: return <Info className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-primary-navy/20 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="fixed top-16 right-8 w-80 max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-primary-navy text-sm">{t('notifications')}</h3>
                {unreadCount > 0 && (
                  <span className="bg-status-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-accent-emerald hover:underline underline-offset-4 uppercase tracking-wider"
                  >
                    {t('mark_all_read')}
                  </button>
                )}
                <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-lg transition-colors text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                      className={cn(
                        "p-4 hover:bg-gray-50 transition-colors cursor-pointer group relative",
                        !notification.read && "bg-accent-emerald/5"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          notification.type === 'success' && "bg-accent-emerald/10",
                          notification.type === 'warning' && "bg-status-amber/10",
                          notification.type === 'error' && "bg-status-red/10",
                          notification.type === 'info' && "bg-indigo-50",
                        )}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <p className={cn("text-xs font-bold text-primary-navy truncate", !notification.read && "pr-3")}>
                            {notification.title}
                          </p>
                          <p className="text-[11px] text-gray-500 leading-normal line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-1">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-status-red rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Bell className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-xs font-bold text-gray-400">{t('no_notifications')}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{t('no_notifications_desc')}</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-gray-50/50 border-t border-gray-50 text-center">
              <button className="text-[10px] font-bold text-gray-400 hover:text-primary-navy uppercase tracking-widest transition-colors">
                View notification history
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
