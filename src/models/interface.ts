// User Interface
export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // This should be hashed
}

// Product Interface
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Order Interface
export interface Order {
  id: number;
  user_id: number; // Foreign key to User
  totalAmount: number;
  customerName: string;
  status: string; // e.g., 'pending', 'completed'
}

// OrderItem Interface
export interface OrderItem {
  id: number;
  orderId: number; // Foreign key to Order
  productId: number; // Foreign key to Product
  quantity: number;
  price: number;
}
