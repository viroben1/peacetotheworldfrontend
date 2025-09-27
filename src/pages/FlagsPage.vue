<template>
  <div class="flags-page">
    <Navbar />

    <div class="flags-container">
      <div class="page-header">
        <h1 class="page-title">Peace Flags Collection</h1>
        <p class="page-subtitle">
          Each flag represents a message of unity and hope. Download
          high-quality PDFs for display or purchase physical copies.
        </p>
      </div>

      <div class="filter-controls">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search flags by name or description..."
            @input="handleSearch"
            aria-label="Search flags"
          />
          <span class="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>

        <div class="filter-group">
          <label for="sort-select" class="filter-label">Sort by:</label>
          <select
            id="sort-select"
            v-model="sortOption"
            @change="handleSortChange"
            class="sort-select"
            aria-label="Sort options"
          >
            <option value="created_at-DESC">Newest First</option>
            <option value="created_at-ASC">Oldest First</option>
            <option value="name-ASC">Name (A-Z)</option>
            <option value="name-DESC">Name (Z-A)</option>
            <option value="price-ASC">Price (Low to High)</option>
            <option value="price-DESC">Price (High to Low)</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="limit-select" class="filter-label">Items per page:</label>
          <select
            id="limit-select"
            v-model="limit"
            @change="fetchProducts"
            class="sort-select"
            aria-label="Items per page"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading peace flags...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>Failed to load flags</h3>
        <p>{{ error }}</p>
        <button @click="fetchProducts" class="retry-btn">Try Again</button>
      </div>

      <template v-else>
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <h3>No flags found</h3>
          <p v-if="searchQuery">Try adjusting your search query</p>
          <p v-else>There are currently no flags available</p>
        </div>

        <div v-else class="flags-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="flag-card"
            @mouseenter="hoveredFlag = product.id"
            @mouseleave="hoveredFlag = null"
          >
            <div class="flag-preview">
              <!-- Watermarked image from backend -->
              <div class="image-container">
                <img
                  v-if="product.watermark_image_base64"
                  :src="product.watermark_image_base64"
                  :alt="product.name"
                  class="flag-image"
                  loading="lazy"
                />
                <div v-else class="image-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>

                <div class="preview-overlay" @click="openPreview(product)">
                  <span>Preview Design</span>
                </div>
              </div>

              <!-- Quick add to cart button that appears on hover -->
              <button
                v-if="hoveredFlag === product.id"
                class="quick-add-btn"
                @click.stop="handleAddToCart(product)"
                aria-label="Add to cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path
                    d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                  ></path>
                </svg>
                Add to Cart
              </button>
            </div>

            <div class="flag-details">
              <h3>{{ product.name }}</h3>
              <p class="flag-description">
                {{ truncateDescription(product.description) }}
              </p>
              <div class="flag-footer">
                <span class="flag-price">${{ product.price }}</span>
                <div class="flag-actions">
                  <button
                    class="details-btn"
                    @click="openFlagDetails(product)"
                    aria-label="View details"
                  >
                    Details
                  </button>
                  <button
                    class="add-to-cart-btn"
                    @click="handleAddToCart(product)"
                    aria-label="Add to cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path
                        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                      ></path>
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="pagination.totalPages > 1" class="pagination">
          <button
            @click="changePage(pagination.currentPage - 1)"
            :disabled="pagination.currentPage === 1"
            class="pagination-btn"
            aria-label="Previous page"
          >
            &larr;
          </button>

          <span class="page-info">
            Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
          </span>

          <button
            @click="changePage(pagination.currentPage + 1)"
            :disabled="pagination.currentPage === pagination.totalPages"
            class="pagination-btn"
            aria-label="Next page"
          >
            &rarr;
          </button>
        </div>
      </template>
    </div>

    <!-- PDF Preview Modal -->
    <div
      v-if="showPreview"
      class="preview-modal"
      @click.self="showPreview = false"
    >
      <div class="modal-content">
        <button
          class="close-modal"
          @click="showPreview = false"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2>{{ selectedFlag.name }}</h2>
        <div class="modal-pdf-container">
          <img
            v-if="selectedFlag.watermark_image_base64"
            :src="selectedFlag.watermark_image_base64"
            class="pdf-iframe"
            loading="lazy"
          />
        </div>
        <div class="modal-actions">
          <button class="btn-outline" @click="showPreview = false">
            Close Preview
          </button>
          <button class="btn-primary" @click="handleAddToCart(selectedFlag)">
            Add to Cart - ${{ selectedFlag.price }}
          </button>
        </div>
      </div>
    </div>

    <!-- Flag Details Modal -->
    <div
      v-if="showDetails"
      class="details-modal"
      @click.self="showDetails = false"
    >
      <div class="modal-content">
        <button
          class="close-modal"
          @click="showDetails = false"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="details-container">
          <div class="details-image">
            <img
              v-if="selectedFlag.watermark_image_base64"
              :src="selectedFlag.watermark_image_base64"
              :alt="selectedFlag.name"
              loading="lazy"
            />
            <div v-else class="image-placeholder large">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
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
                <span class="meta-label">Stock:</span>
                <span class="meta-value"
                  >{{ selectedFlag.stock }} available</span
                >
              </div>
              <div class="meta-item">
                <span class="meta-label">Created:</span>
                <span class="meta-value"
                  >{{ formatDate(selectedFlag.created_at) }}</span
                >
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
                @click="handleAddToCart(selectedFlag)"
              >
                Add to Cart - ${{ selectedFlag.price }}
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
  import { useCart } from '../composables/useCart'

  // Import cart functionality
  const { addToCart } = useCart()

  // Your existing reactive variables
  const products = ref([])
  const searchQuery = ref('')
  const sortOption = ref('created_at-DESC')
  const hoveredFlag = ref(null)
  const showPreview = ref(false)
  const showDetails = ref(false)
  const selectedFlag = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const limit = ref(12)
  const page = ref(1)

  const pagination = ref({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 12
  })


  const handleAddToCart = (product) => {
    addToCart(product)
  }

 
  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const [sortBy, order] = sortOption.value.split('-')

      const params = {
        search: searchQuery.value,
        sort: sortBy,
        order,
        page: page.value,
        limit: limit.value
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`, { params })

      products.value = response.data.data.map(product => ({
        ...product,
        pdf_url: product.image_url // Using image_url as pdf_url for the iframe preview
      }))

      pagination.value = {
        totalItems: response.data.pagination.totalItems,
        totalPages: response.data.pagination.totalPages,
        currentPage: response.data.pagination.currentPage,
        itemsPerPage: response.data.pagination.itemsPerPage
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = err.response?.data?.error || 'Failed to load products. Please try again later.'
    } finally {
      loading.value = false
    }
  }

  // Handle search with debounce
  let searchTimeout = null
  const handleSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      page.value = 1
      fetchProducts()
    }, 500)
  }

  // Handle sort change
  const handleSortChange = () => {
    page.value = 1
    fetchProducts()
  }

  // Change page
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.value.totalPages) {
      page.value = newPage
      fetchProducts()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }


  const truncateDescription = (description) => {
    if (!description) return ''
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description
  }

  const openPreview = (product) => {
    selectedFlag.value = product
    showPreview.value = true
  }

  const openFlagDetails = (product) => {
    selectedFlag.value = product
    showDetails.value = true
  }

  
  const filteredProducts = computed(() => {
    return products.value
  })

  onMounted(() => {
    fetchProducts()
  })
</script>

<style scoped>
/* Base Styles */
.flags-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.flags-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  flex: 1;
  width: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.search-box input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  display: flex;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.sort-select {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  min-width: 160px;
}

.sort-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading and Error States */
.loading-state, .error-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.loading-state svg, .error-state svg, .empty-state svg {
  margin-bottom: 1.5rem;
  color: #3b82f6;
}

.error-state svg {
  color: #ef4444;
}

.empty-state svg {
  color: #94a3b8;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state h3, .empty-state h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.error-state p, .empty-state p {
  color: #64748b;
  margin-bottom: 1.5rem;
  max-width: 400px;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #2563eb;
}

/* Flags Grid */
.flags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.75rem;
  margin-bottom: 3rem;
}

.flag-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f5f9;
}

.flag-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
  border-color: #e2e8f0;
}

.flag-preview {
  position: relative;
  padding-top: 100%; /* Square aspect ratio */
  overflow: hidden;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8fafc;
}

.flag-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
  background-color: white;
}

.flag-card:hover .flag-image {
  transform: scale(1.03);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  background-color: #f8fafc;
}

.image-placeholder.large {
  color: #94a3b8;
}

.image-placeholder svg {
  width: 40%;
  height: 40%;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 41, 59, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  cursor: pointer;
}

.preview-overlay span {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(99, 102, 241, 0.9);
  border-radius: 6px;
}

.flag-card:hover .preview-overlay {
  opacity: 1;
}

.quick-add-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-add-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.quick-add-btn svg {
  width: 16px;
  height: 16px;
}

.flag-details {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f1f5f9;
}

.flag-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1e293b;
}

.flag-description {
  color: #64748b;
  font-size: 0.9375rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex: 1;
}

.flag-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.flag-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
}

.flag-actions {
  display: flex;
  gap: 0.75rem;
}

.details-btn, .add-to-cart-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.details-btn {
  background: #f1f5f9;
  color: #334155;
}

.details-btn:hover {
  background: #e2e8f0;
}

.add-to-cart-btn {
  background: #3b82f6;
  color: white;
}

.add-to-cart-btn:hover {
  background: #2563eb;
}

.add-to-cart-btn svg {
  width: 14px;
  height: 14px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9375rem;
  color: #64748b;
  font-weight: 500;
}

/* Modal Styles */
.preview-modal, .details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-modal {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  transition: color 0.2s ease;
  padding: 0.5rem;
  border-radius: 50%;
}

.close-modal:hover {
  color: #64748b;
  background-color: #f1f5f9;
}

.close-modal svg {
  width: 24px;
  height: 24px;
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.modal-pdf-container {
  position: relative;
  width: 100%;
  height: 60vh;
  margin: 1.5rem 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8fafc;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-outline, .btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
}

.btn-outline {
  border: 1px solid #3b82f6;
  background: transparent;
  color: #3b82f6;
}

.btn-outline:hover {
  background: #f8fafc;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #2563eb;
}

.details-container {
  display: flex;
  gap: 2.5rem;
}

.details-image {
  flex: 1;
  min-width: 300px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8fafc;
}

.details-image img {
  width: 100%;
  height: auto;
  display: block;
}

.details-info {
  flex: 1;
  min-width: 0;
}

.details-description {
  color: #475569;
  line-height: 1.6;
  margin: 1.5rem 0;
}

.details-meta {
  margin: 2rem 0;
}

.meta-item {
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.meta-label {
  font-weight: 500;
  color: #334155;
  min-width: 120px;
}

.meta-value {
  color: #64748b;
}

.details-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .flags-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .details-container {
    flex-direction: column;
  }
  
  .details-image {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.25rem;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .search-box {
    min-width: 100%;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .sort-select {
    width: 100%;
  }
  
  .flags-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  
  .modal-content {
    padding: 1.5rem;
    width: 95%;
  }
  
  .modal-actions, .details-actions {
    flex-direction: column;
  }
  
  .btn-outline, .btn-primary {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .flags-container {
    padding: 1.5rem 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .flags-grid {
    grid-template-columns: 1fr;
  }
  
  .flag-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .details-btn, .add-to-cart-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>