'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export function ToastNotification() {
  const { toasts, removeToast } = useStock();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isWarning = t.type === 'warning';
        const isError = t.type === 'error';

        const borderColor = isSuccess
          ? 'border-emerald-500/40'
          : isWarning
          ? 'border-amber-500/40'
          : isError
          ? 'border-red-500/40'
          : 'border-[#D49B37]/40';

        const icon = isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : isWarning ? (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        ) : isError ? (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        ) : (
          <Info className="w-5 h-5 text-[#F8DA96] shrink-0 mt-0.5" />
        );

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl bg-[#121822] border ${borderColor} shadow-2xl flex items-start gap-3 transition transform animate-in slide-in-from-bottom-5 duration-300`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white">{t.title}</h4>
              <p className="text-xs text-gray-300 mt-0.5 line-clamp-2">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-white transition p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
