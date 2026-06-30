<template>
  <div class="featured-products-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title">
        <h2>Featured Products</h2>
        <div class="title-underline"></div>
        <p>Curated collection of our finest selections</p>
      </div>

      <!-- Products Grid -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading featured products...</p>
      </div>

      <div v-else-if="featuredProducts.length" class="products-grid">
        <!-- Navigation Buttons -->
        <button class="nav-btn nav-left" @click="prevSlide">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Product Cards -->
        <div 
          v-for="(product, index) in displayedProducts" 
          :key="product.id" 
          class="product-card"
        >
          <div class="product-image-wrapper">
            <img 
              :src="product.image || `https://picsum.photos/seed/${product.id}/400/500`" 
              :alt="product.name" 
              class="product-image"
            />
            <span class="new-badge">NEW</span>
          </div>
          
          <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description?.substring(0, 50) }}...</p>
            <div class="product-price">
              <span class="price-currency">$</span>
              <span class="price-amount">{{ product.price }}</span>
            </div>
            <router-link :to="'/product/' + product.id" class="btn-view">
              View Details →
            </router-link>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button class="nav-btn nav-right" @click="nextSlide">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div v-else class="no-products">
        <p>No featured products available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '../api/client'

const products = ref([])
const featuredProducts = ref([])
const loading = ref(true)
const currentIndex = ref(0)

const displayedProducts = computed(() => {
  return featuredProducts.value.slice(currentIndex.value, currentIndex.value + 3)
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await api.getProducts()
    const data = response.data.data || response.data || []
    featuredProducts.value = data.slice(0, 3)
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const nextSlide = () => {
  if (currentIndex.value + 3 < featuredProducts.value.length) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = Math.max(0, featuredProducts.value.length - 3)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.featured-products-section {
  padding: 50px 0;
  background: linear-gradient(180deg, #FFF9E6 0%, #FFE082 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

.featured-products-section::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(244, 180, 0, 0.06) 0%, transparent 70%);
  border-radius: 50%;
}

.featured-products-section::after {
  content: '';
  position: absolute;
  bottom: -200px;
  left: -200px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 213, 79, 0.05) 0%, transparent 70%);
  border-radius: 50%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Section Title - Smaller */
.section-title {
  text-align: center;
  margin-bottom: 35px;
}

.section-title h2 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2D2D2D;
  text-transform: uppercase;
}

.section-title h2 span {
  color: #F4B400;
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #F4B400, #FFD54F);
  margin: 10px auto 14px;
  border-radius: 2px;
}

.section-title p {
  font-size: 14px;
  color: #8a8a8a;
  font-weight: 300;
  letter-spacing: 0.5px;
}

/* Products Grid */
.products-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  position: relative;
}

/* Navigation Buttons */
.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #F4B400;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(244, 180, 0, 0.25);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.nav-btn:hover {
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.35);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.nav-left {
  left: -15px;
}

.nav-right {
  right: -15px;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
  color: white;
}

/* Product Cards */
.product-card {
  flex: 1;
  max-width: 300px;
  min-width: 240px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 0 0 22px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.4);
  animation: fadeUp 0.8s ease forwards;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(244, 180, 0, 0.12);
  border-color: rgba(244, 180, 0, 0.15);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }

/* Product Image - Smaller */
.product-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.new-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 16px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(244, 180, 0, 0.2);
}

/* Product Details */
.product-details {
  padding: 16px 18px 0;
  text-align: center;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #2D2D2D;
  margin-bottom: 4px;
  letter-spacing: 0.3px;
}

.product-description {
  font-size: 12px;
  color: #8a8a8a;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.4;
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-bottom: 14px;
}

.price-currency {
  font-size: 16px;
  font-weight: 600;
  color: #F4B400;
}

.price-amount {
  font-size: 22px;
  font-weight: 700;
  color: #F4B400;
  letter-spacing: -0.5px;
}

.btn-view {
  display: inline-block;
  padding: 10px 28px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  color: #fff;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 15px rgba(244, 180, 0, 0.2);
}

.btn-view:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.3);
}

.loading {
  text-align: center;
  padding: 40px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(244, 180, 0, 0.1);
  border-top-color: #F4B400;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-products {
  text-align: center;
  padding: 30px;
  color: #8a8a8a;
  font-size: 14px;
}

@media (max-width: 900px) {
  .products-grid { gap: 18px; }
  .product-card { max-width: 260px; min-width: 200px; }
  .nav-btn { width: 38px; height: 38px; }
  .nav-left { left: -10px; }
  .nav-right { right: -10px; }
  .section-title h2 { font-size: 24px; }
}

@media (max-width: 768px) {
  .products-grid { flex-wrap: wrap; justify-content: center; gap: 20px; }
  .product-card { max-width: 280px; min-width: 220px; }
  .nav-btn { display: none; }
  .section-title h2 { font-size: 22px; }
}

@media (max-width: 480px) {
  .featured-products-section { padding: 30px 0; }
  .product-card { max-width: 100%; min-width: 180px; }
  .section-title h2 { font-size: 20px; }
  .price-amount { font-size: 20px; }
}
</style>
