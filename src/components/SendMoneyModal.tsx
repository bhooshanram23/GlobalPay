import { X, ChevronRight, Check, Info, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn, formatCurrency } from '../lib/utils';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'EU', name: 'Eurozone', currency: 'EUR', flag: '🇪🇺' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', flag: '🇸🇬' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
];

export function SendMoneyModal({ isOpen, onClose }: SendMoneyModalProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('1000');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [loading, setLoading] = useState(false);

  const exchangeRate = 83.42;
  const convertedAmount = parseFloat(amount || '0') * exchangeRate;
  const fee = 1.5;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onClose();
        setStep(1);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary-navy/60 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-primary-navy">Send Global Payment</h3>
            <p className="text-xs text-gray-400 font-medium">Step {step} of 4: {getStepTitle(step)}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-xl transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-primary-navy" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Recipient Country</label>
                    <div className="grid grid-cols-2 gap-3">
                      {COUNTRIES.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => setSelectedCountry(country)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border transition-all",
                            selectedCountry.code === country.code 
                              ? "bg-accent-emerald/5 border-accent-emerald ring-1 ring-accent-emerald" 
                              : "bg-gray-50 border-transparent hover:border-gray-200"
                          )}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-xs font-bold text-primary-navy">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Amount to Send</label>
                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-transparent focus-within:border-accent-emerald transition-all">
                       <span className="text-2xl font-bold text-primary-navy">{selectedCountry.flag}</span>
                       <input 
                         type="number"
                         value={amount}
                         onChange={(e) => setAmount(e.target.value)}
                         className="flex-1 bg-transparent border-none outline-none px-4 text-2xl font-bold font-display text-primary-navy"
                         placeholder="0.00"
                       />
                       <span className="text-sm font-bold text-gray-400 pr-2">{selectedCountry.currency}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-medium">You send</span>
                      <span className="text-sm font-bold text-primary-navy">{amount} {selectedCountry.currency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-medium">Exchange rate</span>
                      <span className="text-sm font-bold text-accent-emerald">1 {selectedCountry.currency} = ₹{exchangeRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-medium">GlobalPay Fee (1.5%)</span>
                      <span className="text-sm font-bold text-primary-navy">${(parseFloat(amount) * 0.015).toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary-navy">Recipient gets</span>
                      <span className="text-lg font-bold text-status-green">₹{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-accent-emerald/5 rounded-xl border border-accent-emerald/10 items-start">
                    <ShieldCheck className="w-5 h-5 text-accent-emerald shrink-0" />
                    <p className="text-xs text-gray-600 leading-normal">
                      Rates are locked for the next 15 minutes. Our transparent fee structure ensures there are no hidden costs during the settlement.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Recipient Name</label>
                  <input type="text" placeholder="Full Legal Name" className="w-full bg-gray-50 p-4 rounded-xl text-sm font-medium border-transparent focus:border-accent-emerald transition-all outline-none" />
                  
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Bank Account Number / IBAN</label>
                  <input type="text" placeholder="Enter Account Details" className="w-full bg-gray-50 p-4 rounded-xl text-sm font-medium border-transparent focus:border-accent-emerald transition-all outline-none" />
                  
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">SWIFT / BIC Code</label>
                  <input type="text" placeholder="Optional" className="w-full bg-gray-50 p-4 rounded-xl text-sm font-medium border-transparent focus:border-accent-emerald transition-all outline-none" />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                   <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-3xl">
                     <div className="w-20 h-20 bg-accent-emerald/10 rounded-full flex items-center justify-center mb-4">
                       <Check className="w-10 h-10 text-accent-emerald" />
                     </div>
                     <h4 className="text-xl font-bold font-display text-primary-navy mb-2">Ready to Confirm</h4>
                     <p className="text-gray-500 text-sm mb-6">Please review the details before finalizing the transfer. This action cannot be undone once confirmed.</p>
                     
                     <div className="w-full space-y-3">
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-500 font-medium tracking-wide">Beneficiary</span>
                         <span className="font-bold text-primary-navy">TechCorp Solutions</span>
                       </div>
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-500 font-medium tracking-wide">Settlement Amount</span>
                         <span className="font-bold text-primary-navy">₹{(convertedAmount).toLocaleString()}</span>
                       </div>
                     </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
           <button 
             onClick={() => step > 1 ? setStep(step - 1) : onClose()}
             className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-primary-navy transition-colors"
           >
             {step === 1 ? 'Cancel' : 'Back'}
           </button>
           
           <button 
             onClick={handleNext}
             disabled={loading}
             className={cn(
               "flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg",
               step === 4 
                ? "bg-accent-emerald text-primary-navy shadow-accent-emerald/20" 
                : "bg-primary-navy text-white shadow-primary-navy/20",
               loading && "opacity-50 cursor-not-allowed"
             )}
           >
             {loading ? 'Processing...' : (
               <>
                 {step === 4 ? 'Confirm Payment' : 'Continue'}
                 <ChevronRight className="w-4 h-4 ml-1" />
               </>
             )}
           </button>
        </div>
      </motion.div>
    </div>
  );
}

function getStepTitle(step: number) {
  switch(step) {
    case 1: return 'Currency';
    case 2: return 'FX Review';
    case 3: return 'Beneficiary';
    case 4: return 'Confirmation';
    default: return '';
  }
}
