import axios from 'axios'

// Clean BOM and parse JSON
function cleanAndParse(data) {
  if (typeof data === 'string') {
    // Remove ALL BOM variations
    let cleaned = data
    // Remove various BOM patterns
    cleaned = cleaned.replace(/^\uFEFF/, '')
    cleaned = cleaned.replace(/^﻿/g, '')
    cleaned = cleaned.replace(/^\xEF\xBB\xBF/, '')
    cleaned = cleaned.replace(/^ï»¿/, '')
    cleaned = cleaned.replace(/^ï»¿ï»¿/, '')
    // Remove multiple BOMs
    cleaned = cleaned.replace(/^[ï»¿\uFEFF﻿]+/, '')
    
    try {
      return JSON.parse(cleaned)
    } catch (e) {
      // Try to find JSON in the string
      const match = cleaned.match(/\{.*\}/)
      if (match) {
        try {
          return JSON.parse(match[0])
        } catch (e2) {
          console.warn('Could not parse JSON:', e2.message)
          return cleaned
        }
      }
      return cleaned
    }
  }
  return data
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
http.interceptors.response.use(
  (response) => {
    response.data = cleanAndParse(response.data)
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default http
