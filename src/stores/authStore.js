import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../api/client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('access_token') || null)
  const user = ref(null)
  
  const isAuthenticated = computed(() => !!token.value)
  
  async function login(credentials) {
    try {
      const response = await api.login(credentials)
      console.log('Login raw response:', response)
      
      // The interceptor should have cleaned the data
      const data = response.data
      console.log('Cleaned data:', data)
      
      if (data && data.token) {
        token.value = data.token
        localStorage.setItem('access_token', data.token)
        console.log('Token stored:', data.token)
      }
      
      if (data && data.user) {
        user.value = data.user
      }
      
      return { success: true, user: user.value }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }
  
  async function register(userData) {
    try {
      const response = await api.register(userData)
      const data = response.data
      
      if (data && data.token) {
        token.value = data.token
        localStorage.setItem('access_token', data.token)
      }
      
      if (data && data.user) {
        user.value = data.user
      }
      
      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  }
  
  async function logout() {
    try {
      if (token.value) {
        await api.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('access_token')
    }
  }
  
  async function fetchProfile() {
    try {
      const response = await api.profile()
      user.value = response.data
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  async function updateProfile(data) {
    try {
      const response = await api.updateProfile(data)
      user.value = response.data
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
  
  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
  }
})
