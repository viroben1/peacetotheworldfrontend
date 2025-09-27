<template>
  <div class="about-page">
    <Navbar />
    
 
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">About the International Flag of Peace</h1>
          <p class="hero-subtitle">{{ welcomeMessage }}</p>
          <div class="hero-actions">
            <button class="btn-primary" @click="scrollToStory">Learn Our Story</button>
            <button class="btn-outline" @click="scrollToInvolved">Get Involved</button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="flag-animation">
            <div class="flag-base">
              <div class="flag-blue"></div>
              <div class="flag-green"></div>
              <div class="flag-white"></div>
            </div>
            <div class="flag-symbols">
              <div class="sun"></div>
              <div class="heart"></div>
              <div class="dove left-dove"></div>
              <div class="dove right-dove"></div>
              <div class="olive-branch left-branch"></div>
              <div class="olive-branch right-branch"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToStory">
        <span>Scroll to explore</span>
        <div class="chevron"></div>
      </div>
    </section>

    <section ref="storySection" class="story-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ storyTitle }}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="story-content">
          <div class="story-image">
            <div class="image-placeholder">
              <div class="peace-symbol"></div>
              <div class="floating-elements">
                <div class="floating-element element-1">✌️</div>
                <div class="floating-element element-2">🌍</div>
                <div class="floating-element element-3">🕊️</div>
                <div class="floating-element element-4">❤️</div>
              </div>
            </div>
          </div>
          <div class="story-text">
            <p class="story-paragraph">{{ story }}</p>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3>2001</h3>
                  <p>The vision for peace was born after 9-11</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3>Present</h3>
                  <p>Continuing to spread the message of peace worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

   
    <section class="message-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ messageTitle }}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="symbols-grid">
          <div class="symbol-card" v-for="symbol in symbols" :key="symbol.id" 
               @mouseenter="activeSymbol = symbol.id" 
               @mouseleave="activeSymbol = null">
            <div class="symbol-icon" :class="{ active: activeSymbol === symbol.id }">
              <div v-html="symbol.icon"></div>
            </div>
            <h3>{{ symbol.title }}</h3>
            <p>{{ symbol.description }}</p>
          </div>
        </div>
        <div class="message-text">
          <p>{{ message }}</p>
        </div>
      </div>
    </section>


    <section ref="involvedSection" class="involved-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ involvedTitle }}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="involved-content">
          <div class="involved-text">
            <p>{{ involvedMessage }}</p>
            <div class="action-cards">
              <div class="action-card" v-for="action in actions" :key="action.id"
                   @mouseenter="hoverAction = action.id"
                   @mouseleave="hoverAction = null">
                <div class="action-icon" :class="{ hover: hoverAction === action.id }">
                  <span v-html="action.icon"></span>
                </div>
                <h3>{{ action.title }}</h3>
                <p>{{ action.description }}</p>
                <button class="action-btn" :class="action.color">{{ action.buttonText }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div class="peace-counter">
      <div class="counter-item">
        <div class="counter-number" ref="flagsCounter">0</div>
        <div class="counter-label">Flags Distributed</div>
      </div>
      <div class="counter-item">
        <div class="counter-number" ref="countriesCounter">0</div>
        <div class="counter-label">Countries Reached</div>
      </div>
      <div class="counter-item">
        <div class="counter-number" ref="supportersCounter">0</div>
        <div class="counter-label">Supporters</div>
      </div>
    </div>


    <section class="cta-section">
      <div class="container">
        <h2>Join the Peace Movement Today</h2>
        <p>Be part of something bigger. Help us spread peace across the globe.</p>
        <div class="cta-buttons">
          <button class="btn-primary large">Get Your Peace Flag</button>
          <button class="btn-outline large">Share the Message</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'


const welcomeMessage = 'Welcome to the International Flag of Peace project. Our mission is to promote peace, unity, kindness, and tolerance among people from all walks of life, and every place in the world. This flag represents our commitment to a world where love, understanding, and compassion prevail.'
const storyTitle = 'The Story Behind the Flag'
const story = 'When the 9-11 attack happened, our visionary, Camille, felt a deep calling to create a symbol of peace that could belong to everyone living on this beautiful planet. That moment led to this journey of crafting the \'International Flag of Peace.\''
const messageTitle = 'Our Message'
const message = 'The flag\'s colors and elements symbolize the core values of people everywhere. The blue represents peace, the green stands for harmony with nature and with each other, and the white symbolizes unity. Yellow is the sun, which is lighting our way each day; the heart, doves, and olive branches are the symbols of love. We believe in a world where kindness and charity prevail among our brothers and sisters everywhere.'
const involvedTitle = 'Get Involved'
const involvedMessage = 'If you resonate with our mission, we invite you to join us in promoting peace and spreading the message of the \'International Flag of Peace.\' Together, we can make our beautiful world a more peaceful place to live and thrive.'

const activeSymbol = ref(null)
const hoverAction = ref(null)
const storySection = ref(null)
const involvedSection = ref(null)


const symbols = ref([
  {
    id: 1,
    icon: '🔵',
    title: 'Blue - Peace',
    description: 'Represents tranquility and global harmony'
  },
  {
    id: 2,
    icon: '🟢',
    title: 'Green - Harmony',
    description: 'Symbolizes unity with nature and each other'
  },
  {
    id: 3,
    icon: '⚪',
    title: 'White - Unity',
    description: 'Stands for purity and togetherness'
  },
  {
    id: 4,
    icon: '🟡',
    title: 'Yellow - Sun',
    description: 'The light guiding our way each day'
  },
  {
    id: 5,
    icon: '❤️',
    title: 'Heart - Love',
    description: 'Represents compassion and kindness'
  },
  {
    id: 6,
    icon: '🕊️',
    title: 'Dove - Hope',
    description: 'Symbol of hope and new beginnings'
  }
])


const actions = ref([
  {
    id: 1,
    icon: '🏴',
    title: 'Display the Flag',
    description: 'Show your support by displaying the peace flag',
    buttonText: 'Get Flag',
    color: 'blue'
  },
  {
    id: 2,
    icon: '📢',
    title: 'Spread the Word',
    description: 'Share our message with your community',
    buttonText: 'Share',
    color: 'green'
  },
  {
    id: 3,
    icon: '🤝',
    title: 'Volunteer',
    description: 'Join our community of peace ambassadors',
    buttonText: 'Join Us',
    color: 'yellow'
  }
])


const scrollToStory = () => {
  storySection.value?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToInvolved = () => {
  involvedSection.value?.scrollIntoView({ behavior: 'smooth' })
}


const startCounterAnimation = () => {
  const counters = [
    { element: 'flagsCounter', target: 1250, duration: 2000 },
    { element: 'countriesCounter', target: 89, duration: 1500 },
    { element: 'supportersCounter', target: 10000, duration: 2500 }
  ]

  counters.forEach(({ element, target, duration }) => {
    const el = document.querySelector(`[ref="${element}"]`)
    if (!el) return

    let start = 0
    const increment = target / (duration / 16) 
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        el.textContent = target.toLocaleString()
        clearInterval(timer)
      } else {
        el.textContent = Math.floor(start).toLocaleString()
      }
    }, 16)
  })
}

