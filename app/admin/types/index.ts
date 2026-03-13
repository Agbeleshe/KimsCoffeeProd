export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  customCategory: string;
  price: string;
  originalPrice: string;
  inStock: string;
  description: string;
  features: string;
  image: string;
  charityProgram: string;
  notes: string;
  createdAt: any;
  createdBy: string;
}

export type DeliveryStatus = "pending" | "processing" | "delivered";

export type CustomerInfo = {
  fullName: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  houseAddress: string;
  majorLandmark: string;
  socialHandle?: string;
  alternativeAddress?: string;
  zipCode?: string;
};

export type OrderProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

export type AdminOrder = {
  id: string;
  products: OrderProduct[];
  cartSubtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: DeliveryStatus;
  customerInfo: CustomerInfo;
  createdAtLabel: string;
};

export interface Complaint {
  id: string;
  orderId: string;
  customerName: string;
  complaintText: string;
  status: "open" | "closed";
  createdAt: any;
}