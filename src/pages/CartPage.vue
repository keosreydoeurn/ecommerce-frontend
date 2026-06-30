<template>
  <div class="cart-page">
    <div class="container">
      <h1>Shopping Cart</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading cart...</p>
      </div>
      
      <div v-else-if="cartItems.length" class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.product?.image_url || item.product?.image || 'https://picsum.photos/seed/' + item.product_id + '/100/100'" :alt="item.product?.name" />
            <div class="item-details">
              <h3>{{ item.product?.name }}</h3>
              <p class="price">${{ item.product?.price }}</p>
            </div>
            <div class="item-quantity">
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <div class="item-total">
              ${{ (item.product?.price * item.quantity).toFixed(2) }}
            </div>
            <button @click="removeItem(item.id)" class="btn-remove">✕</button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ subtotal }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ subtotal }}</span>
          </div>
          <router-link to="/checkout" class="btn-checkout">Proceed to Checkout</router-link>
          <button @click="clearCart" class="btn-clear">Clear Cart</button>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Start shopping and add items to your cart!</p>
        <router-link to="/shop" class="btn-shop">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const cartItems = ref([])
const loading = ref(true)

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity
  }, 0).toFixed(2)
})

const fetchCart = async () => {
  loading.value = true
  await cartStore.fetchCart()
  cartItems.value = cartStore.items
  loading.value = false
}

const updateQuantity = async (itemId, quantity) => {
  if (quantity < 1) {
    await removeItem(itemId)
    return
  }
  await cartStore.updateQuantity(itemId, quantity)
  cartItems.value = cartStore.items
}

const removeItem = async (itemId) => {
  await cartStore.removeItem(itemId)
  cartItems.value = cartStore.items
}

const clearCart = async () => {
  if (!confirm('Are you sure you want to clear your cart?')) return
  await cartStore.clearCart()
  cartItems.value = []
}

onMounted(fetchCart)
</script>

<style scoped>
.cart-page {
  padding: 40px 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 30px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr 120px 100px 40px;
  gap: 15px;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details h3 {
  font-size: 16px;
  margin: 0 0 5px;
}

.item-details .price {
  color: #667eea;
  font-weight: 600;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantity button {
  padding: 5px 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.item-total {
  font-weight: 600;
  font-size: 16px;
}

.btn-remove {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 20px;
}

.cart-summary {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  position: sticky;
  top: 20px;
}

.cart-summary h3 {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  border-bottom: none;
  padding-top: 15px;
}

.btn-checkout {
  display: block;
  width: 100%;
  padding: 14px;
  background: #2ecc71;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  margin-top: 20px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-checkout:hover {
  background: #27ae60;
}

.btn-clear {
  display: block;
  width: 100%;
  padding: 12px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
  cursor: pointer;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-cart h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-cart p {
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

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  .cart-item {
    grid-template-columns: 60px 1fr 100px 60px 30px;
    gap: 10px;
  }
  .cart-item img {
    width: 60px;
    height: 60px;
  }
}
</style>
