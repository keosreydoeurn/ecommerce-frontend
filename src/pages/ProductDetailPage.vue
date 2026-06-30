<template>
  <div v-if="product" class="product-detail-page">
    <div class="container">
      <div class="product-detail">
        <div class="product-image">
          <img :src="product.image_url || product.image || 'https://picsum.photos/seed/' + product.id + '/500/500'" :alt="product.name" />
        </div>
        <div class="product-info">
          <div class="product-breadcrumb">
            <router-link to="/">Home</router-link> / 
            <router-link :to="'/shop?category=' + product.category_id">Category</router-link> / 
            <span>{{ product.name }}</span>
          </div>
          
          <h1>{{ product.name }}</h1>
          
          <div class="product-rating">
            <span class="stars">⭐⭐⭐⭐⭐</span>
            <span class="rating-count">(24 reviews)</span>
          </div>
          
          <p class="price">${{ product.price }}</p>
          
          <div class="product-availability">
            <span :class="product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'">
              {{ product.stock_quantity > 0 ? '✅ In Stock' : '❌ Out of Stock' }}
            </span>
            <span v-if="product.stock_quantity > 0" class="stock-count">
              {{ product.stock_quantity }} units available
            </span>
          </div>
          
          <div class="product-description">
            <h3>Product Description</h3>
            <p>{{ product.description }}</p>
          </div>
          
          <div class="product-features">
            <h3>Key Features</h3>
            <ul>
              <li>✅ Premium quality materials</li>
              <li>✅ Durable and long-lasting</li>
              <li>✅ Satisfaction guaranteed</li>
              <li>✅ Free shipping on orders over $50</li>
            </ul>
          </div>
          
          <div class="actions">
            <div class="quantity">
              <button @click="decreaseQuantity">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>
            <button @click="addToCart" class="btn-add-cart">Add to Cart 🛒</button>
            <button @click="toggleWishlist" class="btn-wishlist">
              {{ isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist' }}
            </button>
          </div>
          
          <div v-if="message" class="message">{{ message }}</div>
          
          <div class="product-meta">
            <p><strong>SKU:</strong> PRD-{{ product.id }}-{{ product.category_id }}</p>
            <p><strong>Category:</strong> {{ product.category?.name || 'Uncategorized' }}</p>
            <p><strong>Added:</strong> {{ new Date(product.created_at).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
      
      <!-- Reviews Section -->
      <div class="reviews-section">
        <h3>Customer Reviews</h3>
        <div v-if="reviews.length" class="reviews-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <strong>{{ review.user?.name || 'Anonymous' }}</strong>
              <span class="review-stars">⭐⭐⭐⭐⭐</span>
              <small>{{ new Date(review.created_at).toLocaleDateString() }}</small>
            </div>
            <p>{{ review.comment }}</p>
          </div>
        </div>
        <div v-else class="no-reviews">No reviews yet. Be the first to review!</div>
        
        <div v-if="authStore.isAuthenticated" class="add-review">
          <h4>Write a Review</h4>
          <textarea v-model="newReview" placeholder="Share your experience with this product..."></textarea>
          <button @click="submitReview" class="btn-submit">Submit Review</button>
        </div>
        <div v-else class="login-to-review">
          <router-link to="/login">Login</router-link> to write a review
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api/client'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = ref(null)
const reviews = ref([])
const newReview = ref('')
const quantity = ref(1)
const message = ref('')

const isInWishlist = computed(() => wishlistStore.isInWishlist(product.value?.id))

const fetchProduct = async () => {
  try {
    const response = await api.getProduct(route.params.id)
    product.value = response.data
    console.log('Product loaded:', product.value.name)
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

const fetchReviews = async () => {
  try {
    const response = await api.getReviews(route.params.id)
    reviews.value = response.data || []
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

const increaseQuantity = () => { quantity.value++ }
const decreaseQuantity = () => { if (quantity.value > 1) quantity.value-- }

const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    message.value = 'Please login to add items to cart'
    setTimeout(() => message.value = '', 3000)
    return
  }
  const result = await cartStore.addToCart(product.value.id, quantity.value)
  if (result.success) {
    message.value = 'Added to cart! 🎉'
    setTimeout(() => message.value = '', 3000)
  }
}

const toggleWishlist = async () => {
  if (!authStore.isAuthenticated) {
    message.value = 'Please login to use wishlist'
    setTimeout(() => message.value = '', 3000)
    return
  }
  await wishlistStore.toggleWishlist(product.value.id)
}

const submitReview = async () => {
  if (!newReview.value.trim()) {
    alert('Please write a review')
    return
  }
  try {
    await api.addReview(product.value.id, { comment: newReview.value })
    newReview.value = ''
    await fetchReviews()
    alert('Review submitted!')
  } catch (error) {
    console.error('Error submitting review:', error)
  }
}

onMounted(() => {
  fetchProduct()
  fetchReviews()
})
</script>

<style scoped>
.product-detail-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 40px;
}

.product-image img {
  width: 100%;
  border-radius: 12px;
}

.product-breadcrumb {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.product-breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.product-breadcrumb a:hover {
  text-decoration: underline;
}

.product-info h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.stars {
  color: #ffd700;
  font-size: 18px;
}

.rating-count {
  color: #888;
  font-size: 14px;
}

.price {
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
  margin: 15px 0;
}

.product-availability {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.in-stock {
  color: #2ecc71;
  font-weight: 600;
}

.out-of-stock {
  color: #e74c3c;
  font-weight: 600;
}

.stock-count {
  color: #888;
  font-size: 14px;
}

.product-description {
  margin: 20px 0;
}

.product-description h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 8px;
}

.product-description p {
  color: #555;
  line-height: 1.7;
}

.product-features {
  margin: 20px 0;
}

.product-features h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 8px;
}

.product-features ul {
  list-style: none;
  padding: 0;
}

.product-features ul li {
  padding: 4px 0;
  color: #555;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 5px;
}

.quantity button {
  padding: 5px 12px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.quantity span {
  min-width: 30px;
  text-align: center;
}

.btn-add-cart {
  padding: 12px 30px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-add-cart:hover {
  background: #27ae60;
}

.btn-wishlist {
  padding: 12px 20px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-wishlist:hover {
  background: #e8e8e8;
}

.message {
  margin-top: 15px;
  padding: 10px;
  background: #d4edda;
  color: #155724;
  border-radius: 6px;
}

.product-meta {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #888;
}

.product-meta p {
  margin: 4px 0;
}

.reviews-section {
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.reviews-section h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.review-item {
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
}

.review-stars {
  color: #ffd700;
}

.review-item p {
  margin: 5px 0;
}

.no-reviews {
  color: #888;
  padding: 20px 0;
}

.add-review {
  margin-top: 20px;
}

.add-review textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-height: 100px;
}

.btn-submit {
  margin-top: 10px;
  padding: 10px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.login-to-review {
  padding: 20px 0;
  color: #888;
}

.login-to-review a {
  color: #667eea;
  text-decoration: none;
}

.loading {
  text-align: center;
  padding: 60px;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}
</style>
