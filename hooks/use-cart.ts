

import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product, Productvalue } from '@/types';

/*interface CartStore {
  items: Product[]; 
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}*/

interface CartItem extends Product{
  /*selectedColor: string | null;
  selectedMasterType: string | null;
  selectedChildrenType: string | null;
  selectedThirdType: string | null;
  selectedQuantity: string | null;*/
  productValueId: string | null;
  productIndex: number | null;
  productQuantity: number | null;
  productPrice: number | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (productValueId: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: CartItem) => {
    const currentItems = get().items;
    const cartItem: CartItem = { 
      ...(data as CartItem),
    };

    const existingItem = currentItems.find((item) => item.productValueId === data.productValueId);
    
    if (existingItem) {
      return toast('Item already in cart.');
    }

    set({ items: [...get().items, cartItem] });
    toast.success('Item added to cart.');
  },
  removeItem: (productValueId: string) => {
    set({ items: [...get().items.filter((item) => item.productValueId !== productValueId)] });
    toast.success('Item removed from cart.');
  },
  removeAll: () => set({ items: [] }),
}), { 
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;