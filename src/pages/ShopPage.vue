<template>
  <div class="shop-page">
    <!-- Background Decorations -->
    <div class="bg-decorations">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
      <div class="bg-blur bg-blur-1"></div>
      <div class="bg-blur bg-blur-2"></div>
    </div>

    <div class="container">
      <!-- Header Section -->
      <div class="shop-header">
        <div class="header-left">
          <span class="subtitle">✦ Premium Collection</span>
          <h1>Our Popular <span>Products</span></h1>
          <p class="description">Discover premium products selected just for you.</p>
        </div>
        
        <div class="header-right">
          <div class="search-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery" 
              @input="resetAndFetch"
              placeholder="Search products..." 
              class="search-input"
            />
          </div>
          
          <div class="sort-wrapper">
            <svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18M3 6h18M3 18h12"/>
            </svg>
            <select v-model="sortBy" @change="resetAndFetch" class="sort-select">
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="category-filters">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-pill"
          :class="{ active: selectedCategory === category.id }"
          @click="selectedCategory = category.id; resetAndFetch()"
        >
          {{ category.name }}
        </button>
        <button 
          class="category-pill"
          :class="{ active: selectedCategory === '' }"
          @click="selectedCategory = ''; resetAndFetch()"
        >
          All
        </button>
      </div>

      <!-- Product Grid -->
      <div v-if="loading" class="grid-loading">
        <div v-for="i in 8" :key="i" class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line medium"></div>
          </div>
        </div>
      </div>

      <div v-else-if="paginatedProducts.length" class="product-grid">
        <div 
          v-for="product in paginatedProducts" 
          :key="product.id" 
          class="product-card"
          @mouseenter="hoveredProduct = product.id"
          @mouseleave="hoveredProduct = null"
        >
          <!-- Wishlist Button -->
          <button 
            class="wishlist-btn" 
            :class="{ active: isInWishlist(product.id) }"
            @click="toggleWishlist(product.id)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          <!-- Product Image -->
          <div class="product-image-wrapper">
            <div class="product-image-bg">
              <img 
                :src="product.image_url || product.image || 'https://via.placeholder.com/400x400?text=' + product.name" 
                :alt="product.name"
                loading="lazy"
                class="product-image"
                :class="{ zoomed: hoveredProduct === product.id }"
              />
            </div>
            <div v-if="product.discount_price" class="discount-badge">
              -{{ Math.round((1 - product.discount_price / product.price) * 100) }}%
            </div>
          </div>

          <!-- Product Content -->
          <div class="product-content">
            <span class="category-badge">
              {{ product.category?.name || 'Uncategorized' }}
            </span>
            
            <h3 class="product-name">{{ product.name }}</h3>
            
            <div class="product-rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating || 0) }">★</span>
              </div>
              <span class="rating-value">{{ (product.rating || 0).toFixed(1) }}</span>
              <span class="review-count">({{ product.review_count || 0 }} reviews)</span>
            </div>
            
            <p class="product-description">{{ product.description?.substring(0, 60) }}...</p>
            
            <div class="product-price">
              <span v-if="product.discount_price" class="original-price">${{ product.price }}</span>
              <span class="current-price" :class="{ discounted: product.discount_price }">
                ${{ product.discount_price || product.price }}
              </span>
            </div>
            
            <div class="stock-status">
              <span class="stock-dot" :class="product.stock > 0 ? 'in-stock' : 'out-of-stock'"></span>
              <span class="stock-text" :class="product.stock > 0 ? 'in-stock' : 'out-of-stock'">
                {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
            
            <button 
              class="btn-add-to-cart" 
              :disabled="product.stock <= 0"
              @click="addToCart(product.id)"
            >
              <span>Add to Cart</span>
              <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            
            <div class="action-buttons">
              <button class="action-btn" @click="toggleWishlist(product.id)" title="Wishlist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button class="action-btn" @click="quickView(product.id)" title="Quick View">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
              <button class="action-btn" title="Compare">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 3h5v5M8 3H3v5M21 21l-5-5M3 21l5-5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">🛍️</div>
        <h3>No Products Found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          class="page-btn prev"
          @click="goToPage(currentPage - 1)" 
          :disabled="currentPage === 1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Previous
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          class="page-btn next"
          @click="goToPage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
        >
          Next
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      <div class="pagination-info" v-if="totalProducts > 0">
        Showing {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, totalProducts) }} of {{ totalProducts }} products
      </div>
    </div>

    <!-- Running Banner - Bigger -->
    <section class="running-banner">
      <div class="banner-container">
        <div class="banner-track" :style="{ transform: 'translateX(' + scrollPosition + 'px)' }">
          <div v-for="product in allProducts" :key="product.id" class="banner-item">
            <img :src="product.image_url || product.image || 'https://picsum.photos/seed/' + product.id + '/300/300'" :alt="product.name" />
            <div class="banner-overlay">
              <span class="banner-name">{{ product.name }}</span>
              <span class="banner-price">${{ product.price }}</span>
            </div>
          </div>
          <!-- Duplicate for seamless scroll -->
          <div v-for="product in allProducts" :key="'dup-' + product.id" class="banner-item">
            <img :src="product.image_url || product.image || 'https://picsum.photos/seed/' + product.id + '/300/300'" :alt="product.name" />
            <div class="banner-overlay">
              <span class="banner-name">{{ product.name }}</span>
              <span class="banner-price">${{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api/client'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const allProducts = ref([])
const categories = ref([])
const loading = ref(true)
const selectedCategory = ref('')
const searchQuery = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const perPage = 8
const hoveredProduct = ref(null)

// Running banner scroll
const scrollPosition = ref(0)
let animationId = null

const filteredProducts = computed(() => {
  let products = [...allProducts.value]
  
  if (selectedCategory.value) {
    products = products.filter(p => p.category_id == selectedCategory.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description?.toLowerCase().includes(query)
    )
  }
  
  switch(sortBy.value) {
    case 'price_asc':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      products.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'newest':
    default:
      products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
  }
  
  return products
})

const totalProducts = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredProducts.value.slice(start, end)
})

