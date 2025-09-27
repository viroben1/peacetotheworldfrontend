<template>
  <header class="navbar">
    <div class="container">
      <router-link to="/" class="logo">
        <img src="../assets/peaceolivebranch.png" alt="Olive Branch" class="highlight inline-block w-4 h-4 mr-1 align-middle"> PeaceToTheWorld
      </router-link>

      <nav class="links">
        <router-link to="/" class="link">Home</router-link>
        <router-link to="/about" class="link">About</router-link>
        <router-link v-if="isLoggedIn" to="/flags" class="link">Flags</router-link>
        <router-link v-if="isLoggedIn" to="/cart" class="link cart-link">
          Cart
          <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
        </router-link>

        <div class="actions">
          <router-link v-if="!isLoggedIn" to="/login" class="btn outline">Login</router-link>
          <router-link v-if="!isLoggedIn" to="/signup" class="btn solid">Sign Up</router-link>
          <button v-if="isLoggedIn" @click="logout" class="btn logout">Logout</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { totalItems } = useCart()
const isLoggedIn = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  toast.success('Logged out successfully!')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.container {
  max-width: 1180px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

.logo {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0077cc;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo .highlight {
  font-size: 1.2rem;
  color: #ff4081;
}

.links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.link::after {
  content: '';
  height: 2px;
  width: 0%;
  background: #0077cc;
  position: absolute;
  bottom: -4px;
  left: 0;
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

.link:hover {
  color: #0077cc;
}

.cart-link {
  position: relative;
}

.cart-badge {
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.btn {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
}

.btn.outline {
  border: 1.5px solid #0077cc;
  background: transparent;
  color: #0077cc;
}

.btn.outline:hover {
  background: #0077cc;
  color: white;
}

.btn.solid {
  background-color: #0077cc;
  color: white;
  border: none;
}

.btn.solid:hover {
  background-color: #005fa3;
}

.btn.logout {
  background-color: #ff4d4f;
  color: white;
  border: none;
}

.btn.logout:hover {
  background-color: #d9363e;
}
</style>