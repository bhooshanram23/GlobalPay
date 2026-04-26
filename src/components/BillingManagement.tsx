import { Plus, Search, Filter, MoreHorizontal, Calendar, ArrowRight, RefreshCcw, FileText, CheckCircle2, TrendingUp, Users, CreditCard, Tag, BarChart3, Zap, Download, Send, Loader2, MailCheck } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../App';
import { useState, useEffect } from 'react';
import { CreateInvoiceModal } from './CreateInvoiceModal';

const INITIAL_SUBSCRIPTIONS = [
  { id: 'sub_01', customer: 'Acme Corp', plan: 'Enterprise Pro', amount: 2499, status: 'Active', nextBilling: 'Nov 24, 2023', interval: 'Monthly' },
  { id: 'sub_02', customer: 'CloudFlow Ltd', plan: 'Startup Tier', amount: 49, status: 'Active', nextBilling: 'Nov 15, 2023', interval: 'Monthly' },
  { id: 'sub_03', customer: 'Global Tech', plan: 'Enterprise Pro', amount: 2499, status: 'Past Due', nextBilling: 'Oct 20, 2023', interval: 'Monthly' },
  { id: 'sub_04', customer: 'Urban Design', plan: 'Creator Plan', amount: 199, status: 'Canceled', nextBilling: '-', interval: 'Yearly' },
];

const PLANS = [
  { id: 'p_01', name: 'Starter', price: 29, interval: 'mo', activeSubscribers: 842, status: 'Active' },
  { id: 'p_02', name: 'Growth', price: 99, interval: 'mo', activeSubscribers: 312, status: 'Active' },
  { id: 'p_03', name: 'Enterprise', price: 2499, interval: 'mo', activeSubscribers: 28, status: 'Active' },
];

const INITIAL_INVOICES = [
  { id: 'INV-2023-001', customer: 'Alibaba Cloud', amount: 12400, date: 'Oct 24, 2023', status: 'Paid' },
  { id: 'INV-2023-002', customer: 'Stellar Logistics', amount: 8450, date: 'Oct 22, 2023', status: 'Sent' },
  { id: 'INV-2023-003', customer: 'Nexa Soft', amount: 2100, date: 'Oct 15, 2023', status: 'Overdue' },
];

interface BillingProps {
  type: 'subscriptions' | 'invoices';
}

