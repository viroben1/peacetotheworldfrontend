<template>
  <div class="login-page">
    <Navbar />
    <div class="login-wrapper">
      <div class="login-card">
        <h1>Welcome Back 👋</h1>
        <p class="subtitle">Log in to continue exploring flags 🌍</p>

        <form @submit.prevent="submitLogin" class="form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" placeholder="you@example.com" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" placeholder="••••••••" required />
          </div>

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Navbar from "../components/Navbar.vue";

const form = ref({
  email: "",
  password: "",
});

const router = useRouter();

const submitLogin = async () => {
  try {
    const { VITE_API_URL } = import.meta.env;
    const response = await axios.post(`${VITE_API_URL}/users/login`, form.value);

    localStorage.setItem("token", response.data.token);
    toast.success("Login successful! 🎉");
    router.push("/");
  } catch (error) {
    toast.error(error.response?.data?.error || "Login failed!");
    console.error(error);
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to right, #e0f7fa, #fce4ec);
  font-family: "Segoe UI", sans-serif;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
}

.login-card {
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  max-width: 480px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.login-card h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #333;
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
