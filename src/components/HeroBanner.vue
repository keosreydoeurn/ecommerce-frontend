<template>
  <div class="hero-banner">
    <div class="hero-slider">
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="hero-slide"
        :class="{ active: currentSlide === index }"
      >
        <div class="hero-background" :style="{ background: slide.background }">
          <!-- Decorative Elements -->
          <div class="deco-circle" :style="{ background: slide.accentColor }"></div>
          <div class="deco-blob" :style="{ background: slide.accentColor }"></div>
          
          <div class="container">
            <div class="hero-content">
              <!-- Left Content -->
              <div class="hero-text">
                <span class="badge" :style="{ background: slide.accentColor, color: '#1A1A2E' }">
                  {{ slide.badge }}
                </span>
                
                <h1>{{ slide.headline }}</h1>
                <h2>{{ slide.subtitle }}</h2>
                <p>{{ slide.description }}</p>
                
                <div class="benefits">
                  <span v-for="benefit in slide.benefits" :key="benefit" class="benefit-item">
                    <span class="benefit-icon">✦</span>
                    {{ benefit }}
                  </span>
                </div>
                
                <div class="hero-stats">
                  <div class="stat-item">
                    <span class="stat-value">⭐ {{ slide.rating }}</span>
                    <span class="stat-label">Rating</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-value">{{ slide.productCount }}+</span>
                    <span class="stat-label">Products</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-value">${{ slide.startPrice }}</span>
                    <span class="stat-label">Starting Price</span>
                  </div>
                </div>
                
                <div class="hero-buttons">
                  <router-link :to="'/shop?category=' + slide.categoryId" class="btn-primary">
                    Shop Now →
                  </router-link>
                  <router-link :to="'/shop?category=' + slide.categoryId" class="btn-secondary">
                    View Collection
                  </router-link>
                </div>
              </div>
              
              <!-- Right Content - Products -->
              <div class="hero-products">
                <div class="platform">
                  <div class="products-display">
                    <div 
                      v-for="(product, pIndex) in slide.products" 
                      :key="product.id"
                      class="product-item"
                      :class="[
                        'product-' + (pIndex + 1),
                        { 'floating': pIndex === 1 }
                      ]"
                      :style="{ 
                        transform: `rotate(${pIndex === 0 ? -5 : pIndex === 2 ? 5 : 0}deg) translateY(${pIndex === 1 ? -20 : 0}px)`,
                        zIndex: 3 - pIndex
                      }"
                    >
                      <img 
                        :src="product.image_url || product.image || 'https://via.placeholder.com/300x300?text=' + product.name" 
                        :alt="product.name"
                        loading="lazy"
                      />
                      <div class="product-reflection"></div>
                    </div>
                  </div>
                  
                  <!-- Decorative Elements -->
                  <div class="deco-leaf leaf-1">
                    <svg viewBox="0 0 100 100" fill="none">
                      <path d="M50 10 C30 30 10 50 20 80 C30 90 60 85 80 70 C95 55 90 30 70 15 C60 8 55 12 50 10Z" fill="#2d5016" opacity="0.6"/>
                      <path d="M50 10 C40 25 30 45 35 65 C40 75 55 70 70 60 C80 50 75 30 60 20 C55 15 52 12 50 10Z" fill="#3a6b1e" opacity="0.4"/>
                    </svg>
                  </div>
                  <div class="deco-leaf leaf-2">
                    <svg viewBox="0 0 100 100" fill="none">
                      <path d="M50 10 C30 30 10 50 20 80 C30 90 60 85 80 70 C95 55 90 30 70 15 C60 8 55 12 50 10Z" fill="#2d5016" opacity="0.4"/>
                    </svg>
                  </div>
                  <div class="deco-flower">
                    <span>🌸</span>
                  </div>
                  <div class="deco-glass">
                    <svg viewBox="0 0 200 200" fill="none">
                      <ellipse cx="100" cy="100" rx="80" ry="60" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                      <ellipse cx="100" cy="100" rx="60" ry="40" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Slide Indicators -->
          <div class="slider-controls">
            <button class="nav-btn prev" @click="prevSlide">
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
            <div class="dots">
              <span 
                v-for="(slide, index) in slides" 
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
              ></span>
            </div>
            <button class="nav-btn next" @click="nextSlide">
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { api } from '../api/client'

const slides = ref([])
const currentSlide = ref(0)
let autoPlayInterval = null

