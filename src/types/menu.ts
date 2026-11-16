export type MenuCategory =
  | 'All'
  | 'Burgers'
  | 'Shawarma'
  | 'Fries'
  | 'Roll Paratha'
  | 'Drinks';

export interface MenuAddon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  description: string;
  image: string;
  alt: string;
  prepTime: string;
  featuredTag?: string;
  addons: MenuAddon[];
}

export interface CartItem {
  cartKey: string;
  item: MenuItem;
  quantity: number;
  selectedAddons: MenuAddon[];
  spiceLevel: 'Classic' | 'Medium Heat' | 'Extra Spicy';
  notes?: string;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  fulfillment: 'Delivery' | 'Pickup';
  address?: string;
  paymentMethod: 'Cash on Delivery' | 'Pay on Pickup';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedMinutes: number;
  placedAt: string;
}
