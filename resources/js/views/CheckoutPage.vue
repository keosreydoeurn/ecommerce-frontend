<template>
  <div class="checkout-page">
    <div class="container">
      <h1>Checkout</h1>
      
      <div v-if="!items || items.length === 0" class="empty">
        <p>Your cart is empty. Please add items first.</p>
        <router-link to="/shop" class="btn">Go to Shop</router-link>
      </div>
      
      <div v-else>
        <div class="row">
          <div class="col-form">
            <h2>Shipping Information</h2>
            
            <div class="form-group">
              <label>Full Address</label>
              <input type="text" id="address" class="input" placeholder="123 Main St" />
            </div>
            
            <div class="form-group">
              <label>City</label>
              <input type="text" id="city" class="input" placeholder="New York" />
            </div>
            
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" id="phone" class="input" placeholder="1234567890" />
            </div>
            
            <div class="form-group">
              <label>Payment Method</label>
              <select id="payment" class="input">
                <option value="">Select Payment</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>
            
            <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
            <div v-if="successMsg" class="success">{{ successMsg }}</div>
            
            <button @click="placeOrder" :disabled="loading" class="btn-order">
              {{ loading ? 'Processing...' : 'Place Order' }}
            </button>
          </div>
          
          <div class="col-summary">
            <h2>Order Summary</h2>
            <div v-for="item in items" :key="item.id" class="item">
              <span>{{ item.product?.name }} x {{ item.quantity }}</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="total-row"><span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span></div>
            <div class="total-row"><span>Tax</span><span>${{ tax.toFixed(2) }}</span></div>
            <div class="total-row"><span>Shipping</span><span>$5.00</span></div>
            <div class="total-row grand"><span>Total</span><span>${{ grandTotal.toFixed(2) }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  data() {
    return {
      loading: false,
      errorMsg: '',
      successMsg: ''
    }
  },
  computed: {
    items() {
      return this.$store?.cart?.items || []
    },
    subtotal() {
      return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    },
    tax() {
      return this.subtotal * 0.1
    },
    grandTotal() {
      return this.subtotal + this.tax + 5
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  },
  methods: {
    async placeOrder() {
      const address = document.getElementById('address').value
      const city = document.getElementById('city').value
      const phone = document.getElementById('phone').value
      const payment = document.getElementById('payment').value
      
      if (!address || !city || !phone || !payment) {
        this.errorMsg = 'Please fill all fields'
        return
      }

      this.loading = true
      this.errorMsg = ''
      this.successMsg = ''

      const token = localStorage.getItem('token')
      if (!token) {
        this.errorMsg = 'Please login first'
        this.$router.push('/login')
        this.loading = false
        return
      }

      const fullAddress = address + ', ' + city + ', Phone: ' + phone

      try {
        const response = await fetch('http://localhost:8000/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            shipping_address: fullAddress,
            payment_method: payment
          })
        })

        const text = await response.text()
        const cleanText = text.replace(/^\uFEFF/, '').replace(/^\uFFFE/, '').replace(/^ï»¿/, '').trim()
        const data = JSON.parse(cleanText)

        if (response.ok && data.success) {
          this.successMsg = '✅ Order placed! Order ID: ' + (data.data?.id || '')
          await this.$store.dispatch('cart/clearCart')
          setTimeout(() => {
            this.$router.push('/orders')
          }, 1500)
        } else {
          this.errorMsg = data.message || 'Something went wrong'
        }
      } catch (err) {
        this.errorMsg = 'Server error. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 40px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h1 { color: #FFD700; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.col-form, .col-summary { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 12px; border: 1px solid rgba(255,215,0,0.1); }
.col-form h2, .col-summary h2 { color: #fff; margin-bottom: 20px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; color: rgba(255,255,255,0.8); margin-bottom: 5px; }
.input { width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 14px; }
.input:focus { outline: none; border-color: #FFD700; }
.btn-order { width: 100%; padding: 14px; background: linear-gradient(135deg, #FFD700, #F5A623); color: #1A1A2E; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 10px; font-size: 16px; }
.btn-order:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(255,215,0,0.3); }
.btn-order:disabled { opacity: 0.6; cursor: not-allowed; }
.error { color: #ff6b6b; margin-top: 10px; padding: 10px; background: rgba(255,107,107,0.1); border-radius: 8px; }
.success { color: #51cf66; margin-top: 10px; padding: 10px; background: rgba(81,207,102,0.1); border-radius: 8px; }
.item { display: flex; justify-content: space-between; padding: 8px 0; color: rgba(255,255,255,0.8); }
.total-row { display: flex; justify-content: space-between; padding: 8px 0; color: rgba(255,255,255,0.8); }
.grand { border-top: 2px solid #FFD700; padding-top: 15px; font-size: 18px; font-weight: bold; color: #FFD700; }
hr { border-color: rgba(255,255,255,0.1); margin: 15px 0; }
.empty { text-align: center; padding: 60px 0; }
.btn { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FFD700, #F5A623); color: #1A1A2E; text-decoration: none; border-radius: 8px; font-weight: 600; }
@media (max-width: 768px) { .row { grid-template-columns: 1fr; } }
</style>