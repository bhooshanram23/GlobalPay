import { X, Globe, CreditCard, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Lock, Copy, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { QRCodeSVG } from 'qrcode.react';

interface CreatePaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePaymentLinkModal({ isOpen, onClose }: CreatePaymentLinkModalProps) {
  const [step, setStep] = useState(1);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    currency: 'INR',
    type: 'fixed', // 'fixed' or 'flexible'
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const paymentUrl = `https://buy.globalpay.com/${formData.title.toLowerCase().replace(/\s+/g, '-') || 'link-829'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-primary-navy/40 backdrop-blur-sm flex items-center justify-center p-4" 
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-emerald/10 rounded-xl flex items-center justify-center text-accent-emerald">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-navy text-base">Create Payment Link</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {step} of 3 • Configuration</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-primary-navy">
                  <X className="w-5 h-5" />
                </button>
              </div>

          <div className="p-8 space-y-6">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Q3 Consulting Milestone" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-primary-navy outline-none focus:ring-2 focus:ring-accent-emerald/20 transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Currency</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-primary-navy outline-none"
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    >
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Amount</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                       <input 
                         type="number" 
                         placeholder="0.00" 
                         className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 text-sm font-bold text-primary-navy outline-none"
                         value={formData.amount}
                         onChange={(e) => setFormData({...formData, amount: e.target.value})}
                       />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent-emerald/5 rounded-2xl border border-accent-emerald/10 flex gap-4">
                  <Globe className="w-5 h-5 text-accent-emerald shrink-0" />
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    This link will automatically support local payment methods for your customers in 50+ countries.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Payment Options</label>
                  <OptionToggle 
                    title="Fixed Amount" 
                    desc="Customers pay a specific price set by you."
                    active={formData.type === 'fixed'}
                    onClick={() => setFormData({...formData, type: 'fixed'})}
                  />
                  <OptionToggle 
                    title="Allow Qty Change" 
                    desc="Customers can choose how many items they want."
                    active={formData.type === 'fixed-qty'}
                    onClick={() => setFormData({...formData, type: 'fixed-qty'})}
                  />
                  <OptionToggle 
                    title="Pay What You Want" 
                    desc="Great for tips or custom donations."
                    active={formData.type === 'flexible'}
                    onClick={() => setFormData({...formData, type: 'flexible'})}
                  />
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PCI-DSS Compliant Rails</span>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="w-16 h-16 bg-accent-emerald/10 rounded-full flex items-center justify-center text-accent-emerald mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-primary-navy mb-2">Ready to publish!</h4>
                <p className="text-xs text-gray-500 max-w-sm leading-relaxed mb-6">
                  Your payment link for <span className="font-bold text-primary-navy">"{formData.title || 'Product'}"</span> is ready. Once published, you can share the URL anywhere.
                </p>
                
                <div className="w-full space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 border-dashed group">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sharable Endpoint</p>
                    <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-100">
                      <code className="text-xs font-mono text-primary-navy overflow-hidden text-ellipsis whitespace-nowrap">
                        {paymentUrl}
                      </code>
                      <button className="p-2 bg-gray-50 text-gray-400 hover:text-accent-emerald rounded-lg transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {!showQR ? (
                      <button 
                        onClick={() => setShowQR(true)}
                        className="text-[10px] font-bold text-primary-navy/60 hover:text-primary-navy transition-colors flex items-center gap-2 uppercase tracking-widest"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        Generate QR Code
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3"
                      >
                        <QRCodeSVG value={paymentUrl} size={120} level="H" />
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Scan to Pay</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="px-6 py-2.5 text-xs font-bold text-gray-500 hover:text-primary-navy transition-colors"
              >
                Back
              </button>
            ) : <div />}
            
            <button 
              onClick={step === 3 ? onClose : handleNext}
              className="bg-primary-navy text-white px-8 py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary-navy/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {step === 3 ? 'Publish Link' : 'Next Step'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
    </AnimatePresence>
  );
}

function OptionToggle({ title, desc, active, onClick }: { title: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
        active ? "border-accent-emerald bg-accent-emerald/5" : "border-gray-100 bg-white hover:border-gray-200"
      )}
    >
      <div>
        <p className={cn("text-xs font-bold mb-0.5", active ? "text-primary-navy" : "text-gray-600")}>{title}</p>
        <p className="text-[10px] text-gray-400 font-medium">{desc}</p>
      </div>
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
        active ? "border-accent-emerald bg-accent-emerald" : "border-gray-200"
      )}>
        {active && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
    </div>
  );
}
