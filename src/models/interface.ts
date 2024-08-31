
// User Interface
export interface User {
    id: number;
    username: string;
    password: string; // This should be hashed
    email: string;
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
    userId: number; // Foreign key to User
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

