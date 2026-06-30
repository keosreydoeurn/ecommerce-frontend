<template>
  <div class="orders-page">
    <div class="container">
      <h1>My Orders</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading orders...</p>
      </div>
      
      <div v-else-if="orders && orders.length" class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <div>
              <span class="order-id">Order #{{ order.order_number || order.id }}</span>
              <span class="order-date">{{ formatDate(order.created_at) }}</span>
            </div>
            <span class="order-status" :class="order.status || 'pending'">
              {{ order.status || 'Pending' }}
            </span>
          </div>
          
          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <img 
                :src="item.image_url || item.product?.image_url || 'https://picsum.photos/seed/' + (item.product_id || item.product?.id) + '/50/50'" 
                :alt="item.name || item.product?.name" 
              />
              <span class="item-name">{{ item.name || item.product?.name || 'Product' }}</span>
              <span class="item-qty">x{{ item.quantity }}</span>
              <span class="item-price">${{ calculateItemTotal(item).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="order-footer">
            <div class="order-total">
              <strong>Total: ${{ order.total || calculateOrderTotal(order.items) }}</strong>
            </div>
            <div class="order-shipping" v-if="order.shipping_address">
              <span>📦 {{ order.shipping_address }}{{ order.city ? ', ' + order.city : '' }}</span>
            </div>
            <button class="btn-view-detail" @click="viewOrderDetail(order)">
              <i class="fas fa-eye"></i> View Detail
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-orders">
        <div class="empty-icon">📦</div>
        <h2>No Orders Yet</h2>
        <p>Start shopping and place your first order!</p>
        <router-link to="/shop" class="btn-shop">Start Shopping</router-link>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="selectedOrder" class="modal-overlay" @click.self="closeDetail">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Order #{{ selectedOrder.order_number || selectedOrder.id }}</h2>
          <button class="close-btn" @click="closeDetail">✕</button>
        </div>
        
        <div class="modal-body">
          <div class="order-info">
            <p><strong>Status:</strong> <span class="status-badge" :class="selectedOrder.status || 'pending'">{{ selectedOrder.status || 'Pending' }}</span></p>
            <p><strong>Date:</strong> {{ formatDate(selectedOrder.created_at) }}</p>
            <p v-if="selectedOrder.shipping_address"><strong>Shipping:</strong> {{ selectedOrder.shipping_address }}{{ selectedOrder.city ? ', ' + selectedOrder.city : '' }}</p>
          </div>

          <h3>Items</h3>
          <div class="detail-items">
            <div v-for="item in selectedOrder.items" :key="item.id" class="detail-item">
              <img 
                :src="item.image_url || item.product?.image_url || 'https://picsum.photos/seed/' + (item.product_id || item.product?.id) + '/60/60'" 
                :alt="item.name || item.product?.name"
                class="detail-item-image"
              />
              <div class="detail-item-info">
                <div class="detail-item-name">{{ item.name || item.product?.name || 'Product' }}</div>
                <div class="detail-item-meta">Qty: {{ item.quantity }} × ${{ (item.price || item.product?.price || 0).toFixed(2) }}</div>
              </div>
              <div class="detail-item-total">${{ calculateItemTotal(item).toFixed(2) }}</div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="order-total-large">
              <strong>Total: ${{ selectedOrder.total || calculateOrderTotal(selectedOrder.items) }}</strong>
            </div>
            <button class="btn-download" @click="downloadOrder(selectedOrder)">
              <i class="fas fa-download"></i> Download as File
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'

const orders = ref([])
const loading = ref(true)
const selectedOrder = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

const calculateItemTotal = (item) => {
  const price = item.price || item.product?.price || 0
  const quantity = item.quantity || 0
  return price * quantity
}

const calculateOrderTotal = (items) => {
  if (!items || !items.length) return 0
  return items.reduce((sum, item) => {
    const price = item.price || item.product?.price || 0
    const quantity = item.quantity || 0
    return sum + (price * quantity)
  }, 0)
}

const viewOrderDetail = (order) => {
  selectedOrder.value = order
  document.body.style.overflow = 'hidden'
}

const closeDetail = () => {
  selectedOrder.value = null
  document.body.style.overflow = 'auto'
}

const downloadOrder = (order) => {
  let content = `ORDER DETAILS\n`
  content += `================================\n\n`
  content += `Order #: ${order.order_number || order.id}\n`
  content += `Status: ${order.status || 'Pending'}\n`
  content += `Date: ${formatDate(order.created_at)}\n`
  content += `Shipping: ${order.shipping_address || 'N/A'}${order.city ? ', ' + order.city : ''}\n\n`
  content += `--- ITEMS ---\n`
  
  if (order.items && order.items.length) {
    order.items.forEach((item, idx) => {
      const name = item.name || item.product?.name || 'Product'
      const price = item.price || item.product?.price || 0
      const qty = item.quantity || 0
      const subtotal = price * qty
      content += `${idx+1}. ${name}  |  Qty: ${qty}  |  Price: $${price.toFixed(2)}  |  Subtotal: $${subtotal.toFixed(2)}\n`
    })
  }
  
  content += `\n--- SUMMARY ---\n`
  content += `Total: $${(order.total || calculateOrderTotal(order.items)).toFixed(2)}\n`
  content += `================================\n`
  
  const blob = new Blob([content], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `order_${order.order_number || order.id}_detail.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await api.getOrders()
    let ordersData = []
    
    if (response.data) {
      if (response.data.data && Array.isArray(response.data.data)) {
        ordersData = response.data.data
      } else if (Array.isArray(response.data)) {
        ordersData = response.data
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        ordersData = response.data.orders
      } else if (response.data.id) {
        ordersData = [response.data]
      } else {
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            ordersData = response.data[key]
            break
          }
        }
      }
    }
    
    orders.value = ordersData
  } catch (error) {
    console.error('Error fetching orders:', error)
    if (error.response?.status === 401) {
      // router.push('/login')
    }
    orders.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)
</script>

<style scoped>
.orders-page {
  padding: 40px 0;
  min-height: 70vh;
  background: #f8f9fa;
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

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.order-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #f5f5f5;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.order-header div {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.order-id {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.order-date {
  color: #6c757d;
  font-size: 14px;
}

.order-status {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
}

.order-status.pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.processing {
  background: #cce5ff;
  color: #004085;
}

.order-status.completed {
  background: #d4edda;
  color: #155724;
}

.order-status.shipped {
  background: #d1ecf1;
  color: #0c5460;
}

.order-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-status.refunded {
  background: #e2e3e5;
  color: #383d41;
}

.order-items {
  margin: 5px 0;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.item-name {
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
}

.item-qty {
  margin: 0 15px;
  color: #6c757d;
  font-weight: 500;
}

.item-price {
  font-weight: 600;
  color: #2c3e50;
  min-width: 80px;
  text-align: right;
}

.order-footer {
  padding-top: 15px;
  border-top: 2px solid #f5f5f5;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.order-total {
  font-size: 18px;
  color: #2c3e50;
}

.order-total strong {
  color: #667eea;
}

.order-shipping {
  font-size: 14px;
  color: #6c757d;
  background: #f8f9fa;
  padding: 8px 15px;
  border-radius: 6px;
}

.btn-view-detail {
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-view-detail:hover {
  background: #5a6fd6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.empty-orders {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-orders h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-orders p {
  color: #6c757d;
  margin-bottom: 30px;
  font-size: 16px;
}

.btn-shop {
  display: inline-block;
  padding: 14px 40px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-shop:hover {
  background: #5a6fd6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  color: #2c3e50;
  font-size: 22px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  transition: 0.2s;
  padding: 4px 8px;
}

.close-btn:hover {
  color: #2c3e50;
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px;
}

.order-info {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.order-info p {
  margin: 6px 0;
  color: #2c3e50;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
}

.status-badge.processing {
  background: #cce5ff;
  color: #004085;
}

.status-badge.completed {
  background: #d4edda;
  color: #155724;
}

.status-badge.shipped {
  background: #d1ecf1;
  color: #0c5460;
}

.status-badge.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.modal-body h3 {
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 18px;
}

.detail-items {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.detail-item-info {
  flex: 1;
}

.detail-item-name {
  font-weight: 600;
  color: #2c3e50;
}

.detail-item-meta {
  font-size: 14px;
  color: #6c757d;
}

.detail-item-total {
  font-weight: 600;
  color: #2c3e50;
  min-width: 80px;
  text-align: right;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.order-total-large {
  font-size: 22px;
  color: #2c3e50;
}

.order-total-large strong {
  color: #667eea;
}

.btn-download {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-download:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .order-header div {
    width: 100%;
    justify-content: space-between;
  }
  
  .order-item {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .item-name {
    flex: 1 1 100%;
    order: 1;
  }
  
  .item-qty {
    order: 2;
  }
  
  .item-price {
    order: 3;
    margin-left: auto;
  }
  
  .order-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .order-shipping {
    text-align: center;
  }
  
  .order-total {
    text-align: center;
  }

  .modal-content {
    margin: 10px;
    max-height: 95vh;
  }
  
  .modal-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-download {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .order-item img {
    width: 40px;
    height: 40px;
  }
  
  .order-id {
    font-size: 14px;
  }
  
  .order-date {
    font-size: 12px;
  }

  .detail-item {
    flex-wrap: wrap;
  }
  
  .detail-item-total {
    margin-left: auto;
  }
}
</style>