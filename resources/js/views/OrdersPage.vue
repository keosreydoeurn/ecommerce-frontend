<template>
  <div class="orders-page">
    <div class="container">
      <h1>My Orders</h1>
      
      <div v-if="loading" class="loading">Loading orders...</div>
      
      <div v-else-if="orders.length === 0" class="empty">
        <p>You haven't placed any orders yet.</p>
        <router-link to="/shop" class="btn">Start Shopping</router-link>
      </div>
      
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <div>
              <strong>Order #{{ order.id }}</strong>
              <span class="order-number">{{ order.order_number }}</span>
            </div>
            <div class="order-status" :class="order.order_status">
              {{ order.order_status }}
            </div>
          </div>
          
          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <span>{{ item.product_name }} x {{ item.quantity }}</span>
              <span>${{ item.total }}</span>
            </div>
          </div>
          
          <div class="order-footer">
            <div>
              <span>Total: </span>
              <span class="order-total">${{ order.total }}</span>
            </div>
            <div class="order-date">{{ new Date(order.created_at).toLocaleDateString() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersPage',
  data() {
    return {
      orders: [],
      loading: true
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
        return
      }

      try {
        const response = await fetch('http://localhost:8000/api/orders', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        const text = await response.text()
        const cleanText = text.replace(/^\uFEFF/, '').replace(/^\uFFFE/, '').replace(/^ï»¿/, '').trim()
        const data = JSON.parse(cleanText)
        this.orders = data.data || []
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.orders-page {
  padding: 40px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h1 { color: #FFD700; margin-bottom: 30px; }
.loading { color: rgba(255,255,255,0.6); text-align: center; padding: 40px; }
.empty { text-align: center; padding: 60px 0; }
.empty p { color: rgba(255,255,255,0.6); font-size: 18px; }
.order-card {
  background: rgba(255,255,255,0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255,215,0,0.1);
  margin-bottom: 20px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 10px;
}
.order-header strong { color: #fff; font-size: 16px; }
.order-number { color: rgba(255,255,255,0.4); font-size: 12px; margin-left: 10px; }
.order-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
.order-status.pending { background: rgba(255,215,0,0.2); color: #FFD700; }
.order-status.processing { background: rgba(77,171,247,0.2); color: #4dabf7; }
.order-status.shipped { background: rgba(81,207,102,0.2); color: #51cf66; }
.order-status.delivered { background: rgba(81,207,102,0.2); color: #51cf66; }
.order-status.cancelled { background: rgba(255,107,107,0.2); color: #ff6b6b; }
.order-items { padding: 10px 0; }
.order-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  color: rgba(255,255,255,0.8);
}
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.order-total { color: #FFD700; font-size: 18px; font-weight: bold; }
.order-date { color: rgba(255,255,255,0.4); font-size: 12px; }
.btn { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FFD700, #F5A623); color: #1A1A2E; text-decoration: none; border-radius: 8px; font-weight: 600; }
.btn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(255,215,0,0.3); }
@media (max-width: 768px) { .order-header { flex-direction: column; align-items: flex-start; gap: 8px; } .order-footer { flex-direction: column; align-items: flex-start; gap: 8px; } }
</style>