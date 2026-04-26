import { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, MoreVertical, CreditCard, Zap, ShieldCheck, AlertCircle, ArrowRightLeft, BarChart3, Activity, Globe, ChevronDown } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { UserMode } from '../App';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CHART_DATA = [
  { name: '01 Oct', volume: 42000, success: 98 },
  { name: '04 Oct', volume: 38000, success: 97 },
  { name: '08 Oct', volume: 55000, success: 99 },
  { name: '12 Oct', volume: 48000, success: 96 },
  { name: '16 Oct', volume: 62000, success: 98 },
  { name: '20 Oct', volume: 58000, success: 99 },
  { name: '24 Oct', volume: 75000, success: 98 },
];

const TRANSACTIONS = [
  { id: '1', name: 'Alibaba Cloud Services', date: 'Oct 24, 2023', amount: -1240.20, currency: 'INR', status: 'Success', type: 'out' },
  { id: '2', name: 'Upwork Global Inc', date: 'Oct 23, 2023', amount: 4500.00, currency: 'INR', status: 'Success', type: 'in' },
  { id: '3', name: 'DigitalOcean Europe', date: 'Oct 22, 2023', amount: -45.00, currency: 'EUR', status: 'Pending', type: 'out' },
  { id: '4', name: 'Stripe Settlement', date: 'Oct 21, 2023', amount: 125000.00, currency: 'INR', status: 'Success', type: 'in' },
  { id: '5', name: 'Amazon Web Services', date: 'Oct 20, 2023', amount: -650.40, currency: 'INR', status: 'Failed', type: 'out' },
];

const CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee', flag: 'https://flagcdn.com/in.svg', rate: 1 },
  { code: 'USD', name: 'US Dollar', flag: 'https://flagcdn.com/us.svg', rate: 0.012 },
  { code: 'EUR', name: 'Euro', flag: 'https://flagcdn.com/eu.svg', rate: 0.011 },
  { code: 'GBP', name: 'British Pound', flag: 'https://flagcdn.com/gb.svg', rate: 0.0094 },
  { code: 'SGD', name: 'Singapore Dollar', flag: 'https://flagcdn.com/sg.svg', rate: 0.016 },
  { code: 'AED', name: 'UAE Dirham', flag: 'https://flagcdn.com/ae.svg', rate: 0.044 },
];

interface OverviewProps {
  userMode: UserMode;
}

import { useTranslation } from 'react-i18next';