onMounted(() => {

  setTimeout(startCounterAnimation, 1000)
})
</script>

<style scoped>
.about-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
  min-height: 100vh;
}


.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(45deg, #fff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary, .btn-outline {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: white;
  color: #3b82f6;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: white;
  color: #3b82f6;
  transform: translateY(-2px);
}


.flag-animation {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
}

.flag-base {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.flag-blue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 33.33%;
  background: #3b82f6;
}

.flag-green {
  position: absolute;
  top: 33.33%;
  left: 0;
  width: 100%;
  height: 33.33%;
  background: #10b981;
}

.flag-white {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 33.33%;
  background: white;
}

.flag-symbols {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sun, .heart, .dove, .olive-branch {
  position: absolute;
  transition: all 0.5s ease;
}

.sun {
  width: 40px;
  height: 40px;
  background: #f59e0b;
  border-radius: 50%;
  top: -20px;
  left: -20px;
  animation: float 3s ease-in-out infinite;
}

.heart {
  width: 30px;
  height: 30px;
  background: #ef4444;
  transform: rotate(45deg);
  top: 10px;
  left: -15px;
  animation: pulse 2s ease-in-out infinite;
}

.heart::before, .heart::after {
  content: '';
  width: 30px;
  height: 30px;
  background: #ef4444;
  border-radius: 50%;
  position: absolute;
}

.heart::before { top: -15px; left: 0; }
.heart::after { top: 0; left: -15px; }

.dove {
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 50%;
}

.left-dove {
  top: -30px;
  left: -60px;
  animation: flyLeft 4s ease-in-out infinite;
}

.right-dove {
  top: -30px;
  right: -60px;
  animation: flyRight 4s ease-in-out infinite;
}

.olive-branch {
  width: 40px;
  height: 8px;
  background: #22c55e;
  border-radius: 4px;
}

.left-branch {
  bottom: -20px;
  left: -50px;
  transform: rotate(-45deg);
  animation: swayLeft 3s ease-in-out infinite;
}

.right-branch {
  bottom: -20px;
  right: -50px;
  transform: rotate(45deg);
  animation: swayRight 3s ease-in-out infinite;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  cursor: pointer;
  text-align: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.chevron {
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
  margin: 0.5rem auto 0;
  animation: bounce 2s infinite;
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #3b82f6, #10b981);
  margin: 0 auto;
  border-radius: 2px;
}


.story-section {
  padding: 6rem 0;
  background: white;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-image {
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #f0f9ff, #f0fdf4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.peace-symbol {
  width: 120px;
  height: 120px;
  border: 8px solid #3b82f6;
  border-radius: 50%;
  position: relative;
}

.peace-symbol::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: #10b981;
  border-radius: 50%;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  animation: floatAround 6s ease-in-out infinite;
}

.element-1 { top: 20%; left: 20%; animation-delay: 0s; }
.element-2 { top: 60%; left: 80%; animation-delay: 1s; }
.element-3 { top: 80%; left: 30%; animation-delay: 2s; }
.element-4 { top: 40%; left: 70%; animation-delay: 3s; }

.story-paragraph {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 2rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #dbeafe;
}

.timeline-content h3 {
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #64748b;
}


.message-section {
  padding: 6rem 0;
  background: #f8fafc;
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.symbol-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.symbol-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.symbol-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  transition: all 0.3s ease;
  background: #f0f9ff;
}

.symbol-icon.active {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  transform: scale(1.1);
}

.symbol-card h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.symbol-card p {
  color: #64748b;
  line-height: 1.6;
}

.message-text {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
}

/* Get Involved Section */
.involved-section {
  padding: 6rem 0;
  background: white;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  transition: all 0.3s ease;
  background: #f0f9ff;
}

.action-icon.hover {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  transform: scale(1.1);
}

.action-card h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.action-card p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.blue {
  background: #3b82f6;
  color: white;
}

.action-btn.green {
  background: #10b981;
  color: white;
}

.action-btn.yellow {
  background: #f59e0b;
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}


.peace-counter {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  gap: 4rem;
}

.counter-item {
  text-align: center;
}

.counter-number {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.counter-label {
  font-size: 1.125rem;
  opacity: 0.9;
}


.cta-section {
  padding: 6rem 0;
  background: #f8fafc;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary.large, .btn-outline.large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { transform: rotate(45deg) scale(1); }
  50% { transform: rotate(45deg) scale(1.1); }
}

@keyframes flyLeft {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-10px) translateY(-5px); }
}

@keyframes flyRight {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(10px) translateY(-5px); }
}

@keyframes swayLeft {
  0%, 100% { transform: rotate(-45deg); }
  50% { transform: rotate(-50deg); }
}

@keyframes swayRight {
  0%, 100% { transform: rotate(45deg); }
  50% { transform: rotate(50deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
  40% { transform: rotate(45deg) translateY(-5px); }
  60% { transform: rotate(45deg) translateY(-3px); }
}

@keyframes floatAround {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -10px) rotate(90deg); }
  50% { transform: translate(0, -20px) rotate(180deg); }
  75% { transform: translate(-10px, -10px) rotate(270deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .story-content {
    grid-template-columns: 1fr;
  }
  
  .peace-counter {
    flex-direction: column;
    gap: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .symbols-grid {
    grid-template-columns: 1fr;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
  }
}
</style>