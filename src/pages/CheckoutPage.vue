<template>
  <div class="checkout-page">
    <div class="container">
      <h1>Checkout</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
      
      <div v-else-if="cartItems.length" class="checkout-content">
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <span>{{ item.product?.name }} x {{ item.quantity }}</span>
            <span>${{ (item.product?.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="order-total">
            <strong>Total: ${{ total }}</strong>
          </div>
        </div>
        
        <div class="shipping-form">
          <h3>Shipping Information</h3>
          <form @submit.prevent="placeOrder">
            <div class="form-group">
              <label for="shipping_address">Full Shipping Address</label>
              <input 
                id="shipping_address" 
                v-model="orderData.shipping_address" 
                type="text" 
                required 
                placeholder="Street, Building, Apartment, City, Country" 
              />
            </div>
            <div class="form-group">
              <label for="payment_method">Payment Method</label>
              <select id="payment_method" v-model="orderData.payment_method" required>
                <option value="">Select payment method</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input id="phone" v-model="orderData.phone" type="tel" required placeholder="+1234567890" />
            </div>
            <button type="submit" class="btn-place-order" :disabled="processing">
              {{ processing ? 'Processing...' : 'Place Order' }}
            </button>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
          </form>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <p>Your cart is empty</p>
        <router-link to="/shop" class="btn-shop">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api/client'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()
const cartItems = ref([])
const loading = ref(true)
const processing = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Updated to match server expectations
const orderData = ref({
  shipping_address: '',  // Changed from 'address'
  payment_method: '',    // Added this field
  phone: ''             // Keep phone if needed
})

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0).toFixed(2)
})

const fetchCart = async () => {
  loading.value = true
  await cartStore.fetchCart()
  cartItems.value = cartStore.items
  loading.value = false
}

const placeOrder = async () => {
  // Updated validation
  if (!orderData.value.shipping_address || !orderData.value.payment_method || !orderData.value.phone) {
    errorMessage.value = 'Please fill in all required fields'
    setTimeout(() => errorMessage.value = '', 5000)
    return
  }
  
  processing.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Send the data as the server expects
    const response = await api.checkout({
      shipping_address: orderData.value.shipping_address,
      payment_method: orderData.value.payment_method,
      phone: orderData.value.phone
    })
    
    if (response.data && response.data.success) {
      successMessage.value = 'Order placed successfully! 🎉'
      await cartStore.clearCart()
      setTimeout(() => {
        router.push('/orders')
      }, 2000)
    } else {
      errorMessage.value = response.data?.message || 'Failed to place order'
    }
  } catch (error) {
    console.error('Error placing order:', error)
    
    if (error.response) {
      console.error('Error data:', error.response.data)
      console.error('Error status:', error.response.status)
      
      // Handle validation errors from server
      if (error.response.data?.errors) {
        const errors = error.response.data.errors
        const errorMessages = Object.values(errors).flat().join(' ')
        errorMessage.value = errorMessages || 'Validation failed. Please check your input.'
      } else {
        errorMessage.value = error.response.data?.message || 'Server error. Please try again.'
      }
    } else if (error.request) {
      errorMessage.value = 'No response from server. Please check your connection.'
    } else {
      errorMessage.value = error.message || 'An error occurred. Please try again.'
    }
  } finally {
    processing.value = false
  }
}

onMounted(fetchCart)
</script>

<style scoped>
/* ... keep your existing styles ... */
.checkout-page {
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

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.order-summary {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.order-total {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  text-align: right;
  font-size: 18px;
}

.shipping-form {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.shipping-form h3 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-place-order {
  width: 100%;
  padding: 14px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-place-order:hover:not(:disabled) {
  background: #27ae60;
}

.btn-place-order:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin-top: 15px;
  padding: 12px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  text-align: center;
}

.success-message {
  margin-top: 15px;
  padding: 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 6px;
  text-align: center;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.btn-shop {
  display: inline-block;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
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
  .checkout-content {
    grid-template-columns: 1fr;
  }
}
</style>