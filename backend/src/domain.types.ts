export type SaleSource = "online" | "pos";

export type InventoryReason = "restock" | "damage" | "sale" | "manual_adjustment";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku: string;
  stockQuantity: number;
  categoryId?: string;
  threedModelUrl?: string;
  createdAt: string;
};

export type Sale = {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  source: SaleSource;
  customerEmail?: string;
  customerPhone?: string;
  createdAt: string;
};

export type InventoryLog = {
  id: string;
  productId: string;
  changeAmount: number;
  reason: InventoryReason;
  adminId?: string;
  timestamp: string;
};

export type AgeLog = {
  id: string;
  dateOfBirth: string;
  isAllowed: boolean;
  checkedAt: string;
  sessionId?: string;
};