export function BillingManagement({ type }: BillingProps) {
  const isSubscriptions = type === 'subscriptions';
  const [activeTab, setActiveTab] = useState<'all' | 'plans' | 'coupons'>(isSubscriptions ? 'all' : 'all');
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sendingId, setSendingId] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleInvoiceSuccess = (newInvoice: any) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const handleSendInvoice = (id: string) => {
    setSendingId(id);
    setTimeout(() => {
      setSendingId(null);
      setInvoices(prev => prev.map(inv => 
        inv.id === id ? { ...inv, status: 'Sent' } : inv
      ));
    }, 1500);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) || inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesMinAmount = amountRange.min === '' || inv.amount >= parseFloat(amountRange.min);
    const matchesMaxAmount = amountRange.max === '' || inv.amount <= parseFloat(amountRange.max);
    
    const matchesFromDate = dateRange.from === '' || new Date(inv.date) >= new Date(dateRange.from);
    const matchesToDate = dateRange.to === '' || new Date(inv.date) <= new Date(dateRange.to);

    return matchesSearch && matchesStatus && matchesMinAmount && matchesMaxAmount && matchesFromDate && matchesToDate;
  });

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customer.toLowerCase().includes(searchQuery.toLowerCase()) || sub.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const currentData = isSubscriptions ? filteredSubscriptions : filteredInvoices;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = currentData.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, amountRange, dateRange, isSubscriptions]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display">{isSubscriptions ? 'Subscription Engine' : 'Professional Invoicing'}</h1>
          <p className="text-xs text-gray-500 font-medium">
            {isSubscriptions 
              ? 'Orchestrating complex recurring billing and revenue lifecycles.' 
              : 'Manage your recurring revenue and custom client billing.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isSubscriptions && (
            <button className="px-4 py-2.5 rounded-xl text-xs font-bold text-primary-navy bg-white border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2">
              <RefreshCcw className="w-3.5 h-3.5" />
              Recalculate MRR
            </button>
          )}
          <button 
            onClick={() => !isSubscriptions && setIsInvoiceModalOpen(true)}
            className="bg-primary-navy text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 hover:bg-primary-navy/90 active:scale-95 shadow-lg shadow-primary-navy/10"
          >
            <Plus className="w-4 h-4" />
            {isSubscriptions ? 'New Subscription' : 'Create Invoice'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatItem 
          label={isSubscriptions ? "Monthly Recurring Revenue" : "Outstanding Receivables"} 
          value={isSubscriptions ? "$42,450.00" : "$21,400.00"} 
          sub="+12% vs last mo"
          icon={isSubscriptions ? RefreshCcw : FileText} 
          trend="up"
        />
        <StatItem 
          label={isSubscriptions ? "Active Subscribers" : "Avg. Payment Time"} 
          value={isSubscriptions ? "1,242" : "4.2 Days"} 
          sub="32 added today"
          icon={isSubscriptions ? Users : CheckCircle2} 
          trend="up"
        />
        <StatItem 
          label={isSubscriptions ? "Net Revenue Churn" : "Invoices Sent"} 
          value={isSubscriptions ? "1.8%" : "84"} 
          sub="-0.4% improvement"
          icon={isSubscriptions ? TrendingUp : ArrowRight} 
          trend="down"
          isNeutral={!isSubscriptions}
        />
        <StatItem 
          label={isSubscriptions ? "LTV (Average)" : "Total Revenue"} 
          value={isSubscriptions ? "$14.2k" : "$192k"} 
          sub="+8% growth"
          icon={isSubscriptions ? Zap : BarChart3} 
          trend="up"
        />
      </div>

      {isSubscriptions && (
        <div className="flex items-center gap-1 p-1 bg-gray-100/50 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('all')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
              activeTab === 'all' ? "bg-white text-primary-navy shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            Subscribers
          </button>
          <button 
            onClick={() => setActiveTab('plans')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
              activeTab === 'plans' ? "bg-white text-primary-navy shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            Plans & Tiers
          </button>
          <button 
            onClick={() => setActiveTab('coupons')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
              activeTab === 'coupons' ? "bg-white text-primary-navy shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            Coupons
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
               <button className="text-primary-navy underline decoration-accent-emerald underline-offset-8">
                 {activeTab === 'all' ? (isSubscriptions ? 'All Subscribers' : 'All Invoices') : 
                  activeTab === 'plans' ? 'All Plans' : 'All Coupons'}
               </button>
               <button className="hover:text-primary-navy transition-colors">Active</button>
               <button className="hover:text-primary-navy transition-colors">Archived</button>
             </div>
             <div className="flex items-center gap-2 w-full sm:w-auto">
               <div className="relative w-full sm:w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search..." 
                   className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-4 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-accent-emerald transition-all"
                 />
               </div>
               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={cn(
                   "p-2 border rounded-lg transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider",
                   showFilters ? "bg-primary-navy border-primary-navy text-white shadow-lg" : "bg-white border-gray-200 text-gray-400 hover:text-primary-navy"
                 )}
               >
                 <Filter className="w-3.5 h-3.5" />
                 {showFilters ? 'Hide Filters' : 'Filters'}
               </button>
             </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-b border-gray-100 bg-gray-50/50"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Status</label>
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all"
                    >
                      <option value="all">All Statuses</option>
                      {isSubscriptions ? (
                        <>
                          <option value="Active">Active</option>
                          <option value="Past Due">Past Due</option>
                          <option value="Canceled">Canceled</option>
                        </>
                      ) : (
                        <>
                          <option value="Paid">Paid</option>
                          <option value="Sent">Sent</option>
                          <option value="Overdue">Overdue</option>
                        </>
                      )}
                    </select>
                  </div>

                  {!isSubscriptions && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Amount Range</label>
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            placeholder="Min"
                            value={amountRange.min}
                            onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                            className="w-1/2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all"
                          />
                          <input 
                            type="number" 
                            placeholder="Max"
                            value={amountRange.max}
                            onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                            className="w-1/2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Date Range</label>
                        <div className="flex gap-2">
                          <input 
                            type="date" 
                            value={dateRange.from}
                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                            className="w-1/2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-[10px] font-medium outline-none focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all"
                          />
                          <input 
                            type="date" 
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                            className="w-1/2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-[10px] font-medium outline-none focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-end">
                    <button 
                      onClick={() => {
                        setFilterStatus('all');
                        setAmountRange({ min: '', max: '' });
                        setDateRange({ from: '', to: '' });
                        setSearchQuery('');
                      }}
                      className="text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:text-status-red transition-colors mb-3 ml-1"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto">
            <table className="w-full text-left high-density-table">
              {activeTab === 'all' && (
                <>
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-100">
                      <th className="px-6 py-4">{isSubscriptions ? 'Subscriber Profile' : 'Invoice Recipient'}</th>
                      <th className="px-6 py-4 text-center">ID Reference</th>
                      <th className="px-6 py-4">Financials</th>
                      <th className="px-6 py-4">Timeline</th>
                      <th className="px-6 py-4">Lifecycle State</th>
                      <th className="px-6 py-4 w-10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[11px]">
                    {paginatedData.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-all group cursor-default">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary-navy font-bold text-xs shadow-sm ring-1 ring-primary-navy/5 group-hover:scale-110 transition-transform">
                              {item.customer.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-primary-navy mb-0.5 tracking-tight group-hover:text-accent-emerald transition-colors">{item.customer}</span>
                              <span className="text-[9px] text-gray-400 font-medium">{isSubscriptions ? item.plan : (item.email || 'billing@acme.com')}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-mono text-gray-400 bg-gray-100/50 px-2.5 py-1 rounded-lg text-[9px] font-bold border border-gray-100">
                            {item.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-primary-navy text-xs mb-0.5">
                            {formatCurrency(item.amount, 'INR')}
                          </p>
                          {isSubscriptions && <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.interval}</p>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-gray-500 font-semibold">{isSubscriptions ? item.nextBilling : item.date}</span>
                            <span className="text-[8px] text-gray-300 font-bold uppercase tracking-[0.15em]">{isSubscriptions ? 'Renewal' : 'Issued'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-widest border transition-all",
                            item.status === 'Active' || item.status === 'Paid' ? "bg-accent-emerald/5 text-accent-emerald border-accent-emerald/20" : 
                            item.status === 'Sent' ? "bg-blue-50 text-blue-500 border-blue-100" :
                            item.status === 'Overdue' || item.status === 'Past Due' ? "bg-status-red/5 text-status-red border-status-red/10 shadow-[0_0_8px_rgba(239,68,68,0.1)]" : 
                            "bg-gray-50 text-gray-400 border-gray-100"
                          )}>
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full mr-2",
                              item.status === 'Active' || item.status === 'Paid' ? "bg-accent-emerald" : 
                              item.status === 'Sent' ? "bg-blue-500" :
                              item.status === 'Overdue' || item.status === 'Past Due' ? "bg-status-red animate-pulse" : "bg-gray-300"
                            )} />
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            <button className="p-2 text-gray-300 hover:text-primary-navy hover:bg-white rounded-lg transition-all shadow-sm ring-1 ring-transparent hover:ring-gray-100" title="Download Document">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            
                            {!isSubscriptions ? (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSendInvoice(item.id);
                                }}
                                disabled={sendingId === item.id}
                                className={cn(
                                  "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 border shadow-sm",
                                  sendingId === item.id 
                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
                                    : item.status === 'Sent' || item.status === 'Paid'
                                      ? "bg-white text-gray-400 border-gray-100 hover:text-primary-navy hover:border-gray-200"
                                      : "bg-accent-emerald/5 text-accent-emerald border-accent-emerald/20 hover:bg-accent-emerald hover:text-white"
                                )}
                              >
                                {sendingId === item.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : item.status === 'Sent' || item.status === 'Paid' ? (
                                  <MailCheck className="w-3 h-3" />
                                ) : (
                                  <Send className="w-3 h-3" />
                                )}
                                {sendingId === item.id ? 'Sending...' : item.status === 'Sent' || item.status === 'Paid' ? 'Re-send' : 'Send Invoice'}
                              </button>
                            ) : (
                              <button className="p-2 text-gray-300 hover:text-accent-emerald hover:bg-white rounded-lg transition-all shadow-sm ring-1 ring-transparent hover:ring-gray-100">
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button className="p-2 text-gray-300 hover:text-status-amber hover:bg-white rounded-lg transition-all shadow-sm ring-1 ring-transparent hover:ring-gray-100">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {currentData.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-24 text-center">
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4"
                          >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                              <Search className="w-7 h-7 text-gray-200" />
                            </div>
                            <div>
                              <p className="font-bold text-primary-navy text-sm">No Matching Records</p>
                              <p className="text-[11px] text-gray-400 mt-1 max-w-[200px] mx-auto leading-relaxed">We couldn't find any documents matching your current filter selection.</p>
                            </div>
                            <button 
                              onClick={() => {
                                setFilterStatus('all');
                                setAmountRange({ min: '', max: '' });
                                setDateRange({ from: '', to: '' });
                                setSearchQuery('');
                              }}
                              className="mt-2 px-6 py-2 bg-primary-navy text-white text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-accent-emerald transition-all active:scale-95 shadow-lg shadow-primary-navy/10"
                            >
                              Reset Dashboard
                            </button>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              )}

              {activeTab === 'plans' && (
                <>
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-100">
                      <th className="px-6 py-4">Commercial Plan</th>
                      <th className="px-6 py-4 text-center">Reference</th>
                      <th className="px-6 py-4">Price Point</th>
                      <th className="px-6 py-4">Volume</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 w-10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[11px]">
                    {PLANS.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50/80 transition-all group cursor-default">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-primary-navy/5 flex items-center justify-center text-primary-navy">
                               <CreditCard className="w-4 h-4" />
                             </div>
                             <p className="font-bold text-primary-navy tracking-tight group-hover:text-accent-emerald transition-colors">{plan.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-mono text-gray-400 font-bold bg-gray-100/50 px-2 py-0.5 rounded text-[9px]">{plan.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-primary-navy text-xs">{formatCurrency(plan.price, 'INR')}</span>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-1">/{plan.interval}</span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-accent-emerald rounded-full" />
                             <span className="text-gray-500 font-bold">{plan.activeSubscribers}</span>
                             <span className="text-[9px] text-gray-400 font-medium lowercase">subscribers</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-bold text-[9px] uppercase tracking-widest border border-accent-emerald/20">
                            {plan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-gray-300 hover:text-primary-navy hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-gray-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {activeTab === 'coupons' && (
                <tbody className="text-[11px]">
                  <tr>
                    <td colSpan={5} className="px-6 py-32 text-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-5"
                      >
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center border border-dashed border-gray-200">
                          <Tag className="w-10 h-10 text-gray-200" />
                        </div>
                        <div className="max-w-xs mx-auto">
                          <p className="font-bold text-primary-navy text-sm tracking-tight">Promotional Engine Offline</p>
                          <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">Boost your sales by creating custom discount codes and seasonal promotional offers for your customers.</p>
                        </div>
                        <button className="flex items-center gap-2 px-8 py-3 bg-primary-navy text-white text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-accent-emerald transition-all shadow-xl shadow-primary-navy/10 active:scale-95">
                          <Plus className="w-3.5 h-3.5" />
                          Create Coupon
                        </button>
                      </motion.div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            
            {/* Pagination Controls */}
            {(activeTab === 'all' && currentData.length > 0) && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Showing <span className="text-primary-navy">{startIndex + 1}</span> to <span className="text-primary-navy">{Math.min(startIndex + itemsPerPage, currentData.length)}</span> of <span className="text-primary-navy">{currentData.length}</span> documents
                </p>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-gray-200 rounded-lg bg-white text-gray-400 hover:text-primary-navy disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "w-7 h-7 rounded-lg text-[10px] font-bold transition-all border",
                          currentPage === page 
                            ? "bg-primary-navy border-primary-navy text-white shadow-sm" 
                            : "bg-white border-gray-100 text-gray-400 hover:text-primary-navy"
                        )}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-1.5 border border-gray-200 rounded-lg bg-white text-gray-400 hover:text-primary-navy disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <CreateInvoiceModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSuccess={handleInvoiceSuccess}
      />
    </motion.div>
  );
}

function StatItem({ label, value, sub, icon: Icon, trend, isNeutral }: { label: string; value: string; sub: string; icon: any; trend?: 'up' | 'down'; isNeutral?: boolean }) {
  return (
    <div className="glass-card p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:shadow-primary-navy/5 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-gray-50 rounded-xl text-primary-navy group-hover:bg-primary-navy group-hover:text-white transition-all">
          <Icon className="w-4 h-4" />
        </div>
        {!isNeutral && trend && (
          <div className={cn(
            "p-1 rounded-md",
            trend === 'up' ? "bg-accent-emerald/10 text-accent-emerald" : "bg-status-red/10 text-status-red"
          )}>
            <TrendingUp className={cn("w-3 h-3", trend === 'down' && "rotate-180")} />
          </div>
        )}
      </div>
      <div>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-xl font-bold text-primary-navy leading-none mb-1 font-display tracking-tight">{value}</h4>
        <p className={cn(
          "text-[9px] font-bold uppercase tracking-wider",
          isNeutral ? "text-gray-400" : trend === 'up' ? "text-accent-emerald" : "text-status-red"
        )}>{sub}</p>
      </div>
    </div>
  );
}