const isInWishlist = (productId) => {
  return wishlistStore.isInWishlist(productId)
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await api.getProducts()
    allProducts.value = response.data || []
    currentPage.value = 1
  } catch (error) {
    console.error('Error fetching products:', error)
    allProducts.value = []
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await api.getCategories()
    categories.value = response.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const resetAndFetch = () => {
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const addToCart = async (productId) => {
  if (!authStore.isAuthenticated) {
    alert('Please login to add items to cart')
    return
  }
  await cartStore.addToCart(productId)
}

const toggleWishlist = async (productId) => {
  if (!authStore.isAuthenticated) {
    alert('Please login to use wishlist')
    return
  }
  await wishlistStore.toggleWishlist(productId)
}

const quickView = (productId) => {
  router.push(`/product/${productId}`)
}

const startRunningBanner = () => {
  let position = 0
  const speed = 0.8
  
  const animate = () => {
    position -= speed
    const trackWidth = document.querySelector('.banner-track')?.offsetWidth || 2400
    
    if (Math.abs(position) >= trackWidth / 2) {
      position = 0
    }
    
    scrollPosition.value = position
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
}

onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  fetchCategories()
  fetchProducts()
  startRunningBanner()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.shop-page {
  padding: 40px 0 0;
  background: linear-gradient(180deg, #FFF9F2 0%, #FFFFFF 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* Background Decorations */
.bg-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.06;
}

.bg-circle-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #FFD54F, transparent);
  top: -200px;
  right: -200px;
  animation: float 8s ease-in-out infinite;
}

.bg-circle-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #FFC107, transparent);
  bottom: -100px;
  left: -100px;
  animation: float 6s ease-in-out infinite reverse;
}

.bg-circle-3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #FFE082, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 10s ease-in-out infinite;
}

.bg-blur {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.04;
}

.bg-blur-1 {
  width: 300px;
  height: 300px;
  background: #FFC107;
  top: 20%;
  right: 10%;
}

.bg-blur-2 {
  width: 250px;
  height: 250px;
  background: #FFD54F;
  bottom: 30%;
  left: 5%;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.05); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Header */
.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.header-left .subtitle {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  color: #FFC107;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.header-left h1 {
  font-size: 36px;
  font-weight: 800;
  color: #1A1A2E;
  margin: 0;
}

.header-left h1 span {
  color: #FFC107;
}

.header-left .description {
  font-size: 16px;
  color: #888;
  margin-top: 4px;
}

.header-right {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  width: 18px;
  height: 18px;
  color: #999;
}

.search-input {
  padding: 12px 16px 12px 44px;
  border: 2px solid #E8E8E8;
  border-radius: 30px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background: white;
  transition: all 0.3s;
  width: 250px;
}

.search-input:focus {
  outline: none;
  border-color: #FFC107;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.08);
}

.sort-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.sort-icon {
  position: absolute;
  left: 16px;
  width: 16px;
  height: 16px;
  color: #999;
}

.sort-select {
  padding: 12px 16px 12px 42px;
  border: 2px solid #E8E8E8;
  border-radius: 30px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  -webkit-appearance: none;
}

.sort-select:focus {
  outline: none;
  border-color: #FFC107;
}

/* Category Filters */
.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.category-pill {
  padding: 8px 20px;
  border: 2px solid #E8E8E8;
  border-radius: 30px;
  background: white;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  color: #555;
}

.category-pill:hover {
  border-color: #FFC107;
  color: #1A1A2E;
}

.category-pill.active {
  background: #FFC107;
  border-color: #FFC107;
  color: #1A1A2E;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* Product Card */
.product-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(255, 193, 7, 0.12);
  border-color: rgba(255, 193, 7, 0.15);
}

/* Wishlist Button */
.wishlist-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.wishlist-btn svg {
  width: 20px;
  height: 20px;
  color: #999;
  transition: all 0.3s;
}

.wishlist-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(255, 193, 7, 0.2);
}

.wishlist-btn.active svg {
  color: #FF6B6B;
  fill: #FF6B6B;
}

/* Product Image */
.product-image-wrapper {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
}

