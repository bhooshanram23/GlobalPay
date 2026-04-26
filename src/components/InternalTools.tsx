import { Settings, ShieldCheck, Terminal, Heart, Zap, Globe, Github, Info, Search, FileText, Code2, Key, BellRing, Database, ChevronRight, User } from 'lucide-react';
import { View } from '../App';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface InternalToolsProps {
  currentView: View;
}

export function InternalTools({ currentView }: InternalToolsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display capitalize">{currentView}</h1>
          <p className="text-xs text-gray-500 font-medium">Control center for technical configuration and compliance.</p>
        </div>
        <div className="flex gap-2">
           <button className="p-2 border border-gray-100 rounded-lg hover:bg-white transition-colors text-gray-400 hover:text-primary-navy">
             <Info className="w-4 h-4" />
           </button>
        </div>
      </div>

      {currentView === 'developers' && <DevelopersContent />}
      {currentView === 'compliance' && <ComplianceContent />}
      {currentView === 'settings' && <SettingsContent />}
      {currentView === 'ai-insights' && <AiInsightsContent />}
    </motion.div>
  );
}

function DevelopersContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">API Keys</h3>
              <button className="text-[10px] font-bold bg-primary-navy text-white px-3 py-1.5 rounded-lg uppercase tracking-wider">Generate Key</button>
           </div>
           
           <div className="space-y-4">
             <KeyRow label="Publishable Key" value="pk_test_829202_global_inr" />
             <KeyRow label="Secret Key" value="sk_test_••••••••••••••••••••" secret />
           </div>
        </div>

        <div className="glass-card rounded-xl p-6">
           <h3 className="font-bold text-sm mb-4">Request Logs</h3>
           <div className="space-y-2">
             <LogItem method="POST" path="/v1/payouts" status="200" time="124ms" />
             <LogItem method="GET" path="/v1/balances" status="200" time="42ms" />
             <LogItem method="POST" path="/v1/payment_links" status="201" time="310ms" />
             <LogItem method="POST" path="/v1/beneficiaries" status="400" time="89ms" />
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-primary-dark rounded-xl p-6 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <Github className="w-20 h-20" />
           </div>
           <h3 className="font-bold text-sm mb-2 relative z-10">Webhooks</h3>
           <p className="text-white/50 text-[11px] mb-6 relative z-10 leading-relaxed font-medium">
             Subscribe to real-time events across our 50+ payment rails.
           </p>
           <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-[11px] font-bold transition-all border border-white/5">
             Add Endpoint
           </button>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-4">
           <div className="flex items-center gap-2 mb-2">
             <Code2 className="w-4 h-4 text-accent-emerald" />
             <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400">Library Support</h4>
           </div>
           <div className="grid grid-cols-2 gap-2">
             {['Node.js', 'Python', 'Go', 'PHP'].map(lang => (
               <div key={lang} className="p-2 bg-gray-50 rounded-lg text-center text-[10px] font-bold text-primary-navy">
                 {lang}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-xl space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">Risk Monitoring</h3>
            <ShieldCheck className="w-5 h-5 text-accent-emerald" />
         </div>
         <div className="space-y-4">
            <ComplianceItem label="KYB Status" status="Verified" date="Oct 12, 2023" />
            <ComplianceItem label="UBO Verification" status="Active" date="Aug 30, 2023" />
            <ComplianceItem label="AML Thresholds" status="Optimal" date="Daily" />
         </div>
      </div>
      <div className="bg-status-red/5 border border-status-red/10 p-6 rounded-xl space-y-4">
         <div className="flex items-center justify-between text-status-red">
            <h3 className="font-bold text-sm">Action Items</h3>
            <AlertCircle className="w-5 h-5" />
         </div>
         <p className="text-xs text-gray-500 font-medium leading-relaxed">
            There is 1 pending dispute from a customer in SG for $142.00. High priority response required by tomorrow to avoid chargeback fees.
         </p>
         <button className="w-full bg-status-red text-white py-2 rounded-lg text-[11px] font-bold shadow-sm hover:bg-status-red/90 transition-all">
           Resolve Dispute
         </button>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="max-w-2xl mx-auto glass-card rounded-xl overflow-hidden divide-y divide-gray-50">
      <SettingRow icon={User} title="Business Profile" desc="Change your corporate identity and registration details." />
      <SettingRow icon={BellRing} title="Notifications" desc="Manage webhook alerts and email payout summaries." />
      <SettingRow icon={Database} title="Data Management" desc="Export all historical records or request deletion." />
      <SettingRow icon={Globe} title="Regional Settings" desc="Configure settlement currencies and default tax IDs." />
    </div>
  );
}

function AiInsightsContent() {
  return (
    <div className="space-y-6">
      <div className="p-8 bg-primary-navy rounded-2xl text-white relative overflow-hidden flex flex-col items-center text-center">
         <div className="absolute inset-0 bg-accent-emerald opacity-5 blur-[100px]" />
         <div className="w-16 h-16 bg-accent-emerald/20 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-accent-emerald/20">
           <Zap className="w-8 h-8 text-accent-emerald" />
         </div>
         <h2 className="text-2xl font-bold font-display mb-2 relative z-10">Smart Routing Engines</h2>
         <p className="text-white/60 text-sm max-w-lg leading-relaxed relative z-10">
           Our AI is currently optimizing your 12 payout rails. Based on real-time network speeds, we've redirected 30% of traffic to faster nodes, reducing average settlement time by 14 minutes.
         </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightBlock title="Fraud Prevention" desc="AI detected and blocked 3 suspicious payout attempts last night." />
        <InsightBlock title="Revenue Forecast" desc="Expected incoming volume for next 7 days: $42,500 (+12% WoW)." />
      </div>
    </div>
  );
}

// Sub-components
function KeyRow({ label, value, secret }: { label: string; value: string; secret?: boolean }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between group">
       <div>
         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
         <p className="text-xs font-mono font-bold text-primary-navy">{value}</p>
       </div>
       <button className="text-[10px] font-bold text-accent-emerald opacity-0 group-hover:opacity-100 transition-all uppercase">Copy</button>
    </div>
  );
}

