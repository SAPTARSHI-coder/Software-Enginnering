'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import { AlertTriangle, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export function AlertsView() {
  const { alerts, products, createPurchaseOrder, dismissAlert } = useStock();

  const handleQuickPO = (productId: string, productName: string, supplierId: string, supplierName: string, price: number) => {
    createPurchaseOrder({
      supplierId,
      supplierName,
      productId,
      productName,
      quantity: 30,
      unitPrice: price,
      totalCost: 30 * price,
      expectedDelivery: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes: 'Automated 1-click requisition raised from Reorder Radar view',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Safety Reorder Radar & Alarms
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Active warning triggers for SKUs whose on-hand balances have breached minimum buffer thresholds.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-950 text-red-300 border border-red-500/40 text-xs font-mono font-bold">
          {alerts.length} Active Alerts
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#10151E] border border-white/10 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-white">All Stock Levels Optimal</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Zero SKUs currently breach minimum safety thresholds. The inventory buffer is healthy.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((a) => {
            const product = products.find((p) => p.id === a.productId);
            const isCritical = a.currentQuantity === 0;

            return (
              <div
                key={a.id}
                className={`p-5 rounded-2xl border shadow-xl space-y-4 flex flex-col justify-between ${
                  isCritical
                    ? 'bg-[#1D0D10] border-red-500/60'
                    : 'bg-[#181510] border-amber-500/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-5 h-5 ${isCritical ? 'text-red-400' : 'text-amber-400'}`}
                      />
                      <h4 className="text-sm font-bold text-white leading-tight">{a.productName}</h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                        isCritical
                          ? 'bg-red-950 text-red-300 border border-red-500/50'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                      }`}
                    >
                      {isCritical ? 'Critical Depletion' : 'Low Buffer'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-gray-400 block text-[10px]">On-Hand Physical Stock</span>
                      <span className="text-lg font-mono font-black text-white">{a.currentQuantity} units</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-gray-400 block text-[10px]">Safety Reorder Target</span>
                      <span className="text-lg font-mono font-bold text-[#F8DA96]">{a.reorderLevel} units</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => dismissAlert(a.id)}
                    className="text-xs text-gray-400 hover:text-white transition"
                  >
                    Dismiss Warning
                  </button>

                  {product && (
                    <button
                      onClick={() =>
                        handleQuickPO(
                          product.id,
                          product.name,
                          product.supplierId,
                          product.supplierName,
                          product.price
                        )
                      }
                      className="px-3.5 py-1.5 rounded-xl bg-[#992B15] hover:bg-[#B83A1B] text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Issue Replenishment PO</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