// Category configurations
const categoryConfigs = {
  'Electronics': {
    headline: 'Premium Electronics',
    subtitle: 'Innovation at Your Fingertips',
    badge: '★ BEST SELLERS',
    benefits: ['✓ Premium Quality', '✓ Latest Technology', '✓ 1 Year Warranty', '✓ Free Shipping'],
    background: 'linear-gradient(135deg, #FEF9E7 0%, #FDEBD0 50%, #FAD7A0 100%)',
    accentColor: '#F4B400'
  },
  'Clothing': {
    headline: 'Fashion Collection',
    subtitle: 'Style That Speaks Volumes',
    badge: '★ NEW ARRIVALS',
    benefits: ['✓ Premium Fabrics', '✓ Trendy Designs', '✓ Perfect Fit', '✓ Fast Delivery'],
    background: 'linear-gradient(135deg, #FDF2E9 0%, #FADBD8 50%, #F5B7B1 100%)',
    accentColor: '#E74C3C'
  },
  'Books': {
    headline: 'Literary Treasures',
    subtitle: 'Discover Your Next Great Read',
    badge: '★ BESTSELLERS',
    benefits: ['✓ Curated Selection', '✓ Award Winners', '✓ New Releases', '✓ Free Delivery'],
    background: 'linear-gradient(135deg, #F5EEF8 0%, #E8DAEF 50%, #D2B4DE 100%)',
    accentColor: '#8E44AD'
  },
  'Home & Kitchen': {
    headline: 'Home Essentials',
    subtitle: 'Elevate Your Living Space',
    badge: '★ TOP RATED',
    benefits: ['✓ Premium Quality', '✓ Modern Design', '✓ Easy Setup', '✓ Satisfaction Guaranteed'],
    background: 'linear-gradient(135deg, #EAFAF1 0%, #D5F5E3 50%, #A9DFBF 100%)',
    accentColor: '#27AE60'
  }
}

const generateHeroSlides = async () => {
  try {
    // Fetch categories
    const categoriesRes = await api.getCategories()
    const categories = categoriesRes.data || []
    
    // Fetch products
    const productsRes = await api.getProducts()
    const allProducts = productsRes.data || []
    
    const heroSlides = categories.map(category => {
      // Get products for this category
      const categoryProducts = allProducts
        .filter(p => p.category_id === category.id)
        .slice(0, 3)
      
      // Get config or use default
      const config = categoryConfigs[category.name] || {
        headline: category.name,
        subtitle: 'Discover Our Collection',
        badge: '★ FEATURED',
        benefits: ['✓ Premium Quality', '✓ Best Price', '✓ Fast Shipping', '✓ Satisfaction Guaranteed'],
        background: 'linear-gradient(135deg, #FEF9E7 0%, #FDEBD0 50%, #FAD7A0 100%)',
        accentColor: '#F4B400'
      }
      
      // Calculate stats
      const totalProducts = allProducts.filter(p => p.category_id === category.id).length
      const avgRating = 4.8 // Placeholder
      const minPrice = categoryProducts.length > 0 ? Math.min(...categoryProducts.map(p => p.price)) : 19.99
      
      return {
        id: category.id,
        categoryId: category.id,
        name: category.name,
        ...config,
        products: categoryProducts,
        productCount: totalProducts,
        rating: avgRating,
        startPrice: minPrice.toFixed(2),
        description: `Discover our premium ${category.name.toLowerCase()} collection. Handpicked items designed to bring you the best quality and value.`,
        headline: config.headline || `Premium ${category.name}`,
        subtitle: config.subtitle || `Discover Our ${category.name} Collection`
      }
    })
    
    slides.value = heroSlides.length > 0 ? heroSlides : getFallbackSlides()
  } catch (error) {
    console.error('Error generating hero slides:', error)
    slides.value = getFallbackSlides()
  }
}

const getFallbackSlides = () => {
  return [
    {
      id: 1,
      categoryId: 1,
      name: 'Electronics',
      headline: 'Premium Electronics',
      subtitle: 'Innovation at Your Fingertips',
      badge: '★ BEST SELLERS',
      benefits: ['✓ Premium Quality', '✓ Latest Technology', '✓ 1 Year Warranty', '✓ Free Shipping'],
      background: 'linear-gradient(135deg, #FEF9E7 0%, #FDEBD0 50%, #FAD7A0 100%)',
      accentColor: '#F4B400',
      products: [],
      productCount: 0,
      rating: 4.8,
      startPrice: '19.99',
      description: 'Discover our premium electronics collection. Handpicked items designed to bring you the best quality and value.'
    }
  ]
}

