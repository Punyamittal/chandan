/**
 * useCart Hook
 * Manages cart state and syncs with backend API
 */

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as cartAPI from '@/lib/api/cart';
import { CartItem } from '@/lib/api/cart';
import { useAuthContext } from '@/contexts/AuthContext';

export function useCart() {
  const { userId } = useAuthContext();
  const queryClient = useQueryClient();

  // Fetch cart from API
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => (userId ? cartAPI.getCart(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: (item: {
      productId: string;
      productName: string;
      image?: string;
      quantity: number;
      pricePerUnit: number;
      discount?: number;
    }) => {
      if (!userId) {
        throw new Error('User must be signed in to add to cart');
      }
      console.log('useCart: Adding to cart with userId:', userId, 'item:', item);
      return cartAPI.addToCart(userId, item);
    },
    onSuccess: () => {
      console.log('useCart: Cart updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
    onError: (error) => {
      console.error('useCart: Error adding to cart:', error);
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (!userId) throw new Error('User must be signed in to update cart');
      return cartAPI.updateCartItem(userId, itemId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: string) => {
      if (!userId) throw new Error('User must be signed in to remove from cart');
      return cartAPI.removeFromCart(userId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => {
      if (!userId) throw new Error('User must be signed in to clear cart');
      return cartAPI.clearCart(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  // Helper functions
  const addToCart = useCallback(
    (item: {
      productId: string;
      productName: string;
      image?: string;
      quantity: number;
      pricePerUnit: number;
      discount?: number;
    }) => {
      addToCartMutation.mutate(item);
    },
    [addToCartMutation]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      updateQuantityMutation.mutate({ itemId, quantity });
    },
    [updateQuantityMutation]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      removeFromCartMutation.mutate(itemId);
    },
    [removeFromCartMutation]
  );

  const clearCart = useCallback(() => {
    clearCartMutation.mutate();
  }, [clearCartMutation]);

  // Calculate totals
  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal =
    cart?.items.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0) || 0;
  const totalDiscount =
    cart?.items.reduce(
      (sum, item) => sum + (item.quantity * item.pricePerUnit * item.discount) / 100,
      0
    ) || 0;
  const total = subtotal - totalDiscount;

  return {
    cart,
    items: cart?.items || [],
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    totalDiscount,
    total,
    isSignedIn: !!userId,
  };
}


