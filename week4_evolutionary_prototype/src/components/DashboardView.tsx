'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import {
  Boxes,
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  FileSpreadsheet,
} from 'lucide-react';

export function DashboardView() {
  const { stats, products, movements, alerts, setActiveTab, createPurchaseOrder } = useStock();

  const handleQuickReorder = (productId: string, productName: string, supplierId: string, supplierName: string, price: number) => {
    createPurchaseOrder({
      supplierId,
      supplierName,
      productId,
      productName,
      quantity: 25,
      unitPrice: price,
      totalCost: 25 * price,
      expectedDelivery: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes: 'Automated 1-click emergency reorder from dashboard',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-[#131922] border border-[#D49B37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Executive Inventory Telemetry
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Operational snapshot across warehouse storage bins, active purchase orders, and supplier dispatches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className="px-4 py-2 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Stock</span>
          </button>
          <button
            onClick={() => setActiveTab('purchase-orders')}
            className="px-4 py-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#D49B37]" />
            <span>View POs</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#121822] border border-[#D49B37]/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#F8DA96] font-semibold mb-2">
            <span>Total Catalog Items</span>
            <Boxes className="w-4 h-4 text-[#D49B37]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white">{stats.totalItems}</span>
            <span className="text-xs text-emerald-400 font-semibold">{stats.totalQuantity} total units</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Across 5 distinct product categories
          </p>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#121822] border border-emerald-500/40 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
            <span>Gross Inventory Valuation</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white">
              ₹{stats.totalValuation.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Asset value based on moving unit cost
          </p>
        </div>

        {/* KPI 3 */}
        <div
          onClick={() => setActiveTab('alerts')}
          className={`p-5 rounded-2xl border shadow-xl cursor-pointer transition hover:scale-[1.02] ${
            stats.lowStockCount > 0 || stats.outOfStockCount > 0
              ? 'bg-[#1C1013] border-red-500/50'
              : 'bg-[#121822] border-white/10'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-red-400 font-semibold mb-2">
            <span>Reorder Radar Warnings</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-red-400">
              {stats.lowStockCount + stats.outOfStockCount}
            </span>
            <span className="text-xs text-red-300">
              ({stats.outOfStockCount} critical out-of-stock)
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Breached safety replenishment threshold
          </p>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#121822] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between text-xs text-gray-300 font-semibold mb-2">
            <span>Pending Purchase Orders</span>
            <Clock className="w-4 h-4 text-[#D49B37]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white">{stats.pendingOrdersCount}</span>
            <span className="text-xs text-gray-400">active requisitions</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Inbound vendor fulfillment pipeline
          </p>
        </div>
      </div>

      {/* 2-Column Content: Stock Movements Audit & Critical Reorder Radar */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left Column: Recent Stock Movements Audit */}
        <div className="w-full xl:flex-[1.8] min-w-0 rounded-2xl bg-[#10151E] border border-white/10 p-5 space-y-4 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Recent Transaction Ledger</h3>
              <p className="text-xs text-gray-400">Latest immutable inventory stock audit entries</p>
            </div>
            <button
              onClick={() => setActiveTab('movements')}
              className="text-xs text-[#F8DA96] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Full Audit Log</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151C27] border-b border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Tx ID</th>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Balance</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {movements.slice(0, 6).map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-2.5 px-3 font-mono text-[#F8DA96]">{m.id}</td>
                    <td className="py-2.5 px-3 font-medium text-white">{m.productName}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          m.type === 'IN'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : m.type === 'OUT'
                            ? 'bg-red-950 text-red-300 border border-red-500/30'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {m.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-white">
                      {m.type === 'OUT' ? `-${m.quantity}` : `+${m.quantity}`}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-gray-400">{m.balanceAfter}</td>
                    <td className="py-2.5 px-3 text-gray-400">{m.reason}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-500 text-[11px]">{m.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Reorder Radar Widget */}
        <div className="w-full xl:flex-1 min-w-[320px] rounded-2xl bg-[#10151E] border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Critical Reorder Radar</h3>
              <p className="text-xs text-gray-400">Stock below safety threshold</p>
            </div>
            <span className="text-[10px] bg-red-950 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
              {alerts.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 5).map((a) => {
              const product = products.find((p) => p.id === a.productId);
              const percentage = Math.min(100, Math.round((a.currentQuantity / a.reorderLevel) * 100));

              return (
                <div
                  key={a.id}
                  className="p-3.5 rounded-xl bg-[#151C27] border border-white/5 space-y-2 hover:border-[#D49B37]/40 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug">{a.productName}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        On-hand: <span className="text-red-400 font-bold font-mono">{a.currentQuantity}</span> / Reorder Level: {a.reorderLevel}
                      </p>
                    </div>
                    {product && (
                      <button
                        onClick={() =>
                          handleQuickReorder(
                            product.id,
                            product.name,
                            product.supplierId,
                            product.supplierName,
                            product.price
                          )
                        }
                        className="px-2 py-1 rounded-lg bg-[#992B15] hover:bg-[#B83A1B] text-white text-[10px] font-bold transition shrink-0"
                      >
                        Reorder PO
                      </button>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#0A0D12] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        percentage === 0 ? 'bg-red-500' : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.max(5, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
