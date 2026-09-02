'use client';

import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { POStatus, PurchaseOrder } from '../types/stock';
import { Modal } from './Modal';
import { FileSpreadsheet, Plus, CheckCircle2, Clock, Truck, XCircle, AlertCircle } from 'lucide-react';

export function PurchaseOrdersView() {
  const { purchaseOrders, createPurchaseOrder, updatePOStatus, products, suppliers } = useStock();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(20);
  const [notes, setNotes] = useState('');

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    createPurchaseOrder({
      supplierId: product.supplierId,
      supplierName: product.supplierName,
      productId: product.id,
      productName: product.name,
      quantity: Number(quantity),
      unitPrice: product.price,
      totalCost: Number(quantity) * product.price,
      expectedDelivery: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes,
    });

    setIsAddModalOpen(false);
    setQuantity(20);
    setNotes('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Purchase Requisitions & Orders
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage procurement pipeline. Receiving a PO automatically increments physical stock balances!
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D49B37] via-[#E5AC46] to-[#B27D1B] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D49B37]/20 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New PO</span>
        </button>
      </div>

      {/* PO Data Table */}
      <div className="rounded-2xl bg-[#10151E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151C27] border-b border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">PO Reference</th>
                <th className="py-3.5 px-4">Item Ordered</th>
                <th className="py-3.5 px-4">Vendor</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Total Cost</th>
                <th className="py-3.5 px-4">Delivery ETA</th>
                <th className="py-3.5 px-4">Workflow Status</th>
                <th className="py-3.5 px-4 text-right">Transition Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-white text-sm">{po.id}</span>
                    <span className="text-[11px] text-gray-400 block font-mono">Issued {po.orderDate}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{po.productName}</div>
                    <div className="text-[11px] text-gray-400 font-mono">SKU: {po.productId}</div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-300 max-w-[160px] truncate">{po.supplierName}</td>

                  <td className="py-3.5 px-4 font-mono font-bold text-white">{po.quantity} units</td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#F8DA96]">
                    ₹{po.totalCost.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-400">{po.expectedDelivery}</td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        po.status === 'Received'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : po.status === 'Approved'
                          ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                          : po.status === 'Submitted'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : po.status === 'Cancelled'
                          ? 'bg-red-950 text-red-300'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {po.status === 'Draft' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Submitted')}
                          className="px-2.5 py-1 rounded-lg bg-[#1C2636] hover:bg-[#253348] text-[#F8DA96] text-[10px] font-bold transition"
                        >
                          Submit
                        </button>
                      )}

                      {po.status === 'Submitted' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Approved')}
                          className="px-2.5 py-1 rounded-lg bg-blue-900/40 hover:bg-blue-900/60 text-blue-300 border border-blue-500/30 text-[10px] font-bold transition"
                        >
                          Approve
                        </button>
                      )}

                      {po.status === 'Approved' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Received')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Receive Stock</span>
                        </button>
                      )}

                      {po.status !== 'Received' && po.status !== 'Cancelled' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Cancelled')}
                          className="px-2 py-1 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400 border border-red-500/20 text-[10px] font-bold transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create PO Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Issue Purchase Requisition Order"
        subtitle="Vendor assignment is automatically resolved based on chosen SKU."
      >
        <form onSubmit={handleCreatePO} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Target Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — Current Stock: {p.quantity} | Vendor: {p.supplierName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Order Quantity</label>
            <input
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Procurement Notes / Justification</label>
            <textarea
              rows={2}
              placeholder="e.g. Urgent seasonal replenishment or bulk discount order"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] text-gray-300 hover:text-white transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black font-bold uppercase tracking-wider transition shadow"
            >
              Issue Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
