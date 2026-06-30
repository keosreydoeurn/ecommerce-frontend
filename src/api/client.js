import http from './http'

export const api = {
  test: () => http.get('/test'),
  
  getProducts: (params) => http.get('/products', { params }),
  getProduct: (id) => http.get(`/products/${id}`),
  searchProducts: (query) => http.get('/products/search', { params: { query } }),
  
  // Categories
  getCategories: () => http.get('/categories'),
  
  // Auth
  register: (data) => http.post('/register', data),
  login: (data) => http.post('/login', data),
  logout: () => http.post('/logout'),
  profile: () => http.get('/profile'),
  updateProfile: (data) => http.put('/profile', data),
  changePassword: (data) => http.put('/change-password', data),
  
  // Cart
  getCart: () => http.get('/cart'),
  addToCart: (data) => http.post('/cart', data),
  updateCartItem: (itemId, quantity) => http.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => http.delete(`/cart/${itemId}`),
  clearCart: () => http.delete('/cart/clear'),
  
  // Wishlist
  getWishlist: () => http.get('/wishlist'),
  addToWishlist: (productId) => http.post('/wishlist', { product_id: productId }),
  removeFromWishlist: (productId) => http.delete(`/wishlist/${productId}`),
  
  // Orders
  checkout: (data) => http.post('/checkout', data),
  getOrders: () => http.get('/orders'),
  getOrder: (id) => http.get(`/orders/${id}`),
  
  // Reviews
  getReviews: (productId) => http.get(`/products/${productId}/reviews`),
  addReview: (productId, data) => http.post(`/products/${productId}/reviews`, data),
}
