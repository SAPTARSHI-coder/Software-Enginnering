'use client';

import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { ProductCategory, Supplier } from '../types/stock';
import { Modal } from './Modal';
import { Truck, Star, Mail, Phone, MapPin, Plus, Boxes } from 'lucide-react';

export function SuppliersView() {
  const { suppliers, addSupplier, products } = useStock();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplier({
      name,
      contactPerson,
      email,
      phone,
      category,
      rating: 4.5,
      address,
    });
    setIsAddModalOpen(false);
    setName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Commercial Vendor Directory
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Registered procurement partners, reliability ratings, and supply catalog allocations.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D49B37] via-[#E5AC46] to-[#B27D1B] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D49B37]/20 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {suppliers.map((s) => {
          const suppliedProducts = products.filter((p) => p.supplierId === s.id);

          return (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-[#10151E] border border-white/10 space-y-4 hover:border-[#D49B37]/40 transition shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#F8DA96] uppercase">{s.id}</span>
                    <h3 className="text-base font-serif font-bold text-white leading-snug">{s.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-[#1C2636] border border-[#D49B37]/30 px-2 py-0.5 rounded-lg text-xs font-bold text-[#F8DA96]">
                    <Star className="w-3.5 h-3.5 fill-[#F8DA96] text-[#F8DA96]" />
                    <span>{s.rating}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white font-medium">{s.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="w-3.5 h-3.5 text-[#D49B37]" />
                    <span>{s.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-3.5 h-3.5 text-[#D49B37]" />
                    <span>{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-[#D49B37]" />
                    <span className="line-clamp-1">{s.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#151C27] text-gray-300 border border-white/5 text-[10px]">
                  {s.category}
                </span>
                <span className="text-gray-400 flex items-center gap-1 font-mono text-[11px]">
                  <Boxes className="w-3.5 h-3.5 text-[#D49B37]" />
                  <span>{suppliedProducts.length} Active SKUs</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll Commercial Vendor"
        subtitle="Record corporate information, key account contact, and supply domain."
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Company / Vendor Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Hardware Logistics Ltd."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Contact Representative</label>
              <input
                type="text"
                required
                placeholder="e.g. Debashis Roy"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Primary Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              >
                <option value="Electronics">Electronics</option>
                <option value="Stationery">Stationery</option>
                <option value="Consumables">Consumables</option>
                <option value="Hardware">Hardware</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="sales@vendor.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                required
                placeholder="+91 98300 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Corporate Dispatch Facility Address</label>
            <textarea
              rows={2}
              placeholder="Full warehouse or office location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              Enroll Vendor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
