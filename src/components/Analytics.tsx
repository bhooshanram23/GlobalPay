import { Download, FileText, Filter, MoreHorizontal, Calendar } from 'lucide-react';
import { UserMode } from '../App';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Cell
} from 'recharts';

const REVENUE_DATA = [
  { month: 'May', inr: 450000, usd: 5200 },
  { month: 'Jun', inr: 520000, usd: 4800 },
  { month: 'Jul', inr: 480000, usd: 6100 },
  { month: 'Aug', inr: 610000, usd: 5900 },
  { month: 'Sep', inr: 590000, usd: 7200 },
  { month: 'Oct', inr: 720000, usd: 8400 },
];

const COUNTRY_REVENUE = [
  { country: 'United States', amount: 45200, color: '#0B1F3A' },
  { country: 'Germany', amount: 32100, color: '#00C897' },
  { country: 'United Kingdom', amount: 28400, color: '#F59E0B' },
  { country: 'Singapore', amount: 15600, color: '#6366F1' },
];

interface AnalyticsProps {
  userMode: UserMode;
}

export function Analytics({ userMode }: AnalyticsProps) {
  const isEnterprise = userMode === 'enterprise';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-navy mb-1 tracking-tight">Financial Analytics</h1>
          <p className="text-gray-500 text-sm">Deep dive into your global revenue and conversion impact.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary-navy rounded-xl hover:bg-primary-navy/90 shadow-sm shadow-primary-navy/20 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Revenue (YTD)" value="$245,800.00" change="+18.2%" trend="up" />
        <StatCard label="Avg. Order Value" value="$1,240.50" change="+5.4%" trend="up" />
        <StatCard label="FX Win/Loss" value="+$4,230.12" change="+1.2%" trend="up" />
        <StatCard label="Wait Time (Avg)" value="2.4 Hours" change="-15%" trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold font-display text-primary-navy">Revenue Growth</h3>
              <p className="text-xs text-gray-400 font-medium">Monthly revenue in EUR vs INR settlements</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-navy rounded-full" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">INR</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent-emerald rounded-full" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">INR</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorUsd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1F3A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B1F3A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C897" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00C897" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF', dy: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#fff',
                    padding: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                  labelStyle={{ fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px', color: '#9CA3AF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usd" 
                  stroke="#0B1F3A" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsd)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="inr" 
                  stroke="#00C897" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorInr)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown by Country */}
        <div className="glass-card rounded-2xl p-8 flex flex-col">
          <h3 className="text-lg font-bold font-display text-primary-navy mb-2">Revenue by Region</h3>
          <p className="text-xs text-gray-400 font-medium mb-8">Performance across top 4 markets</p>
          
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COUNTRY_REVENUE} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="country" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 500, fill: '#4B5563' }}
                  width={100}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {COUNTRY_REVENUE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
             {COUNTRY_REVENUE.map((item) => (
               <div key={item.country} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-sm font-medium text-gray-600">{item.country}</span>
                 </div>
                 <span className="text-sm font-bold text-primary-navy">${item.amount.toLocaleString()}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {isEnterprise && (
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-primary-navy">Audit Logs & Reports</h3>
              <p className="text-xs text-gray-400 font-medium tracking-wide">Enterprise-grade reporting for tax compliance</p>
            </div>
            <button className="text-accent-emerald font-bold text-sm hover:underline">View All Records</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportItem title="GST Return Data" type="Tax Filing" date="Oct 2023" />
            <ReportItem title="FIRC Monthly Statement" type="Regulatory" date="Sep 2023" />
            <ReportItem title="Quarterly Growth Audit" type="Business" date="Q3 2023" />
            <ReportItem title="Currency Exposure Risk" type="Risk Management" date="Live" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function StatCard({ label, value, change, trend }: { label: string; value: string; change: string; trend: 'up' | 'down' }) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold font-display text-primary-navy">{value}</h4>
        <span className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded",
          trend === 'up' ? "text-status-green bg-status-green/10" : "text-status-red bg-status-red/10"
        )}>
          {change}
        </span>
      </div>
    </div>
  );
}

function ReportItem({ title, type, date }: { title: string; type: string; date: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
          <FileText className="w-5 h-5 text-primary-navy" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary-navy leading-none mb-1">{title}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">{type}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">{date}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-accent-emerald transition-colors">
          <Download className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-primary-navy transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
