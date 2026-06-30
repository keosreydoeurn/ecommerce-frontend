import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../api/client'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const loading = ref(false)
  
  const totalItems = computed(() => {
    if (!Array.isArray(items.value)) {
      return 0
    }
    return items.value.length
  })
  
  async function fetchWishlist() {
    loading.value = true
    try {
      const response = await api.getWishlist()
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
      console.error('Error fetching wishlist:', error)
      items.value = []
    } finally {
      loading.value = false
    }
  }
  
  async function toggleWishlist(productId) {
    try {
      const exists = items.value.some(item => item.product_id === productId)
      
      if (exists) {
        await api.removeFromWishlist(productId)
        items.value = items.value.filter(item => item.product_id !== productId)
        return { success: true, action: 'removed' }
      } else {
        await api.addToWishlist(productId)
        await fetchWishlist()
        return { success: true, action: 'added' }
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  function isInWishlist(productId) {
    if (!Array.isArray(items.value)) {
      return false
    }
    return items.value.some(item => item.product_id === productId)
  }
  
  return {
    items,
    loading,
    totalItems,
    fetchWishlist,
    toggleWishlist,
    isInWishlist,
  }
})
