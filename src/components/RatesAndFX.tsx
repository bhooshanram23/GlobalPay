import { ArrowRightLeft, TrendingUp, TrendingDown, Clock, Search, Filter, ArrowRight, RefreshCw, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RATES = [
  { pair: 'USD/INR', rate: 83.2450, change: '+0.12%', trend: 'up' },
  { pair: 'EUR/INR', rate: 89.1240, change: '-0.05%', trend: 'down' },
  { pair: 'GBP/INR', rate: 102.4500, change: '+0.25%', trend: 'up' },
  { pair: 'SGD/INR', rate: 61.2300, change: '+0.08%', trend: 'up' },
  { pair: 'AED/INR', rate: 22.6500, change: '-0.02%', trend: 'down' },
  { pair: 'USD/EUR', rate: 0.9324, change: '-0.15%', trend: 'down' },
];

const FOREX_HISTORY = [
  { time: '09:00', rate: 83.15 },
  { time: '10:00', rate: 83.22 },
  { time: '11:00', rate: 83.18 },
  { time: '12:00', rate: 83.28 },
  { time: '13:00', rate: 83.24 },
  { time: '14:00', rate: 83.26 },
  { time: '15:00', rate: 83.25 },
];

export function RatesAndFX() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display">Exchange Rates & FX</h1>
          <p className="text-xs text-gray-500 font-medium">Real-time interbank rates for your global settlements.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider">
           <Clock className="w-3 h-3" />
           Last Updated: Just Now
           <RefreshCw className="w-2.5 h-2.5 ml-2 text-accent-emerald animate-spin-slow" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Ticker */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {RATES.map((rate) => (
            <div key={rate.pair} className="glass-card p-4 rounded-xl flex flex-col justify-between hover:border-accent-emerald transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rate.pair}</span>
                <span className={cn(
                  "text-[9px] font-bold px-1.5 py-0.5 rounded",
                  rate.trend === 'up' ? "bg-status-green/10 text-status-green" : "bg-status-red/10 text-status-red"
                )}>
                  {rate.change}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <h4 className="text-lg font-bold text-primary-navy leading-none font-mono">{rate.rate.toFixed(4)}</h4>
                <div className={cn(
                  "p-1 rounded-full group-hover:scale-110 transition-transform",
                  rate.trend === 'up' ? "bg-status-green/10 text-status-green" : "bg-status-red/10 text-status-red"
                )}>
                  {rate.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currency Converter Quick Tool */}
        <div className="lg:col-span-4 glass-card p-6 rounded-xl flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <ArrowRightLeft className="w-24 h-24 text-primary-navy" />
           </div>
           <h3 className="font-bold text-sm text-primary-navy mb-4">Quick Converter</h3>
           <div className="space-y-4 relative z-10">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">You send</label>
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-3">
                   <input type="number" defaultValue="1000" className="bg-transparent text-sm font-bold text-primary-navy outline-none flex-1 font-mono" />
                   <span className="text-[11px] font-bold text-primary-navy ml-2">USD</span>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-20">
                 <button className="w-8 h-8 bg-primary-navy text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                   <ArrowRightLeft className="w-3.5 h-3.5" />
                 </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">They receive</label>
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-3">
                   <div className="text-sm font-bold text-primary-navy flex-1 font-mono">83,245.00</div>
                   <span className="text-[11px] font-bold text-primary-navy ml-2">INR</span>
                </div>
              </div>

              <button className="w-full py-3 bg-accent-emerald text-primary-navy font-bold text-xs rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-emerald/10">
                Execute Conversion
              </button>
           </div>
        </div>

        {/* Detailed Chart */}
        <div className="lg:col-span-12 glass-card rounded-xl p-6 flex flex-col h-[300px]">
           <div className="flex items-center justify-between mb-6">
             <div>
               <h3 className="font-bold text-sm text-primary-navy">USD/INR Mid-Market Rate</h3>
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Intraday performance (GMT+5:30)</p>
             </div>
             <button className="text-[10px] font-bold text-primary-navy border border-gray-100 px-3 py-1 rounded-lg hover:bg-gray-50 uppercase tracking-wider">Historical Data</button>
           </div>
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={FOREX_HISTORY}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B1F3A" stopOpacity={0.05}/>
                      <stop offset="95%" stopColor="#0B1F3A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF' }}
                    domain={['dataMin - 0.05', 'dataMax + 0.05']}
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="rate" stroke="#0B1F3A" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="p-4 bg-primary-navy text-white rounded-xl flex gap-6 items-center border border-white/10 relative overflow-hidden group">
         <div className="absolute inset-0 bg-accent-emerald opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
         <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
           <Info className="w-6 h-6 text-accent-emerald" />
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-xs mb-0.5">FX Buffer Notice</h4>
            <p className="text-white/50 text-[10px] leading-relaxed max-w-2xl">
              GlobalPay applies a 0.25% spread to the mid-market rate to cover interbank liquidity risk. Enterprise users can negotiate custom spreads based on monthly volume.
            </p>
         </div>
         <button className="px-4 py-2 bg-white/10 text-[10px] font-bold rounded-lg hover:bg-white/20 transition-all uppercase tracking-widest shrink-0">Contact Account Manager</button>
      </div>
    </motion.div>
  );
}
