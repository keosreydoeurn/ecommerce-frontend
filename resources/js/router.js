import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import ShopPage from './views/ShopPage.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'
import CartPage from './views/CartPage.vue'
import CheckoutPage from './views/CheckoutPage.vue'
import OrdersPage from './views/OrdersPage.vue'
import WishlistPage from './views/WishlistPage.vue'
import ProductDetailPage from './views/ProductDetailPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/shop',
        name: 'shop',
        component: ShopPage
    },
    {
        path: '/product/:id',
        name: 'product-detail',
        component: ProductDetailPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: { guest: true }
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartPage
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckoutPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        component: WishlistPage,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if (to.meta.guest && token) {
        next('/')
    } else {
        next()
    }
})

export default router