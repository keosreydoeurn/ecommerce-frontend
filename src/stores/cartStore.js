import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../api/client'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)
  
  const totalItems = computed(() => {
    if (!Array.isArray(items.value)) return 0
    return items.value.reduce((total, item) => total + (item.quantity || 0), 0)
  })
  
  const totalPrice = computed(() => {
    if (!Array.isArray(items.value)) return 0
    return items.value.reduce((total, item) => {
      return total + (item.product?.price || 0) * (item.quantity || 0)
    }, 0)
  })
  
  async function fetchCart() {
    loading.value = true
    try {
      const response = await api.getCart()
      if (Array.isArray(response.data)) {
        items.value = response.data
      } else if (response.data && typeof response.data === 'object') {
        if (Array.isArray(response.data.data)) {
          items.value = response.data.data
        } else {
          items.value = []
        }
      } else {
        items.value = []
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      items.value = []
    } finally {
      loading.value = false
    }
  }
  
  async function addToCart(productId, quantity = 1) {
    try {
      await api.addToCart({ product_id: productId, quantity })
      await fetchCart()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  async function updateQuantity(itemId, quantity) {
    try {
      await api.updateCartItem(itemId, quantity)
      await fetchCart()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  async function removeItem(itemId) {
    try {
      await api.removeFromCart(itemId)
      await fetchCart()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  async function clearCart() {
    try {
      await api.clearCart()
      items.value = []
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  return {
    items,
    loading,
    totalItems,
    totalPrice,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  }
})
