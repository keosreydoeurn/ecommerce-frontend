<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image_url || product.image || 'https://picsum.photos/seed/' + product.id + '/300/300'" :alt="product.name" />
      <div v-if="product.discount" class="discount-badge">-{{ product.discount }}%</div>
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="price">${{ product.price }}</p>
      <p class="description">{{ product.description?.substring(0, 60) }}...</p>
      <div class="product-actions">
        <router-link :to="'/product/' + product.id" class="btn-view">View Details</router-link>
        <button @click="addToCart" class="btn-add">Add to Cart</button>
        <button @click="toggleWishlist" class="btn-wishlist">
          {{ isInWishlist ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    alert('Please login to add items to cart')
    return
  }
  await cartStore.addToCart(props.product.id)
  alert('Added to cart! 🛒')
}

const toggleWishlist = async () => {
  if (!authStore.isAuthenticated) {
    alert('Please login to use wishlist')
    return
  }
  await wishlistStore.toggleWishlist(props.product.id)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
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
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #2c3e50;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #667eea;
  margin: 5px 0;
}

.description {
  color: #888;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.4;
}

.product-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.btn-view {
  flex: 1;
  padding: 8px 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  text-decoration: none;
  text-align: center;
  transition: background 0.3s;
}

.btn-view:hover {
  background: #5a6fd6;
}

.btn-add {
  flex: 1;
  padding: 8px 12px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #27ae60;
}

.btn-wishlist {
  padding: 8px 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s;
}

.btn-wishlist:hover {
  background: #e8e8e8;
}
</style>
