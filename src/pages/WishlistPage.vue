<template>
  <div class="wishlist-page">
    <div class="container">
      <h1>My Wishlist ❤️</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading wishlist...</p>
      </div>
      
      <div v-else-if="wishlistItems.length" class="wishlist-grid">
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <router-link :to="'/product/' + item.product.id">
            <img :src="item.product.image_url || item.product.image || 'https://picsum.photos/seed/' + item.product.id + '/300/300'" :alt="item.product.name" />
            <h3>{{ item.product.name }}</h3>
            <p class="price">${{ item.product.price }}</p>
          </router-link>
          <button @click="removeFromWishlist(item.product.id)" class="btn-remove">
            Remove from Wishlist
          </button>
        </div>
      </div>
      
      <div v-else class="empty-wishlist">
        <div class="empty-icon">🤍</div>
        <h2>Your Wishlist is Empty</h2>
        <p>Start adding products you love!</p>
        <router-link to="/shop" class="btn-shop">Browse Products</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'

const wishlistStore = useWishlistStore()
const wishlistItems = ref([])
const loading = ref(true)

const fetchWishlist = async () => {
  loading.value = true
  await wishlistStore.fetchWishlist()
  wishlistItems.value = wishlistStore.items
  loading.value = false
}

const removeFromWishlist = async (productId) => {
  await wishlistStore.toggleWishlist(productId)
  wishlistItems.value = wishlistStore.items
}

onMounted(fetchWishlist)
</script>

<style scoped>
.wishlist-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 30px;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.wishlist-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.wishlist-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

.wishlist-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.wishlist-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.wishlist-item h3 {
  padding: 15px 15px 5px;
  font-size: 16px;
}

.price {
  color: #667eea;
  font-weight: bold;
  font-size: 18px;
  padding: 0 15px 15px;
}

.btn-remove {
  width: 100%;
  padding: 12px;
  background: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-remove:hover {
  background: #c0392b;
}

.empty-wishlist {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-wishlist h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-wishlist p {
  color: #888;
  margin-bottom: 30px;
}

.btn-shop {
  display: inline-block;
  padding: 14px 40px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-shop:hover {
  background: #5a6fd6;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
