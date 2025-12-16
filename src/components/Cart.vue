<template>
  <div class="cart-page">
    <Navbar />
    
    <div class="cart-container">
      <div class="page-header">
        <h1 class="page-title">Shopping Cart</h1>
        <p class="page-subtitle">Review your peace flags and proceed to checkout</p>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some beautiful peace flags to get started!</p>
          <router-link to="/flags" class="btn-primary">
            Browse Flags
          </router-link>
        </div>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items-section">
          <div class="section-header">
            <h2>Your Items ({{ totalItems }})</h2>
            <button @click="clearCart" class="clear-cart-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Clear Cart
            </button>
          </div>

          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-image">
                <img 
                  v-if="item.watermark_image_base64"
                  :src="item.watermark_image_base64" 
                  :alt="item.name"
                />
                <div v-else class="image-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              </div>
              
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-description">{{ truncateDescription(item.description) }}</p>
                <div class="item-meta">
                  <span class="price">${{ item.price }}</span>
                  <span class="stock">{{ item.stock }} available</span>
                </div>
              </div>
              
              <div class="quantity-controls">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="quantity-btn"
                  :disabled="item.quantity <= 1"
                >
                  −
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="quantity-btn"
                  :disabled="item.quantity >= item.stock"
                >
                  +
                </button>
              </div>
              
              <div class="item-total">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>
              
              <button 
                @click="removeFromCart(item.id)"
                class="remove-btn"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            
            <div class="summary-line">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
            
            <div class="summary-line">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            
            <div class="summary-line">
              <span>Tax</span>
              <span>${{ (totalPrice * 0.1).toFixed(2) }}</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-line total">
              <span>Total</span>
              <span>${{ (totalPrice * 1.1).toFixed(2) }}</span>
            </div>

            <button 
              @click="handleCheckout" 
              class="checkout-btn" 
              :disabled="isCheckingOut"
            >
              <span v-if="isCheckingOut">Processing...</span>
              <span v-else>Proceed to Checkout</span>
            </button>
            
            <router-link to="/flags" class="continue-shopping">
              ← Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import Navbar from './Navbar.vue'

const { 
  cartItems, 
  totalItems, 
  totalPrice, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  checkout 
} = useCart()

const isCheckingOut = ref(false)

const truncateDescription = (description) => {
  if (!description) return ''
  return description.length > 120 
    ? description.substring(0, 120) + '...' 
    : description
}

const handleCheckout = async () => {
  isCheckingOut.value = true
  try {
    await checkout()
  } catch (error) {
    console.error('Checkout error:', error)
  } finally {
    isCheckingOut.value = false
  }
}
</script>

<style scoped>
.cart-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.empty-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-content svg {
  color: #cbd5e1;
  margin-bottom: 1.5rem;
}

.empty-content h2 {
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-content p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.cart-items-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.clear-cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-cart-btn:hover {
  background: #fee2e2;
}

.cart-items {
  space-y: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  margin-bottom: 1rem;
  align-items: center;
  transition: all 0.2s ease;
}

.cart-item:hover {
  border-color: #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
}

.item-details {
  min-width: 0;
}

.item-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.item-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
}

.price {
  font-weight: 600;
  color: #3b82f6;
}

.stock {
  color: #64748b;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8fafc;
  padding: 0.5rem;
  border-radius: 6px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #94a3b8;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #fef2f2;
  color: #dc2626;
}

.cart-summary {
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.summary-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.summary-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.summary-line.total {
  font-weight: 700;
  font-size: 1.125rem;
  color: #1e293b;
}

.summary-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 1rem 0;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: 1.5rem 0 1rem;
}

.checkout-btn:hover:not(:disabled) {
  background: #2563eb;
}

.checkout-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.continue-shopping {
  display: block;
  text-align: center;
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.continue-shopping:hover {
  color: #3b82f6;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #2563eb;
}

/* Responsive Design */
@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }
  
  .quantity-controls,
  .item-total,
  .remove-btn {
    grid-column: 1 / -1;
    justify-self: start;
  }
  
  .quantity-controls {
    margin-top: 1rem;
  }
  
  .item-total {
    margin-left: auto;
  }
  
  .remove-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .cart-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .cart-items-section {
    padding: 1rem;
  }
}
</style>