export function Overview({ userMode }: OverviewProps) {
  const isEnterprise = userMode === 'enterprise';
  const { t } = useTranslation();

  const [fromAmount, setFromAmount] = useState(isEnterprise ? '1000000' : '1000');
  const [fromCurrency, setFromCurrency] = useState(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState(CURRENCIES[1]);

  const toAmountCalculated = useMemo(() => {
    const amount = parseFloat(fromAmount.replace(/,/g, '')) || 0;
    const rate = toCurrency.rate / fromCurrency.rate;
    return (amount * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const [isConverting, setIsConverting] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState(false);

  const handleConvert = () => {
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setConversionSuccess(true);
      setTimeout(() => setConversionSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Notification / AI Insight Bar */}
      <div className={cn(
        "bg-primary-navy rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 text-white shadow-lg overflow-hidden relative group",
        isEnterprise && "border border-accent-emerald/30 shadow-accent-emerald/5"
      )}>
        <div className="absolute inset-0 bg-accent-emerald opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-accent-emerald/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-accent-emerald transition-transform group-hover:rotate-12" />
          </div>
          <div>
            <p className="text-xs font-bold leading-tight">
              {isEnterprise ? t('treasury_opt') : t('ai_recommendation')}
            </p>
            <p className="text-[10px] text-white/60">
              {isEnterprise 
                ? 'Consolidated ledger shows $42M idle in non-interest accounts. Optimized allocation could net $1.2M annually.' 
                : 'USD/INR rate is at a 3-month high. Suggested: Convert $5,000 for ₹4,17,000 settlement.'}
            </p>
          </div>
        </div>
        <button className="text-[10px] bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl font-bold transition-all relative z-10 active:scale-95 border border-white/10 hover:border-white/20 shadow-lg shadow-black/5">
          {isEnterprise ? t('execute') : t('review')}
        </button>
      </div>

      {/* Top Cards: 4-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isEnterprise ? (
          <>
            <StatCard label="Total Liquidity" value="$142.8M" change="+1.2%" flag="https://flagcdn.com/us.svg" />
            <StatCard label="Disbursement Vol" value="$28.5M" change="+8.4%" icon={ArrowUpRight} />
            <StatCard label="Risk Exposure" value="Low" change="0.0%" icon={ShieldCheck} />
            <div className="bg-primary-navy p-4 rounded-xl border border-white/10 shadow-sm text-white group hover:border-accent-emerald/50 transition-colors">
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2">Market Sentiment</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight">Bullish</span>
                <span className="text-[10px] font-bold text-accent-emerald">+14%</span>
              </div>
              <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  className="h-full bg-accent-emerald" 
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <StatCard label="INR Balance" value="₹4,28,500.20" flag="https://flagcdn.com/in.svg" change="+4.2%" />
            <StatCard label="EUR Balance" value="€8,902.50" flag="https://flagcdn.com/eu.svg" change="0.0%" />
            <StatCard label="GBP Balance" value="£3,410.00" flag="https://flagcdn.com/gb.svg" change="+0.5%" />
            <div className="bg-white p-4 rounded-xl border border-accent-emerald bg-accent-emerald/5 shadow-sm group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 bg-accent-emerald rounded-full flex items-center justify-center text-white text-[10px] shadow-sm shadow-accent-emerald/20">⏳</div>
                <span className="text-status-amber text-xs font-bold bg-status-amber/10 px-2 py-0.5 rounded-full">Action Req</span>
              </div>
              <div className="text-xs text-gray-400 font-semibold text-[10px] mb-0.5">Pending Settlements</div>
              <div className="text-xl font-bold text-primary-navy tracking-tight">$2,105.80</div>
            </div>
          </>
        )}
      </div>

      {/* Main Grid: 12 Columns */}
      <div className="grid grid-cols-12 gap-6 pb-8">
        {/* Chart Section: Col 8 */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="glass-card rounded-xl p-6 flex flex-col hover:shadow-lg hover:shadow-primary-navy/[0.02] transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-sm text-primary-navy">
                  {isEnterprise ? 'Institutional Cash Flow' : 'Global Volume'}
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {isEnterprise ? 'Aggregate flow across all divisions' : 'Historical performance (Last 30 days)'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-emerald shadow-sm shadow-accent-emerald/30" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Input</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/30" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Output</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-9 h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isEnterprise ? "#6366f1" : "#10B981"} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={isEnterprise ? "#6366f1" : "#10B981"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 600, fill: '#9CA3AF' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 600, fill: '#9CA3AF' }}
                      tickFormatter={(value) => isEnterprise ? `$${value/1000}M` : `$${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold' }}
                      cursor={{ stroke: isEnterprise ? '#6366f1' : '#10B981', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="volume" 
                      stroke={isEnterprise ? "#6366f1" : "#10B981"} 
                      strokeWidth={2.5}
                      fillOpacity={1} 
                      fill="url(#colorVolume)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-12 md:col-span-3 space-y-4">
                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 group">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {isEnterprise ? 'Velocity Index' : 'Top Performer'}
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3 h-3 text-accent-emerald group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-[11px] font-bold text-primary-navy">
                      {isEnterprise ? '92.4 Points' : 'INR settlements'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-accent-emerald tracking-tight">+12.4% MoM</div>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 group">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {isEnterprise ? 'Market Exposure' : 'Success Rate'}
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-3 h-3 text-indigo-500 group-hover:rotate-12 transition-transform" />
                    <span className="text-[11px] font-bold text-primary-navy">
                      {isEnterprise ? '42 Markets' : '98.2% Avg.'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-gray-400 tracking-tight">
                    {isEnterprise ? 'Active treasury flow' : 'Across 12 gateways'}
                  </div>
                </div>
                <button className="w-full py-2.5 bg-primary-navy text-white text-[11px] font-bold rounded-xl active:scale-95 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-navy/10 mt-2">
                  <BarChart3 className="w-4 h-4" />
                  {isEnterprise ? 'Institutional Repo' : 'Full Report'}
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl flex flex-col h-fit overflow-hidden border-gray-100 hover:shadow-lg hover:shadow-primary-navy/[0.02] transition-shadow">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-sm text-primary-navy">
                {isEnterprise ? 'Global Ledger Activity' : t('recent_transactions')}
              </h3>
              <div className="flex items-center gap-4">
                 <button className="text-[10px] font-bold text-gray-400 hover:text-primary-navy transition-colors uppercase tracking-wider">
                   {isEnterprise ? 'Audit Logs' : t('view_all')}
                 </button>
                 <button className="text-[10px] font-bold text-primary-navy relative group uppercase tracking-wider">
                   {isEnterprise ? 'Exceptions' : 'Failed'}
                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-emerald group-hover:w-full transition-all" />
                 </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4">{isEnterprise ? 'Entity / Subsidiary' : 'Recipient'}</th>
                    <th className="px-6 py-4">{t('date')}</th>
                    <th className="px-6 py-4">{t('amount')}</th>
                    <th className="px-6 py-4">{t('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-[11px]">
                  {TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-[10px] uppercase shadow-sm",
                          tx.type === 'in' ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20" : "bg-gray-100 text-gray-700 border border-gray-200"
                        )}>
                          {tx.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-primary-navy">{tx.name}</span>
                          <span className="text-[9px] text-gray-400 font-medium">
                            {isEnterprise ? `Ref: ${tx.id} - ${tx.type.toUpperCase()}` : `TXN-${829202 + parseInt(tx.id)}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-semibold">{tx.date}</td>
                      <td className={cn(
                        "px-6 py-4 font-bold text-[12px]",
                        tx.type === 'in' ? "text-accent-emerald" : "text-primary-navy"
                      )}>
                        {tx.type === 'in' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount), tx.currency)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 text-[9px] font-bold rounded-lg uppercase tracking-wider",
                          tx.status === 'Success' && "bg-accent-emerald/10 text-accent-emerald",
                          tx.status === 'Pending' && "bg-status-amber/10 text-status-amber",
                          tx.status === 'Failed' && "bg-status-red/10 text-status-red"
                        )}>
                          {tx.status === 'Success' ? 'Successful' : tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-gray-50/50 text-center border-t border-gray-100">
               <button className="text-[10px] font-bold text-gray-400 hover:text-primary-navy transition-colors flex items-center justify-center gap-2 w-full">
                 View complete ledger activity
                 <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
          </div>
        </div>

        {/* Side Section: Col 4 */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-sm text-primary-navy">
                  {isEnterprise ? 'Treasury Swaps' : 'Currency Converter'}
                </h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Real-time Rates</p>
              </div>
              <div className="flex items-center gap-1.5 bg-accent-emerald/5 px-2 py-1 rounded-lg">
                <div className="w-1.5 h-1.5 bg-accent-emerald rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-accent-emerald uppercase tracking-wider">Live</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 group focus-within:border-accent-emerald/50 focus-within:ring-4 focus-within:ring-accent-emerald/5 transition-all">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">From Account</label>
                  <span className="text-[9px] font-bold text-accent-emerald uppercase">Rate: 1.0000</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <input 
                    type="text" 
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-transparent font-bold text-xl focus:outline-none w-full text-primary-navy" 
                  />
                  <div className="relative shrink-0">
                    <select 
                      value={fromCurrency.code}
                      onChange={(e) => setFromCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    >
                      {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                    <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
                      <img src={fromCurrency.flag} className="w-4 h-4 rounded-full object-cover shadow-sm" alt={fromCurrency.code} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary-navy">{fromCurrency.code}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center -my-3 relative z-10">
                <button 
                  onClick={handleSwap}
                  className="bg-primary-navy text-white w-9 h-9 rounded-2xl flex items-center justify-center text-xs shadow-xl border-4 border-white hover:scale-110 active:scale-95 transition-all hover:rotate-180"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 group transition-all">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">To Account</label>
                  <span className="text-[9px] font-bold text-accent-emerald uppercase">Rate: { (toCurrency.rate / fromCurrency.rate).toFixed(4) }</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <input type="text" value={toAmountCalculated} className="bg-transparent font-bold text-xl focus:outline-none w-full text-primary-navy opacity-70" readOnly />
                  <div className="relative shrink-0">
                    <select 
                      value={toCurrency.code}
                      onChange={(e) => setToCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    >
                      {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                    <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
                      <img src={toCurrency.flag} className="w-4 h-4 rounded-full object-cover shadow-sm" alt={toCurrency.code} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary-navy">{toCurrency.code}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleConvert}
              disabled={isConverting}
              className={cn(
                "w-full mt-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2",
                conversionSuccess ? "bg-accent-emerald text-white shadow-accent-emerald/20" : 
                isConverting ? "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed" : 
                "bg-primary-navy text-white shadow-primary-navy/10 hover:bg-primary-navy/90 hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              {isConverting ? (
                <>
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : conversionSuccess ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Successfully Swapped
                </>
              ) : (
                isEnterprise ? 'Queue Institutional Swap' : 'Execute Conversion'
              )}
            </button>
          </div>

          <div className="bg-primary-navy p-6 rounded-xl border border-white/5 shadow-xl space-y-5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 bg-accent-emerald/10 blur-[80px] rounded-full group-hover:bg-accent-emerald/20 transition-all" />
             <div className="flex items-center justify-between relative z-10">
               <h3 className="font-bold text-sm text-white">Institutional Security</h3>
               <ShieldCheck className="w-5 h-5 text-accent-emerald" />
             </div>
             <div className="space-y-4 relative z-10">
               <div className="flex items-center justify-between">
                 <span className="text-[11px] text-white/50 font-medium tracking-tight">Compliance Audit</span>
                 <span className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest bg-accent-emerald/10 px-2 py-0.5 rounded-full">Active</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[11px] text-white/50 font-medium tracking-tight">Global Sanctions Check</span>
                 <span className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest bg-accent-emerald/10 px-2 py-0.5 rounded-full">Cleared</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[11px] text-white/50 font-medium tracking-tight">System Integrity</span>
                 <span className="text-[10px] font-bold text-white uppercase tabular-nums">98.2%</span>
               </div>
               <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "98.2%" }}
                   className="bg-accent-emerald h-full shadow-[0_0_8px_rgba(0,200,151,0.5)]" 
                 />
               </div>
             </div>
             <button className="w-full py-2 border border-white/10 rounded-lg text-white/40 text-[9px] font-bold uppercase tracking-widest hover:text-white hover:border-white/20 transition-all mt-2">
               Download Compliance Logs
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, flag, change, icon: Icon }: { label: string; value: string; flag?: string; change: string; icon?: any }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-accent-emerald/30 transition-all group cursor-default relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent-emerald/5 blur-2xl rounded-full translate-x-8 -translate-y-8 group-hover:bg-accent-emerald/10 transition-all" />
      
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="w-9 h-9 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm shrink-0 flex items-center justify-center group-hover:bg-primary-navy transition-colors">
          {flag ? (
            <img src={flag} className="w-full h-full object-cover scale-150 group-hover:opacity-80" alt={label} />
          ) : Icon ? (
            <Icon className="w-4.5 h-4.5 text-accent-emerald group-hover:text-white transition-colors" />
          ) : (
             <TrendingUp className="w-4.5 h-4.5 text-accent-emerald group-hover:text-white transition-colors" />
          )}
        </div>
        <span className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded-lg transition-all group-hover:scale-110",
          change.startsWith('+') ? "bg-accent-emerald/10 text-accent-emerald" : change === '0.0%' ? "bg-gray-50 text-gray-400" : "bg-status-red/10 text-status-red"
        )}>
          {change}
        </span>
      </div>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 relative z-10">{label}</p>
      <h3 className="text-xl font-bold tracking-tight text-primary-navy leading-none relative z-10 group-hover:translate-x-1 transition-transform">{value}</h3>
    </div>
  );
}
