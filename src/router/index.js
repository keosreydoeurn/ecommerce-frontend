import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../pages/ShopPage.vue'),
    meta: { title: 'Shop' }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../pages/ProductDetailPage.vue'),
    meta: { title: 'Product Details' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: { title: 'About Us' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue'),
    meta: { title: 'Contact' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { guest: true, title: 'Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/RegisterPage.vue'),
    meta: { guest: true, title: 'Register' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../pages/CartPage.vue'),
    meta: { requiresAuth: true, title: 'Cart' }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../pages/WishlistPage.vue'),
    meta: { requiresAuth: true, title: 'Wishlist' }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../pages/OrdersPage.vue'),
    meta: { requiresAuth: true, title: 'My Orders' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../pages/ProfilePage.vue'),
    meta: { requiresAuth: true, title: 'My Profile' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../pages/CheckoutPage.vue'),
    meta: { requiresAuth: true, title: 'Checkout' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - E-Commerce Store` : 'E-Commerce Store'
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
