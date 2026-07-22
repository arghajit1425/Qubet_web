export type ViewMode = 'home' | 'shop' | 'login' | 'admin-login' | 'admin-dashboard';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string; // '$' or '₹'
  image: string;
  description: string;
  category: 'Perfume' | 'Collection' | 'Accessories' | 'News';
  sku: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  rating?: number;
  notes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Banner {
  id: string;
  title: string;
  resolution: string;
  updated: string;
  status: 'Live' | 'Draft';
  image: string;
}

export interface ProductAsset {
  id: string;
  preview: string;
  productName: string;
  sku: string;
  type: 'Main Product' | 'Secondary' | 'Marketing';
  resolution: string;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  avatarUrl?: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}