.product-image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFF3CD 100%);
  padding: 20px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.product-image.zoomed {
  transform: scale(1.08);
}

.discount-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #FFC107, #FFB300);
  color: #1A1A2E;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
  z-index: 5;
}

/* Product Content */
.product-content {
  padding: 20px 22px 24px;
}

.category-badge {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(255, 193, 7, 0.12);
  color: #FFB300;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  font-size: 17px;
  font-weight: 700;
  color: #1A1A2E;
  margin: 8px 0 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #E0E0E0;
  font-size: 13px;
  transition: color 0.3s;
}

.star.filled {
  color: #FFC107;
}

.rating-value {
  font-weight: 600;
  color: #1A1A2E;
  font-size: 13px;
}

.review-count {
  color: #999;
  font-size: 12px;
}

.product-description {
  color: #888;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.original-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
}

.current-price {
  font-size: 22px;
  font-weight: 800;
  color: #1A1A2E;
}

.current-price.discounted {
  color: #FFC107;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.stock-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.stock-dot.in-stock {
  background: #2ecc71;
}

.stock-dot.out-of-stock {
  background: #e74c3c;
}

.stock-text {
  font-size: 12px;
  font-weight: 500;
}

.stock-text.in-stock {
  color: #2ecc71;
}

.stock-text.out-of-stock {
  color: #e74c3c;
}

/* Add to Cart Button */
.btn-add-to-cart {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #FFC107, #FFB300);
  color: #1A1A2E;
  border: none;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;
  font-family: 'Inter', sans-serif;
}

.btn-add-to-cart::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-add-to-cart:hover:not(:disabled)::before {
  left: 100%;
}

.btn-add-to-cart:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
}

.btn-add-to-cart:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-icon {
  width: 18px;
  height: 18px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.action-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #E8E8E8;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  color: #999;
  transition: all 0.3s;
}

.action-btn:hover {
  border-color: #FFC107;
  background: #FFF9E6;
  transform: translateY(-2px);
}

.action-btn:hover svg {
  color: #FFC107;
}

/* Loading Skeleton */
.grid-loading {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.skeleton-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.skeleton-image {
  width: 100%;
  padding-top: 100%;
  background: linear-gradient(135deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 20px 22px 24px;
}

.skeleton-line {
  height: 14px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
  margin-bottom: 10px;
}

.skeleton-line.short {
  width: 60%;
}

.skeleton-line.medium {
  width: 80%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 24px;
  color: #1A1A2E;
  margin-bottom: 8px;
}

.empty-state p {
  color: #999;
  font-size: 16px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
}

.page-btn {
  padding: 10px 20px;
  border: 2px solid #E8E8E8;
  border-radius: 30px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.page-btn:hover:not(:disabled) {
  border-color: #FFC107;
  color: #1A1A2E;
  transform: translateY(-2px);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn.active {
  background: #FFC107;
  border-color: #FFC107;
  color: #1A1A2E;
}

.page-btn svg {
  width: 18px;
  height: 18px;
}

.page-numbers {
  display: flex;
  gap: 6px;
}

.pagination-info {
  text-align: center;
  margin-top: 12px;
  color: #999;
  font-size: 14px;
}

/* Running Banner - Bigger */
.running-banner {
  background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
  padding: 30px 0;
  margin-top: 50px;
  overflow: hidden;
  width: 100%;
  border-top: 3px solid #FFC107;
  border-bottom: 3px solid #FFC107;
  position: relative;
}

.banner-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.banner-track {
  display: flex;
  gap: 0;
  transition: none;
}

.banner-item {
  position: relative;
  flex-shrink: 0;
  width: 280px;
  height: 200px;
  overflow: hidden;
  transition: transform 0.3s;
}

.banner-item:hover {
  transform: scale(1.05);
  z-index: 10;
}

.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  color: white;
  text-align: center;
}

.banner-name {
  display: block;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Inter', sans-serif;
}

.banner-price {
  display: block;
  font-size: 15px;
  font-weight: bold;
  color: #FFD700;
  margin-top: 4px;
  font-family: 'Inter', sans-serif;
}

/* Responsive */
@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-loading {
    grid-template-columns: repeat(3, 1fr);
  }
  .banner-item {
    width: 220px;
    height: 160px;
  }
}

@media (max-width: 992px) {
  .shop-header {
    flex-direction: column;
    align-items: stretch;
  }
  .header-right {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-loading {
    grid-template-columns: repeat(2, 1fr);
  }
  .banner-item {
    width: 180px;
    height: 140px;
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .grid-loading {
    grid-template-columns: 1fr;
  }
  .header-left h1 {
    font-size: 28px;
  }
  .pagination {
    flex-wrap: wrap;
  }
  .page-numbers {
    order: 3;
    width: 100%;
    justify-content: center;
  }
  .page-btn.prev {
    order: 1;
  }
  .page-btn.next {
    order: 2;
  }
  .banner-item {
    width: 140px;
    height: 110px;
  }
  .banner-name {
    font-size: 13px;
  }
  .banner-price {
    font-size: 12px;
  }
  .running-banner {
    padding: 15px 0;
  }
}
</style>
