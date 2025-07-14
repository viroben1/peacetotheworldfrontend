<template>
  <div class="signup-page">
    <Navbar />
    <div class="signup-wrapper">
      <div class="signup-card">
        <h1>Join <span class="brand">PeaceToTheWorld</span></h1>
        <p class="subtitle">Create your account to start exploring beautiful flags 🌍</p>

        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" v-model="form.first_name" placeholder="John" required />
          </div>

          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" v-model="form.last_name" placeholder="Doe" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" placeholder="you@example.com" required />
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" v-model="form.phone" placeholder="1234567890" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" placeholder="••••••••" required />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: ''
})

const submitForm = async () => {
  try {
    const { VITE_API_URL } = import.meta.env
    const response = await axios.post(`${VITE_API_URL}/users/signup`, form.value)
    toast.success('Signup successful! 🎉');
    router.push('/login')
    console.log(response.data)
  } catch (error) {
    toast.error(error.response?.data?.error || 'Signup failed!')
    console.error(error)
  }
}
</script>

<style scoped>
.signup-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to right, #e0f7fa, #fce4ec);
  font-family: 'Segoe UI', sans-serif;
}

.signup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
}

.signup-card {
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  max-width: 480px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.signup-card h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #333;
}

.brand {
  color: #0077cc;
  font-weight: 600;
}

.subtitle {
  font-size: 0.95rem;
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  display: block;
  color: #444;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: #fafafa;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #5ab8ff;
  box-shadow: 0 0 0 3px rgba(90, 184, 255, 0.2);
  background: #ffffff;
}

button {
  padding: 0.9rem;
  background-color: #0077cc;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #005fa3;
  transform: scale(1.02);
}
</style>
