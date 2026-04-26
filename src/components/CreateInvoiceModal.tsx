import React, { useState, useMemo } from 'react';
import { X, Plus, Trash2, Send, Download, Calculator, Calendar as CalendarIcon, User, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (invoice: any) => void;
}

export function CreateInvoiceModal({ isOpen, onClose, onSuccess }: CreateInvoiceModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ]);
  const [isSending, setIsSending] = useState(false);

  const subtotal = useMemo(() => {
    return lineItems.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  }, [lineItems]);

  const tax = subtotal * 0.15; // 15% flat tax for demo
  const total = subtotal + tax;

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, rate: 0 }]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSend = () => {
    if (!customerName || !dueDate || lineItems.some(item => !item.description)) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      onSuccess({
        id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        customer: customerName,
        amount: total,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' }),
        status: 'Sent'
      });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-navy/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-primary-navy tracking-tight">Create Professional Invoice</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">New Billing Record</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-primary-navy uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Customer Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1 ml-1">Company Name</label>
                      <input 
                        type="text" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent-emerald focus:border-accent-emerald outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="billing@acme.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent-emerald focus:border-accent-emerald outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-primary-navy uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3" />
                    Invoice Settings
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1 ml-1">Due Date</label>
                      <input 
                        type="date" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent-emerald focus:border-accent-emerald outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1 ml-1">Currency</label>
                      <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none font-medium">
                        <option>INR - Indian Rupee</option>
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-primary-navy uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Plus className="w-3 h-3" />
                  Line Items
                </h3>
                <div className="space-y-3">
                  {lineItems.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-12 gap-3 items-center"
                    >
                      <div className="col-span-12 md:col-span-6">
                        <input 
                          type="text" 
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:bg-white transition-all outline-none"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <input 
                          type="number" 
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:bg-white transition-all outline-none text-center"
                        />
                      </div>
                      <div className="col-span-5 md:col-span-3">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                          <input 
                            type="number" 
                            placeholder="Rate"
                            value={item.rate}
                            onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-6 pr-4 py-2 text-sm focus:bg-white transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 md:col-span-1 flex justify-end">
                        <button 
                          onClick={() => removeLineItem(item.id)}
                          className="p-2 text-gray-300 hover:text-status-red transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  <button 
                    onClick={addLineItem}
                    className="flex items-center gap-2 text-[10px] font-bold text-accent-emerald uppercase tracking-widest hover:translate-x-1 transition-all mt-4 ml-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Another Item
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col items-end pt-6 border-t border-gray-100">
                <div className="w-full md:w-80 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-primary-navy">{formatCurrency(subtotal, 'INR')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Sales Tax (15%)</span>
                    <span className="font-bold text-primary-navy">{formatCurrency(tax, 'INR')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
                    <span className="font-bold text-primary-navy">Total Amount</span>
                    <span className="text-xl font-bold text-accent-emerald tracking-tight">{formatCurrency(total, 'INR')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <button 
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-navy transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Preview PDF
              </button>
              <div className="flex items-center gap-4">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSend}
                  disabled={isSending}
                  className={cn(
                    "bg-primary-navy text-white px-8 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95",
                    isSending && "opacity-50 cursor-not-allowed scale-100"
                  )}
                >
                  {isSending ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Finalize & Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