const nextSlide = () => {
  if (slides.value.length === 0) return
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  if (slides.value.length === 0) return
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(async () => {
  await generateHeroSlides()
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.hero-slider {
  position: relative;
  width: 100%;
  height: 600px;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1.2s ease;
  z-index: 1;
}

.hero-slide.active {
  opacity: 1;
  z-index: 2;
}

.hero-background {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 60px 0;
  overflow: hidden;
}

/* Decorative Elements */
.deco-circle {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  right: -100px;
  top: -100px;
  opacity: 0.1;
  pointer-events: none;
}

.deco-blob {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  left: -150px;
  bottom: -150px;
  opacity: 0.08;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  position: relative;
  z-index: 3;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  height: 100%;
}

/* Left Content */
.hero-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.badge {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: fit-content;
}

.hero-text h1 {
  font-size: 48px;
  font-weight: 800;
  color: #1A1A2E;
  line-height: 1.1;
  margin: 0;
}

.hero-text h2 {
  font-size: 22px;
  font-weight: 400;
  color: #4A4A5A;
  margin: 0;
}

.hero-text p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

.benefit-item {
  font-size: 14px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 4px;
}

.benefit-icon {
  color: #F4B400;
}

.hero-stats {
  display: flex;
  gap: 30px;
  padding: 16px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #1A1A2E;
}

.stat-label {
  font-size: 13px;
  color: #888;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 14px 35px;
  background: linear-gradient(135deg, #F4B400, #FFD700);
  color: #1A1A2E;
  border-radius: 30px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.3);
}

.btn-secondary {
  padding: 14px 35px;
  background: transparent;
  color: #1A1A2E;
  border: 2px solid #1A1A2E;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  font-size: 16px;
}

.btn-secondary:hover {
  background: #1A1A2E;
  color: #fff;
}

/* Right Side - Products */
.hero-products {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.platform {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.products-display {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-item {
  position: absolute;
  width: 45%;
  transition: all 0.8s ease;
  filter: drop-shadow(0 8px 30px rgba(0,0,0,0.12));
}

.product-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.3);
}

.product-item.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
}

.product-1 {
  left: 5%;
  top: 15%;
  z-index: 3;
}

.product-2 {
  left: 28%;
  top: 0;
  z-index: 2;
  width: 50%;
}

.product-3 {
  right: 5%;
  top: 15%;
  z-index: 1;
}

.product-reflection {
  position: absolute;
  bottom: -20px;
  left: 10%;
  width: 80%;
  height: 20px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(8px);
}

/* Decorative Elements */
.deco-leaf {
  position: absolute;
  opacity: 0.3;
  pointer-events: none;
}

.deco-leaf svg {
  width: 80px;
  height: 80px;
}

.leaf-1 {
  top: 5%;
  right: -10%;
  animation: sway 4s ease-in-out infinite;
}

.leaf-2 {
  bottom: 5%;
  left: -10%;
  animation: sway 4s ease-in-out infinite reverse;
}

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
}

.deco-flower {
  position: absolute;
  font-size: 40px;
  top: 5%;
  left: 5%;
  opacity: 0.5;
  animation: float 4s ease-in-out infinite;
}

.deco-glass {
  position: absolute;
  top: 10%;
  right: 5%;
  opacity: 0.3;
  pointer-events: none;
}

/* Slider Controls */
.slider-controls {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;
}

.nav-btn {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: #333;
}

.nav-btn:hover {
  background: rgba(255,255,255,0.9);
  transform: scale(1.05);
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #F4B400;
  transform: scale(1.2);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .hero-text h1 {
    font-size: 36px;
  }
  .hero-products {
    order: -1;
  }
  .platform {
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .hero-slider {
    height: auto;
    min-height: 700px;
  }
  .hero-text h1 {
    font-size: 28px;
  }
  .hero-text h2 {
    font-size: 18px;
  }
  .hero-stats {
    gap: 15px;
  }
  .benefits {
    flex-direction: column;
  }
  .hero-buttons {
    flex-direction: column;
  }
  .btn-primary, .btn-secondary {
    text-align: center;
  }
  .product-item {
    width: 35%;
  }
  .product-2 {
    width: 40%;
  }
}

@media (max-width: 480px) {
  .product-item {
    width: 30%;
  }
  .product-2 {
    width: 35%;
  }
  .slider-controls {
    bottom: 10px;
  }
  .nav-btn {
    width: 32px;
    height: 32px;
  }
}
</style>
