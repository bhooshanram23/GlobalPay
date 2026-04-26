import { Puzzle, ArrowRight, ExternalLink, Globe, Key, Webhook, ShoppingBag, Terminal, ShoppingCart, Zap, Box } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const INTEGRATIONS = [
  {
    category: 'E-commerce Platforms',
    items: [
      { id: 'shopify', name: 'Shopify', desc: 'Accept payments on your Shopify store instantly.', icon: ShoppingBag, color: 'text-emerald-600 bg-emerald-50' },
      { id: 'woo', name: 'WooCommerce', desc: 'Powerful checkout for your WordPress store.', icon: ShoppingCart, color: 'text-purple-600 bg-purple-50' },
      { id: 'magento', name: 'Magento', desc: 'Enterprise-grade e-commerce integration.', icon: ShoppingCart, color: 'text-orange-600 bg-orange-50' },
    ]
  },
  {
    category: 'Developer Tools',
    items: [
      { id: 'api', name: 'REST API', desc: 'Build custom flows with our JSON API.', icon: Terminal, color: 'text-primary-navy bg-gray-50' },
      { id: 'webhooks', name: 'Webhooks', desc: 'Get real-time updates for every event.', icon: Webhook, color: 'text-indigo-600 bg-indigo-50' },
      { id: 'sdk', name: 'Client SDKs', desc: 'Native libraries for React, Vue, & Mobile.', icon: Box, color: 'text-blue-600 bg-blue-50' },
    ]
  },
  {
    category: 'Business Apps',
    items: [
      { id: 'zapier', name: 'Zapier', desc: 'Connect to 5,000+ apps without code.', icon: Zap, color: 'text-amber-600 bg-amber-50' },
      { id: 'sheets', name: 'Google Sheets', desc: 'Sink your transactions to spreadsheets.', icon: FileBox, color: 'text-green-600 bg-green-50' },
      { id: 'slack', name: 'Slack', desc: 'Get payment alerts in your team channels.', icon: Zap, color: 'text-rose-600 bg-rose-50' },
    ]
  }
];

import { File as FileBox } from 'lucide-react';

export function Integrations() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display">Integrations & Apps</h1>
          <p className="text-xs text-gray-500 font-medium">Connect GlobalPay to your existing technology stack.</p>
        </div>
        <button className="bg-primary-navy text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 hover:bg-primary-navy/90 active:scale-95 shadow-lg shadow-primary-navy/10">
          <Key className="w-3.5 h-3.5" />
          View API Docs
        </button>
      </div>

      <div className="space-y-12">
        {INTEGRATIONS.map((section) => (
          <div key={section.category} className="space-y-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{section.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {section.items.map((item) => (
                 <div key={item.id} className="glass-card p-6 rounded-2xl group hover:border-accent-emerald transition-all cursor-pointer flex flex-col h-full">
                   <div className="flex justify-between items-start mb-6">
                     <div className={cn("p-3 rounded-xl transition-colors", item.color)}>
                       <item.icon className="w-5 h-5" />
                     </div>
                     <div className="p-1.5 rounded-full bg-gray-50 text-gray-300 group-hover:text-accent-emerald transition-colors">
                       <ExternalLink className="w-3.5 h-3.5" />
                     </div>
                   </div>
                   <h3 className="font-bold text-sm text-primary-navy mb-1.5">{item.name}</h3>
                   <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 flex-1">
                     {item.desc}
                   </p>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-primary-navy uppercase tracking-wider group-hover:text-accent-emerald transition-colors">
                     Configure Integration
                     <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                   </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
         
         <div className="relative z-10 space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
              <Puzzle className="w-3 h-3 text-accent-emerald" />
              Ecosystem Fund
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight">Build your own integration</h2>
            <p className="text-white/60 text-sm max-w-lg leading-relaxed">
              Are you a developer or a SaaS company? Join our partner program and build custom solutions on top of the GlobalPay network.
            </p>
         </div>

         <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-3 bg-white text-indigo-600 font-bold text-xs rounded-xl shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all">
              Apply to Partner
            </button>
            <button className="px-6 py-3 bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              Read Build Guide
            </button>
         </div>
      </div>
    </motion.div>
  );
}
