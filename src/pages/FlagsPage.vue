<template>
  <div class="flags-page">
    <Navbar />
    
    <div class="flags-container">
      <h1 class="page-title">Peace Flags Collection</h1>
      <p class="page-subtitle">Each flag represents a message of unity and hope. Download high-quality PDFs for display or purchase physical copies.</p>
      
      <div class="filter-controls">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search flags..." 
            @input="filterFlags"
          >
          <span class="search-icon">🔍</span>
        </div>
        <select v-model="sortOption" @change="sortFlags" class="sort-select">
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      
      <div class="flags-grid">
        <div 
          v-for="flag in filteredFlags" 
          :key="flag.id" 
          class="flag-card"
          @mouseenter="hoveredFlag = flag.id"
          @mouseleave="hoveredFlag = null"
        >
          <div class="flag-preview">
            <!-- Watermarked PDF preview -->
            <div class="pdf-preview" @click="openPreview(flag)">
                {{ flag.pdf_url }}
              <img 
                :src="getFullImageUrl(flag.pdf_url)"
                :alt="flag.name"
                class="flag-image"
              />
              <div class="watermark">PEACE FLAGS</div>
              <div class="preview-overlay">
                <span>Click to Preview</span>
              </div>
            </div>
            
            <!-- Quick add to cart button that appears on hover -->
            <button 
              v-if="hoveredFlag === flag.id"
              class="quick-add-btn"
              @click.stop="addToCart(flag)"
            >
              Add to Cart
            </button>
          </div>
          
          <div class="flag-details">
            <h3>{{ flag.name }}</h3>
            <p class="flag-description">{{ flag.description }}</p>
            <div class="flag-footer">
              <span class="flag-price">${{ flag.price }}</span>
              <div class="flag-actions">
                <button 
                  class="details-btn"
                  @click="openFlagDetails(flag)"
                >
                  Details
                </button>
                <button 
                  class="add-to-cart-btn"
                  @click="addToCart(flag)"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- PDF Preview Modal -->
    <div v-if="showPreview" class="preview-modal">
      <div class="modal-content">
        <button class="close-modal" @click="showPreview = false">×</button>
        <h2>{{ selectedFlag.name }}</h2>
        <div class="modal-pdf-container">
          <iframe 
            :src="selectedFlag.pdf_url + '#view=fitH'" 
            class="pdf-iframe"
            frameborder="0"
          ></iframe>
          <div class="modal-watermark">SAMPLE PREVIEW</div>
        </div>
        <div class="modal-actions">
          <button class="btn-outline" @click="showPreview = false">Close</button>
          <button class="btn-primary" @click="addToCart(selectedFlag)">
            Add to Cart (${{ selectedFlag.price }})
          </button>
        </div>
      </div>
    </div>
    
    <!-- Flag Details Modal -->
    <div v-if="showDetails" class="details-modal">
      <div class="modal-content">
        <button class="close-modal" @click="showDetails = false">×</button>
        <div class="details-container">
          <div class="details-image">
            <img :src="selectedFlag.image_url" :alt="selectedFlag.name" />
          </div>
          <div class="details-info">
            <h2>{{ selectedFlag.name }}</h2>
            <p class="details-description">{{ selectedFlag.description }}</p>
            <div class="details-meta">
              <div class="meta-item">
                <span class="meta-label">Price:</span>
                <span class="meta-value">${{ selectedFlag.price }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Format:</span>
                <span class="meta-value">High-quality PDF</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Dimensions:</span>
                <span class="meta-value">A4, A3, Letter sizes available</span>
              </div>
            </div>
            <div class="details-actions">
              <button 
                class="btn-outline"
                @click="showPreview = true; showDetails = false"
              >
                Preview Design
              </button>
              <button 
                class="btn-primary"
                @click="addToCart(selectedFlag)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import axios from "axios";
const flags = ref([])
const searchQuery = ref('')
const sortOption = ref('name-asc')
const hoveredFlag = ref(null)
const showPreview = ref(false)
const showDetails = ref(false)
const selectedFlag = ref(null)

// Fetch flags from backend
onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`);
    flags.value = response.data.data.map(flag => ({
      ...flag,
      pdf_url: flag.image_url || '/sample-flag.pdf' // Using image_url as pdf_url
    }));
  } catch (error) {
    console.error('Error fetching flags:', error);
    // You might want to add user feedback here, like:
    // toast.error('Failed to load flags. Please try again later.');
  }
})


// Filter and sort flags
const filteredFlags = computed(() => {
  let result = [...flags.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(flag =>
      flag.name.toLowerCase().includes(query) ||
      flag.description.toLowerCase().includes(query)
    )
  }

  const [sortBy, order] = sortOption.value.split('-')
  result.sort((a, b) => {
    if (sortBy === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else {
      return order === 'asc'
        ? a.price - b.price
        : b.price - a.price
    }
  })

  return result
})

const openPreview = (flag) => {
  selectedFlag.value = flag
  showPreview.value = true
}

const getFullImageUrl = (url) => {
  if (!url) return '/placeholder-flag.jpg'

  if (url.startsWith('http')) return url

  return `${import.meta.env.VITE_API_URL}/${url}`
}

const openFlagDetails = (flag) => {
  selectedFlag.value = flag
  showDetails.value = true
}

const addToCart = (flag) => {
  alert(`Added "${flag.name}" to cart!`)
  console.log('Added to cart:', flag)
}
</script>


<style scoped>
.flags-page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  min-height: 100vh;
  padding-bottom: 3rem;
}

.flags-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0077cc;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #0077cc, #00aaff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.search-box input:focus {
  outline: none;
  border-color: #0077cc;
  box-shadow: 0 2px 15px rgba(0, 119, 204, 0.2);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}

.sort-select {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.sort-select:focus {
  outline: none;
  border-color: #0077cc;
}

.flags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.flag-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.flag-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.flag-preview {
  position: relative;
  padding-top: 100%; /* Square aspect ratio */
  overflow: hidden;
}

.flag-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.flag-card:hover .flag-image {
  transform: scale(1.05);
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 119, 204, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.preview-overlay span {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.pdf-preview:hover .preview-overlay {
  opacity: 1;
  cursor: pointer;
}

.quick-add-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: #ff4081;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.quick-add-btn:hover {
  background: #e91e63;
  transform: translateY(-2px);
}

.flag-details {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.flag-details h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.flag-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex: 1;
}

.flag-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.flag-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #0077cc;
}

.flag-actions {
  display: flex;
  gap: 0.5rem;
}

.details-btn, .add-to-cart-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-btn {
  background: #f0f0f0;
  color: #333;
}

.details-btn:hover {
  background: #e0e0e0;
}

.add-to-cart-btn {
  background: #0077cc;
  color: white;
}

.add-to-cart-btn:hover {
  background: #005fa3;
}

/* Modal Styles */
.preview-modal, .details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
  transition: color 0.3s ease;
}

.close-modal:hover {
  color: #333;
}

.modal-pdf-container {
  position: relative;
  width: 100%;
  height: 70vh;
  margin: 1rem 0;
  border: 1px solid #eee;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
}

.modal-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 4rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-outline, .btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline {
  border: 2px solid #0077cc;
  background: transparent;
  color: #0077cc;
}

.btn-outline:hover {
  background: #f0f8ff;
}

.btn-primary {
  background: #0077cc;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #005fa3;
}

.details-container {
  display: flex;
  gap: 2rem;
}

.details-image {
  flex: 1;
  min-width: 300px;
}

.details-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.details-info {
  flex: 1;
}

.details-description {
  color: #555;
  line-height: 1.6;
  margin: 1rem 0;
}

.details-meta {
  margin: 1.5rem 0;
}

.meta-item {
  display: flex;
  margin-bottom: 0.75rem;
}

.meta-label {
  font-weight: bold;
  color: #333;
  min-width: 100px;
}

.meta-value {
  color: #555;
}

.details-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .details-container {
    flex-direction: column;
  }
  
  .flags-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }
  
  .modal-actions, .details-actions {
    flex-direction: column;
  }
}
</style>


