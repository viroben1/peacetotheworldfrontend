import { ref, computed } from 'vue'

const cart = ref([])

export function useCart() {
  
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      })
    }
    
    showNotification(`${product.name} added to cart!`)
  }


  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
  }

 
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      item.quantity = newQuantity
    }
  }

  
  const clearCart = () => {
    cart.value = []
  }

 
  const totalItems = computed(() => 
    cart.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  const cartItems = computed(() => cart.value)

 
  const showNotification = (message) => {
    const notification = document.createElement('div')
    notification.className = 'cart-notification'
    notification.innerHTML = `
      <div class="notification-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
      </div>
    `
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
    `
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}


if (!document.querySelector('#cart-notification-styles')) {
  const style = document.createElement('style')
  style.id = 'cart-notification-styles'
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    .notification-content {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }
  `
  document.head.appendChild(style)
}