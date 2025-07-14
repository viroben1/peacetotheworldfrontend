<template>
  <div class="home-page">
    <Navbar />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="fade-up">🌍 Spread Peace with a Flag Of Peace</h1>
        <p class="fade-up">Discover and purchase a flags that stand for unity, peace, and hope across borders.</p>
        <router-link to="/flags" class="cta-button fade-up">Explore Flags</router-link>
      </div>
      <div class="hero-image fade-up">
        <img src="../../public/peacedove.png" alt="Peace Flag" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-card fade-in">
        <img src="https://cdn-icons-png.flaticon.com/512/2917/2917242.png" />
        <h3>Eco-Friendly</h3>
        <p>Flags are made from sustainable materials that respect our planet.</p>
      </div>
      <div class="feature-card fade-in">
        <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" />
        <h3>Support Peace</h3>
        <p>Your purchase supports global peace organizations and awareness campaigns.</p>
      </div>
      <div class="feature-card fade-in">
        <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" />
        <h3>Worldwide Shipping</h3>
        <p>No matter where you are, we’ll get your flag to you with love and care.</p>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="quote-section fade-in">
      <blockquote>
        "When the power of love overcomes the love of power, the world will know peace."
        <span>- Jimi Hendrix</span>
      </blockquote>
    </section>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap");

.home-page {
  font-family: "Inter", sans-serif;
  color: #1e1e1e;
  background: linear-gradient(to bottom right, #f5fcff, #fdf8ff);
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5rem 2rem 3rem;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
  gap: 2rem;
}

.hero-content {
  flex: 1;
  min-width: 320px;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #0077cc;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 2rem;
  max-width: 500px;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #0077cc, #005fa3);
  color: #fff;
  padding: 0.9rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0, 119, 204, 0.3);
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 119, 204, 0.4);
}

.hero-image {
  flex: 1;
  text-align: center;
}

.hero-image img {
  max-width: 100%;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

/* Features Section */
.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 4rem 2rem;
  background: #ffffff;
  gap: 2rem;
}

.feature-card {
  background: #f9f9f9;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  width: 300px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.feature-card img {
  width: 64px;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.2rem;
  color: #0077cc;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.95rem;
  color: #555;
}

/* Quote Section */
.quote-section {
  background: #0077cc;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.quote-section blockquote {
  font-size: 1.6rem;
  font-style: italic;
  max-width: 800px;
  margin: auto;
  line-height: 1.5;
}

.quote-section span {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1rem;
}

/* Animations */
.fade-up {
  animation: fadeUp 1s ease-out both;
}

.fade-in {
  animation: fadeIn 1.2s ease-out both;
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
