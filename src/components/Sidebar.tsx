import { 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  Settings, 
  History, 
  ArrowRightLeft, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  Terminal,
  Zap,
  Banknote,
  Percent,
  Receipt,
  QrCode,
  FileSearch,
  ChevronDown,
  Globe,
  Clock,
  Puzzle as PuzzleIcon,
  Plus,
  ArrowRight,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';
import { UserMode, View } from '../App';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  onSendClick: () => void;
  onCreateLinkClick: () => void;
}

interface NavItem {
  id: View;
  label: string;
  icon: any;
  category?: string;
  tKey?: string;
}

export function Sidebar({ currentView, setView, userMode, setUserMode, onSendClick, onCreateLinkClick }: SidebarProps) {
  const { t } = useTranslation();
  
  const navigation: { category: string; items: NavItem[] }[] = [
    {
      category: 'Intelligence',
      items: [
        { id: 'overview', label: 'Dashboard', tKey: 'dashboard', icon: LayoutDashboard } as NavItem,
        { id: 'ai-insights', label: 'AI Insights', tKey: 'ai_insights', icon: Zap } as NavItem,
        ...(userMode === 'enterprise' ? [{ id: 'analytics' as View, label: 'Treasury Analytics', tKey: 'analytics', icon: BarChart3 } as NavItem] : []),
      ]
    },
    {
      category: userMode === 'enterprise' ? 'Risk Management' : 'Transactions',
      items: [
        { id: 'transactions', label: userMode === 'enterprise' ? 'Ledger Activity' : 'All Activity', tKey: userMode === 'enterprise' ? 'ledger_activity' : 'all_activity', icon: History } as NavItem,
        { id: 'compliance', label: 'Risk & Disputes', tKey: 'risk_disputes', icon: ShieldCheck } as NavItem,
      ]
    },
    {
      category: userMode === 'enterprise' ? 'Revenue flow' : 'Money In',
      items: [
        { id: 'payments', label: 'Checkout', tKey: 'payments', icon: CreditCard } as NavItem,
        { id: 'links', label: 'Payment Links', tKey: 'payment_links', icon: ArrowRightLeft } as NavItem,
        { id: 'subscriptions', label: 'Subscriptions', tKey: 'subscriptions', icon: History } as NavItem,
        { id: 'invoices', label: 'Invoicing', tKey: 'invoicing', icon: FileSearch } as NavItem,
        ...(userMode === 'smb' ? [{ id: 'integrations' as View, label: 'Integrations', icon: PuzzleIcon } as NavItem] : []),
      ]
    },
    {
      category: userMode === 'enterprise' ? 'Disbursements' : 'Money Out',
      items: [
        { id: 'payouts', label: 'Global Payouts', tKey: 'global_payouts', icon: Banknote } as NavItem,
        { id: 'beneficiaries', label: 'Beneficiaries', tKey: 'beneficiaries', icon: Users } as NavItem,
        { id: 'scheduled-payouts', label: 'Scheduled', tKey: 'scheduled', icon: Clock } as NavItem,
      ]
    },
    {
      category: userMode === 'enterprise' ? 'Treasury' : 'FX & Wallets',
      items: [
        { id: 'wallets', label: userMode === 'enterprise' ? 'Institutional Wallets' : 'Multi-Currency', tKey: 'multi_currency', icon: Wallet } as NavItem,
        { id: 'rates', label: 'Exchange Rates', tKey: 'exchange_rates', icon: Percent } as NavItem,
      ]
    },
    ...(userMode === 'smb' ? [{
      category: 'Growth',
      items: [
        { id: 'analytics' as View, label: 'Analytics', tKey: 'analytics', icon: BarChart3 } as NavItem,
        { id: 'customers' as View, label: 'Customers', tKey: 'customers', icon: Users } as NavItem,
      ]
    }] : []),
    {
      category: 'Institutional',
      items: [
        { id: 'settings', label: 'Control Center', tKey: 'control_center', icon: Settings } as NavItem,
        { id: 'developers', label: 'Developer API', tKey: 'developer_api', icon: Terminal } as NavItem,
        ...(userMode === 'enterprise' ? [{ id: 'integrations' as View, label: 'ERP Connect', icon: PuzzleIcon } as NavItem] : []),
      ]
    }
  ];

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 w-60 bg-primary-navy flex flex-col h-full text-white shrink-0 z-50 overflow-hidden",
      "hidden md:flex"
    )}>
      <div className="p-6 flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 bg-accent-emerald rounded-md flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
        </div>
        <span className="text-xl font-bold tracking-tight font-display">GlobalPay</span>
      </div>

      <nav className="flex-1 px-3 space-y-6 overflow-y-auto pb-8 scrollbar-hide">
        {navigation.map((group) => (
          <div key={group.category} className="space-y-1">
            <h4 className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2">
              {group.category}
            </h4>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold transition-all group",
                  currentView === item.id 
                    ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  currentView === item.id ? "text-accent-emerald" : "text-white/30 group-hover:text-white/60"
                )} />
                {item.tKey ? t(item.tKey) : item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 bg-primary-dark shrink-0">
        <button 
          onClick={() => setUserMode(userMode === 'smb' ? 'enterprise' : 'smb')}
          className="w-full flex items-center justify-between p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
        >
          <div className="flex flex-col">
            <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-0.5">{t('platform_mode')}</span>
            <span className="text-xs font-bold text-white/90">
              {userMode === 'smb' ? t('small_business') : t('enterprise')}
            </span>
          </div>
          <div className={cn(
            "w-9 h-5 rounded-full p-1 transition-all duration-300",
            userMode === 'smb' ? "bg-white/10" : "bg-accent-emerald"
          )}>
            <div className={cn(
              "w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm",
              userMode === 'enterprise' && "translate-x-4"
            )} />
          </div>
        </button>
      </div>
    </aside>
  );
}
