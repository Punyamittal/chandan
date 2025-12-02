/**
 * Cart API Service
 * Handles all cart-related API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  image?: string;
  quantity: number;
  pricePerUnit: number;
  discount: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

/**
 * Get user's cart
 */
export const getCart = async (userId: string): Promise<Cart> => {
  const response = await fetch(`${API_BASE_URL}/api/cart?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  const data = await response.json();
  return data.cart;
};

/**
 * Add item to cart
 */
export const addToCart = async (
  userId: string,
  item: {
    productId: string;
    productName: string;
    image?: string;
    quantity: number;
    pricePerUnit: number;
    discount?: number;
  }
): Promise<CartItem> => {
  console.log('cart.ts: API call to add to cart:', { API_BASE_URL, userId, item });
  
  const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({
      ...item,
      userId,
    }),
  });

  console.log('cart.ts: Response status:', response.status, response.statusText);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    console.error('cart.ts: API error:', error);
    throw new Error(error.message || `Failed to add item to cart (${response.status})`);
  }

  const data = await response.json();
  console.log('cart.ts: Success response:', data);
  return data.item;
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (
  userId: string,
  itemId: string,
  quantity: number
): Promise<CartItem> => {
  const response = await fetch(`${API_BASE_URL}/api/cart/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({
      quantity,
      userId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update cart item');
  }

  const data = await response.json();
  return data.item;
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (
  userId: string,
  itemId: string
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items/${itemId}?userId=${userId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to remove item from cart');
  }
};

/**
 * Clear entire cart
 */
export const clearCart = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/cart?userId=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to clear cart');
  }
};


