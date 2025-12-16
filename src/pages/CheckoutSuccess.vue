<template>
  <div class="success-page">
    <Navbar />
    <div class="success-container">
      <div class="success-content">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
        <div class="success-actions">
          <router-link to="/flags" class="btn-primary">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>

<style scoped>
.success-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.success-content {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.success-icon {
  color: #10b981;
  margin-bottom: 2rem;
}

.success-content h1 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.success-content p {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: #f1f5f9;
  color: #475569;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease;
}

.btn-secondary:hover {
  background: #e2e8f0;
}
</style>