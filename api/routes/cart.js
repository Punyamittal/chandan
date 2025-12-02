/**
 * Cart API Routes
 * Handles all cart-related operations
 */

import express from 'express';
import { query } from '../database/db.js';

const router = express.Router();

/**
 * GET /api/cart
 * Get user's cart with all items
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    console.log('GET /api/cart - userId:', userId);

    // Get or create cart for user
    let cartResult = await query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );

    let cartId;
    if (cartResult.rows.length === 0) {
      // Create new cart
      const newCart = await query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
        [userId]
      );
      cartId = newCart.rows[0].id;
    } else {
      cartId = cartResult.rows[0].id;
    }

    // Get cart items
    const itemsResult = await query(
      `SELECT 
        ci.id,
        ci.product_id as "productId",
        ci.product_name as "productName",
        ci.product_image as "image",
        ci.quantity,
        ci.price_per_unit as "pricePerUnit",
        ci.discount_percent as "discount"
      FROM cart_items ci
      WHERE ci.cart_id = $1
      ORDER BY ci.created_at ASC`,
      [cartId]
    );

    res.json({
      success: true,
      cart: {
        id: cartId,
        userId,
        items: itemsResult.rows,
      },
    });
  } catch (error) {
    console.error('Get cart error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart',
      error: error.message,
      detail: error.detail || error.code,
    });
  }
});

/**
 * POST /api/cart/items
 * Add item to cart or update quantity if exists
 */
router.post('/items', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;
    const { productId, productName, image, quantity, pricePerUnit, discount = 0 } = req.body;

    if (!userId || !productId || !productName || !quantity || !pricePerUnit) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, productId, productName, quantity, pricePerUnit',
      });
    }

    // Get or create cart
    let cartResult = await query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );

    let cartId;
    if (cartResult.rows.length === 0) {
      const newCart = await query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
        [userId]
      );
      cartId = newCart.rows[0].id;
    } else {
      cartId = cartResult.rows[0].id;
    }

    // Check if item already exists in cart
    const existingItem = await query(
      'SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      const newQuantity = existingItem.rows[0].quantity + quantity;
      await query(
        'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [newQuantity, existingItem.rows[0].id]
      );

      res.json({
        success: true,
        message: 'Cart item quantity updated',
        item: {
          id: existingItem.rows[0].id,
          productId,
          quantity: newQuantity,
        },
      });
    } else {
      // Insert new item
      const newItem = await query(
        `INSERT INTO cart_items 
        (cart_id, product_id, product_name, product_image, quantity, price_per_unit, discount_percent)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, product_id as "productId", product_name as "productName", 
                  product_image as "image", quantity, price_per_unit as "pricePerUnit", 
                  discount_percent as "discount"`,
        [cartId, productId, productName, image || null, quantity, pricePerUnit, discount]
      );

      res.json({
        success: true,
        message: 'Item added to cart',
        item: newItem.rows[0],
      });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message,
      detail: error.detail || error.code,
    });
  }
});

/**
 * PUT /api/cart/items/:itemId
 * Update cart item quantity
 */
router.put('/items/:itemId', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0',
      });
    }

    // Verify cart ownership
    const cartResult = await query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );

    if (cartResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const cartId = cartResult.rows[0].id;

    // Update item
    const updateResult = await query(
      `UPDATE cart_items 
       SET quantity = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 AND cart_id = $3
       RETURNING id, product_id as "productId", product_name as "productName",
                 product_image as "image", quantity, price_per_unit as "pricePerUnit",
                 discount_percent as "discount"`,
      [quantity, itemId, cartId]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    res.json({
      success: true,
      message: 'Cart item updated',
      item: updateResult.rows[0],
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/cart/items/:itemId
 * Remove item from cart
 */
router.delete('/items/:itemId', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId;
    const { itemId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Verify cart ownership
    const cartResult = await query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );

    if (cartResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const cartId = cartResult.rows[0].id;

    // Delete item
    const deleteResult = await query(
      'DELETE FROM cart_items WHERE id = $1 AND cart_id = $2 RETURNING id',
      [itemId, cartId]
    );

    if (deleteResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/cart
 * Clear entire cart
 */
router.delete('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Get cart
    const cartResult = await query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );

    if (cartResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const cartId = cartResult.rows[0].id;

    // Delete all items (cascade will handle this, but explicit is clearer)
    await query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

    res.json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message,
    });
  }
});

export default router;


