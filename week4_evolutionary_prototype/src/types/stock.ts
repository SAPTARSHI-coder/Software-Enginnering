export type ProductCategory = 'Electronics' | 'Stationery' | 'Consumables' | 'Hardware' | 'Furniture';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  reorderLevel: number;
  price: number;
  supplierId: string;
  supplierName: string;
  status: StockStatus;
  lastUpdated: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: ProductCategory;
  rating: number;
  productsSuppliedCount: number;
  address: string;
}

export type POStatus = 'Draft' | 'Submitted' | 'Approved' | 'Received' | 'Cancelled';

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  status: POStatus;
  orderDate: string;
  expectedDelivery: string;
  notes?: string;
}

export type MovementType = 'IN' | 'OUT' | 'ADJUSTMENT';

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  balanceAfter: number;
  reason: string;
  performedBy: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  productId: string;
  productName: string;
  severity: 'critical' | 'warning';
  currentQuantity: number;
  reorderLevel: number;
  timestamp: string;
  isDismissed: boolean;
}

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface StockStats {
  totalItems: number;
  totalQuantity: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalValuation: number;
  pendingOrdersCount: number;
}
