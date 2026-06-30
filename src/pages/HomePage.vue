<template>
  <div class="home-page">
    <!-- Hero Banner - Dynamic from Database -->
    <HeroBanner />

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2>Shop by <span>Category</span></h2>
          <p>Find exactly what you're looking for in our curated collections</p>
        </div>
        <div v-if="loadingCategories" class="loading">Loading categories...</div>
        <div v-else-if="categories.length" class="category-grid">
          <div v-for="category in categories" :key="category.id" class="category-card">
            <router-link :to="'/shop?category=' + category.id">
              <div class="category-image-wrapper">
                <img :src="getCategoryImage(category)" :alt="category.name" />
                <div class="category-overlay">
                  <span class="category-name">{{ category.name }}</span>
                  <span class="category-count">{{ category.products_count || 0 }} products</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else class="no-data">No categories available</div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2>Featured <span>Products</span></h2>
          <p>Handpicked items just for you</p>
        </div>
        <div v-if="loadingProducts" class="loading">Loading products...</div>
        <div v-else-if="featuredProducts.length" class="featured-grid">
          <div v-for="product in featuredProducts" :key="product.id" class="product-card">
            <router-link :to="'/product/' + product.id" class="product-link">
              <div class="product-image">
                <img :src="product.image_url || product.image || 'https://picsum.photos/seed/' + product.id + '/300/300'" :alt="product.name" />
                <div v-if="product.discount" class="discount-badge">-{{ product.discount }}%</div>
              </div>
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <p>{{ product.description?.substring(0, 60) }}...</p>
                <div class="product-price">
                  <span class="price">${{ product.price }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else class="no-data">No products available</div>
        <div class="view-all">
          <router-link to="/shop" class="btn-view-all">View All Products →</router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-us">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose <span>E-Shop?</span></h2>
          <p>We're committed to providing you with the best shopping experience</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Enjoy free delivery on all orders over $50. Fast and reliable shipping to your doorstep.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>Not satisfied? No problem! Our 30-day return policy ensures you shop with confidence.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Your transactions are safe with our 100% secure payment gateway and encryption.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎧</div>
            <h3>24/7 Support</h3>
            <p>Our dedicated customer service team is always ready to help you with any questions.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⭐</div>
            <h3>Quality Products</h3>
            <p>We carefully curate our selection to ensure you get only the best quality items.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3>Trusted Brand</h3>
            <p>Join thousands of satisfied customers who trust E-Shop for their shopping needs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-glass">
          <div class="newsletter-content">
            <h2>Subscribe to Our <span>Newsletter</span></h2>
            <p>Get the latest updates on new products and special offers</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'
import HeroBanner from '../components/HeroBanner.vue'

const products = ref([])
const categories = ref([])
const featuredProducts = ref([])
const loadingProducts = ref(true)
const loadingCategories = ref(true)

const getCategoryImage = (category) => {
  const product = products.value.find(p => p.category_id === category.id)
  if (product && (product.image_url || product.image)) {
    return product.image_url || product.image
  }
  return 'https://picsum.photos/seed/' + category.name + '/300/300'
}

onMounted(async () => {
  try {
    const categoriesRes = await api.getCategories()
    categories.value = categoriesRes.data || []
    loadingCategories.value = false
  } catch (error) {
    console.error('Error loading categories:', error)
    loadingCategories.value = false
  }
  
  try {
    const productsRes = await api.getProducts()
    const data = productsRes.data || []
    products.value = data
    featuredProducts.value = data.slice(0, 4)
    loadingProducts.value = false
  } catch (error) {
    console.error('Error loading products:', error)
    loadingProducts.value = false
  }
})
</script>

<style scoped>
.home-page {
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 36px;
  font-weight: 800;
  color: #1a1a2e;
}

.section-header h2 span {
  color: #FFD700;
}

.section-header p {
  color: #8a8a8a;
  font-size: 16px;
  margin-top: 8px;
}

.categories-section {
  padding: 40px 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.category-card {
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(255, 215, 0, 0.08);
}

.category-card a {
  text-decoration: none;
  color: inherit;
}

.category-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

.category-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.category-card:hover .category-image-wrapper img {
  transform: scale(1.08);
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
  text-align: center;
}

.category-name {
  display: block;
  font-size: 18px;
  font-weight: 700;
}

.category-count {
  display: block;
  font-size: 13px;
  opacity: 0.7;
}

.featured-section {
  padding: 40px 0;
  background: rgba(255, 215, 0, 0.02);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #FFD700;
  color: #1A1A2E;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.product-info {
  padding: 16px 18px 18px;
}

.product-info h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.product-info p {
  font-size: 13px;
  color: #8a8a8a;
  line-height: 1.4;
  margin-bottom: 8px;
}

.product-price .price {
  font-size: 20px;
  font-weight: 700;
  color: #FFD700;
}

.view-all {
  text-align: center;
  margin-top: 36px;
}

.btn-view-all {
  display: inline-block;
  padding: 14px 40px;
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  border: 2px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-view-all:hover {
  background: rgba(255, 215, 0, 0.2);
  border-color: #FFD700;
  transform: translateY(-3px);
}

.why-choose-us {
  padding: 60px 0;
  background: rgba(255, 215, 0, 0.02);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 30px;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.feature-card p {
  color: #8a8a8a;
  font-size: 14px;
  line-height: 1.6;
}

.newsletter-section {
  padding: 60px 0;
}

.newsletter-glass {
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 40px;
  text-align: center;
  background: white;
  border-radius: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}

.newsletter-content h2 {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.newsletter-content h2 span {
  color: #FFD700;
}

.newsletter-content p {
  color: #8a8a8a;
  font-size: 16px;
  margin-bottom: 24px;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #FFD700;
  box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.08);
}

.newsletter-form button {
  padding: 14px 30px;
  background: linear-gradient(135deg, #FFD700, #F5A623);
  color: #1A1A2E;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.newsletter-form button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
}

.loading {
  text-align: center;
  padding: 40px;
  color: #8a8a8a;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #b0b0b0;
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  .featured-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .newsletter-form {
    flex-direction: column;
  }
  .newsletter-glass {
    padding: 32px 20px;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 28px;
  }
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