function LogItem({ method, path, status, time }: { method: string; path: string; status: string; time: string }) {
  return (
    <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 py-2 border-b border-gray-50 last:border-0 hover:text-primary-navy transition-colors cursor-pointer">
       <div className="flex items-center gap-4">
         <span className={cn(
           "font-bold",
           method === 'POST' ? "text-indigo-500" : "text-emerald-500"
         )}>{method}</span>
         <span className="font-mono">{path}</span>
       </div>
       <div className="flex items-center gap-4">
          <span className="font-bold text-accent-emerald">{status}</span>
          <span className="text-gray-400">{time}</span>
       </div>
    </div>
  );
}

function ComplianceItem({ label, status, date }: { label: string; status: string; date: string }) {
  return (
     <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
        <span className="text-[11px] font-bold text-gray-600 tracking-wide uppercase">{label}</span>
        <div className="text-right">
          <p className="text-[10px] font-bold text-accent-emerald uppercase">{status}</p>
          <p className="text-[9px] text-gray-400">{date}</p>
        </div>
     </div>
  );
}

function SettingRow({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
     <div className="p-6 flex items-start gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer group">
        <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-400 group-hover:text-primary-navy group-hover:border-accent-emerald transition-all">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
           <h4 className="font-bold text-sm text-primary-navy mb-1">{title}</h4>
           <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{desc}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 self-center group-hover:text-primary-navy" />
     </div>
  );
}

function InsightBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass-card p-6 rounded-xl border border-gray-100 border-l-4 border-l-accent-emerald">
       <h4 className="font-bold text-sm text-primary-navy mb-2">{title}</h4>
       <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

import { AlertCircle as AlertCircleIcon } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
