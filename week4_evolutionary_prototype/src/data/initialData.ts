import { Product, Supplier, PurchaseOrder, StockMovement } from '../types/stock';

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'S001',
    name: 'TechSupply Solutions Ltd.',
    contactPerson: 'Rahul Sharma',
    email: 'rahul.s@techsupply.in',
    phone: '+91 98301 22441',
    category: 'Electronics',
    rating: 4.8,
    productsSuppliedCount: 6,
    address: 'Sector V, Salt Lake, Kolkata, WB'
  },
  {
    id: 'S002',
    name: 'OfficeWorld Paper & Stationery',
    contactPerson: 'Priya Mukherjee',
    email: 'priya@officeworld.co.in',
    phone: '+91 98311 55662',
    category: 'Stationery',
    rating: 4.6,
    productsSuppliedCount: 5,
    address: 'Chowringhee Road, Park Street, Kolkata, WB'
  },
  {
    id: 'S003',
    name: 'CleanCo Hygiene & Consumables',
    contactPerson: 'Amitava Sen',
    email: 'amitava@cleancogroup.com',
    phone: '+91 98322 88993',
    category: 'Consumables',
    rating: 4.3,
    productsSuppliedCount: 3,
    address: 'Gariahat Industrial Estate, Kolkata, WB'
  },
  {
    id: 'S004',
    name: 'FurnishPro Ergonomics',
    contactPerson: 'Sneha Roy Chowdhury',
    email: 'sneha@furnishpro.in',
    phone: '+91 98333 44117',
    category: 'Furniture',
    rating: 4.7,
    productsSuppliedCount: 2,
    address: 'Rajarhat Expressway, New Town, Kolkata, WB'
  },
  {
    id: 'S005',
    name: 'ElectroMart Hardware Networks',
    contactPerson: 'Vikramjit Singh',
    email: 'vikram@electromart.in',
    phone: '+91 98344 77228',
    category: 'Hardware',
    rating: 4.5,
    productsSuppliedCount: 4,
    address: 'Chandni Chowk Market, Central Kolkata, WB'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'INV001', name: 'Logitech Wireless Mouse M185', category: 'Electronics', quantity: 45, unit: 'pcs', reorderLevel: 20, price: 850, supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', status: 'In Stock', lastUpdated: '2026-09-01' },
  { id: 'INV002', name: 'Reynolds Ballpoint Pens (Pack of 50)', category: 'Stationery', quantity: 8, unit: 'box', reorderLevel: 25, price: 250, supplierId: 'S002', supplierName: 'OfficeWorld Paper & Stationery', status: 'Low Stock', lastUpdated: '2026-08-30' },
  { id: 'INV003', name: 'Anker 7-Port High Speed USB Hub', category: 'Electronics', quantity: 0, unit: 'pcs', reorderLevel: 10, price: 1450, supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', status: 'Out of Stock', lastUpdated: '2026-08-28' },
  { id: 'INV004', name: 'JK Copier A4 Paper (500 Sheets Ream)', category: 'Stationery', quantity: 120, unit: 'ream', reorderLevel: 50, price: 340, supplierId: 'S002', supplierName: 'OfficeWorld Paper & Stationery', status: 'In Stock', lastUpdated: '2026-09-02' },
  { id: 'INV005', name: 'Aluminum Ergonomic Laptop Stand Pro', category: 'Electronics', quantity: 15, unit: 'pcs', reorderLevel: 10, price: 1850, supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', status: 'In Stock', lastUpdated: '2026-08-25' },
  { id: 'INV006', name: 'HP LaserJet Black Ink Toner Cartridge', category: 'Consumables', quantity: 3, unit: 'pcs', reorderLevel: 12, price: 3200, supplierId: 'S003', supplierName: 'CleanCo Hygiene & Consumables', status: 'Low Stock', lastUpdated: '2026-09-01' },
  { id: 'INV007', name: 'Ergonomic Mesh Office Task Chair', category: 'Furniture', quantity: 7, unit: 'pcs', reorderLevel: 5, price: 7800, supplierId: 'S004', supplierName: 'FurnishPro Ergonomics', status: 'In Stock', lastUpdated: '2026-08-20' },
  { id: 'INV008', name: 'Gold-Plated HDMI 2.1 Cable (2m Braided)', category: 'Hardware', quantity: 0, unit: 'pcs', reorderLevel: 15, price: 420, supplierId: 'S005', supplierName: 'ElectroMart Hardware Networks', status: 'Out of Stock', lastUpdated: '2026-08-29' },
  { id: 'INV009', name: 'Kangaro Heavy Duty Desktop Stapler', category: 'Stationery', quantity: 22, unit: 'pcs', reorderLevel: 10, price: 380, supplierId: 'S002', supplierName: 'OfficeWorld Paper & Stationery', status: 'In Stock', lastUpdated: '2026-08-26' },
  { id: 'INV010', name: 'Surge Protector Extension Cord (5m 6-Way)', category: 'Hardware', quantity: 12, unit: 'pcs', reorderLevel: 8, price: 890, supplierId: 'S005', supplierName: 'ElectroMart Hardware Networks', status: 'In Stock', lastUpdated: '2026-08-31' },
  { id: 'INV011', name: 'Camlin Magnetic Whiteboard Markers (4-Col)', category: 'Stationery', quantity: 6, unit: 'box', reorderLevel: 20, price: 180, supplierId: 'S002', supplierName: 'OfficeWorld Paper & Stationery', status: 'Low Stock', lastUpdated: '2026-08-27' },
  { id: 'INV012', name: 'Philips Adjustable LED Desk Lamp', category: 'Electronics', quantity: 30, unit: 'pcs', reorderLevel: 15, price: 1100, supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', status: 'In Stock', lastUpdated: '2026-08-22' },
  { id: 'INV013', name: 'Godrej Steel 3-Drawer Filing Cabinet', category: 'Furniture', quantity: 2, unit: 'pcs', reorderLevel: 3, price: 9200, supplierId: 'S004', supplierName: 'FurnishPro Ergonomics', status: 'Low Stock', lastUpdated: '2026-08-15' },
  { id: 'INV014', name: 'Cat6 High Speed Gigabit Ethernet Cable (10m)', category: 'Hardware', quantity: 55, unit: 'pcs', reorderLevel: 20, price: 290, supplierId: 'S005', supplierName: 'ElectroMart Hardware Networks', status: 'In Stock', lastUpdated: '2026-08-29' },
  { id: 'INV015', name: 'Lifebuoy Hospital Grade Hand Sanitizer (500ml)', category: 'Consumables', quantity: 18, unit: 'bottle', reorderLevel: 30, price: 210, supplierId: 'S003', supplierName: 'CleanCo Hygiene & Consumables', status: 'Low Stock', lastUpdated: '2026-08-24' },
  { id: 'INV016', name: 'Redragon Mechanical Gaming Keyboard RGB', category: 'Electronics', quantity: 8, unit: 'pcs', reorderLevel: 10, price: 2750, supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', status: 'Low Stock', lastUpdated: '2026-08-30' },
  { id: 'INV017', name: '3M Post-It Pastel Sticky Notes (Pack of 12)', category: 'Stationery', quantity: 85, unit: 'pack', reorderLevel: 40, price: 320, supplierId: 'S002', supplierName: 'OfficeWorld Paper & Stationery', status: 'In Stock', lastUpdated: '2026-09-01' },
  { id: 'INV018', name: 'Havells Master Switch Heavy Socket Strip', category: 'Hardware', quantity: 20, unit: 'pcs', reorderLevel: 10, price: 740, supplierId: 'S005', supplierName: 'ElectroMart Hardware Networks', status: 'In Stock', lastUpdated: '2026-08-21' },
  { id: 'INV019', name: 'Logitech C922 Pro Full HD 1080p Webcam', category: 'Electronics', quantity: 5, unit: 'pcs', reorderLevel: 8, price: 6200, supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', status: 'Low Stock', lastUpdated: '2026-08-28' },
  { id: 'INV020', name: 'Tata Coffee Gold Premium Roast (500g Pack)', category: 'Consumables', quantity: 4, unit: 'pack', reorderLevel: 10, price: 480, supplierId: 'S003', supplierName: 'CleanCo Hygiene & Consumables', status: 'Low Stock', lastUpdated: '2026-09-02' }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-2026-001', supplierId: 'S001', supplierName: 'TechSupply Solutions Ltd.', productId: 'INV003', productName: 'Anker 7-Port High Speed USB Hub', quantity: 30, unitPrice: 1450, totalCost: 43500, status: 'Submitted', orderDate: '2026-08-30', expectedDelivery: '2026-09-05', notes: 'Urgent stockout replenishment' },
  { id: 'PO-2026-002', supplierId: 'S002', supplierName: 'OfficeWorld Paper & Stationery', productId: 'INV002', productName: 'Reynolds Ballpoint Pens (Pack of 50)', quantity: 50, unitPrice: 250, totalCost: 12500, status: 'Approved', orderDate: '2026-08-31', expectedDelivery: '2026-09-04' },
  { id: 'PO-2026-003', supplierId: 'S005', supplierName: 'ElectroMart Hardware Networks', productId: 'INV008', productName: 'Gold-Plated HDMI 2.1 Cable (2m Braided)', quantity: 40, unitPrice: 420, totalCost: 16800, status: 'Received', orderDate: '2026-08-25', expectedDelivery: '2026-08-30' },
  { id: 'PO-2026-004', supplierId: 'S003', supplierName: 'CleanCo Hygiene & Consumables', productId: 'INV006', productName: 'HP LaserJet Black Ink Toner Cartridge', quantity: 20, unitPrice: 3200, totalCost: 64000, status: 'Draft', orderDate: '2026-09-01', expectedDelivery: '2026-09-08' },
  { id: 'PO-2026-005', supplierId: 'S004', supplierName: 'FurnishPro Ergonomics', productId: 'INV013', productName: 'Godrej Steel 3-Drawer Filing Cabinet', quantity: 5, unitPrice: 9200, totalCost: 46000, status: 'Approved', orderDate: '2026-08-28', expectedDelivery: '2026-09-06' }
];

export const INITIAL_MOVEMENTS: StockMovement[] = [
  { id: 'MOV-1001', productId: 'INV004', productName: 'JK Copier A4 Paper', type: 'IN', quantity: 50, balanceAfter: 120, reason: 'Vendor Shipment Arrival', performedBy: 'Rajesh K. (Clerk)', timestamp: '2026-09-02 09:30' },
  { id: 'MOV-1002', productId: 'INV001', productName: 'Logitech Wireless Mouse M185', type: 'OUT', quantity: 5, balanceAfter: 45, reason: 'Department Dispatch (Engineering)', performedBy: 'Suman D. (Admin)', timestamp: '2026-09-01 16:15' },
  { id: 'MOV-1003', productId: 'INV003', productName: 'Anker 7-Port High Speed USB Hub', type: 'OUT', quantity: 4, balanceAfter: 0, reason: 'Lab Setup Dispatch', performedBy: 'Rajesh K. (Clerk)', timestamp: '2026-08-31 14:00' },
  { id: 'MOV-1004', productId: 'INV006', productName: 'HP LaserJet Toner Cartridge', type: 'OUT', quantity: 2, balanceAfter: 3, reason: 'Accounting Print Room Refill', performedBy: 'Rajesh K. (Clerk)', timestamp: '2026-08-30 11:45' },
  { id: 'MOV-1005', productId: 'INV010', productName: 'Surge Protector Extension Cord', type: 'ADJUSTMENT', quantity: -1, balanceAfter: 12, reason: 'Damaged Cord Write-off', performedBy: 'Suman D. (Admin)', timestamp: '2026-08-29 10:20' }
];
