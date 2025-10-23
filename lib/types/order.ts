export interface Order {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  address: string;
  email: string;
  pincode: string;
  total_amount: number;
  order_type: 'product' | 'service'; // Can extend later
  cart_items: any[]; // Will store the cart items
  shipping_details?: string;
  payment_method: 'partial_cod' | 'full_online';
  payment_status: 'unpaid' | 'paid' | 'partial';
  is_partial_cod: boolean;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  // Razorpay payment fields
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

export interface OrderFormData {
  name: string;
  contact: string;
  address: string;
  email: string;
  pincode: string;
}

export type PaymentMethod = 'partial_cod' | 'full_online';
