import React, { useState } from 'react';
import { Coffee, Heart, X, Check, Sparkles } from 'lucide-react';
import { DONATION_URL } from '../../utils/config';

export function TipJarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSupport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
    }, 2500);
  };

  const amountToPay = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  return (
    <>
      {/* Floating Sticky Tip Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 border border-amber-300/40"
      >
        <Coffee className="w-4 h-4" />
        <span>Buy Us a Coffee</span>
      </button>

      {/* Support Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-2xl relative text-slate-900 dark:text-slate-100 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-xl font-extrabold">Thank You for Your Support!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                  Your contribution keeps OmniTool 100% free, private, and zero-cost for creators worldwide.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">Support Independent Web Tools</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Zero backend tracking. 100% Client-Side. Free forever.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSupport} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Select Coffee Tier
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[3, 5, 10].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-3 px-3 rounded-xl border text-center transition-all ${
                            selectedAmount === amt && !customAmount
                              ? 'bg-amber-500 text-white border-amber-500 font-bold shadow-md shadow-amber-500/20'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 font-semibold hover:border-amber-400'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Or Custom Amount ($)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="e.g. 25"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={amountToPay <= 0}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-md shadow-amber-500/20 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Send ${amountToPay || 0} Support</span>
                    </button>

                    <a
                      href={DONATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                    >
                      <Coffee className="w-4 h-4 text-amber-500" />
                      <span>Open Official Buy Me a Coffee Page ➔</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 Secure client checkout • Zero account required
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
