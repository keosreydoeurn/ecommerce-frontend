<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-left">
        <div class="nav-brand">
          <router-link to="/" class="brand">
            <div class="brand-icon-wrapper">
              <i class="fas fa-store-alt"></i>
            </div>
            <span class="brand-name">E-<span>Shop</span></span>
          </router-link>
        </div>
        
        <div class="nav-links">
          <router-link to="/" class="nav-link" exact-active-class="active">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
          <router-link to="/shop" class="nav-link" active-class="active">
            <i class="fas fa-shopping-bag"></i>
            <span>Shop</span>
          </router-link>
          <router-link v-if="authStore.isAuthenticated" to="/orders" class="nav-link" active-class="active">
            <i class="fas fa-clipboard-list"></i>
            <span>Orders</span>
          </router-link>
          <router-link v-else to="/login" class="nav-link" active-class="active">
            <i class="fas fa-clipboard-list"></i>
            <span>Orders</span>
          </router-link>
          <router-link to="/about" class="nav-link" active-class="active">
            <i class="fas fa-info-circle"></i>
            <span>About</span>
          </router-link>
          <router-link to="/contact" class="nav-link" active-class="active">
            <i class="fas fa-envelope"></i>
            <span>Contact</span>
          </router-link>
        </div>
      </div>
      
      <div class="nav-right">
        <template v-if="authStore.isAuthenticated">
          <div class="nav-actions">
            <router-link to="/wishlist" class="nav-action" title="Wishlist">
              <i class="fas fa-heart"></i>
              <span v-if="wishlistCount > 0" class="badge">{{ wishlistCount }}</span>
            </router-link>
            <router-link to="/cart" class="nav-action" title="Cart">
              <i class="fas fa-shopping-cart"></i>
              <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
            </router-link>
            
            <div class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
              <button class="nav-action profile-btn">
                <div class="avatar">
                  {{ authStore.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
                <i class="fas fa-chevron-down dropdown-arrow"></i>
              </button>
              <div class="dropdown-menu" v-show="isDropdownOpen">
                <div class="dropdown-header">
                  <div class="avatar-large">
                    {{ authStore.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ authStore.user?.name || 'User' }}</div>
                    <div class="user-email">{{ authStore.user?.email || '' }}</div>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <router-link to="/profile" class="dropdown-item" @click="closeDropdown">
                  <i class="fas fa-user-circle item-icon"></i> 
                  <span>My Profile</span>
                </router-link>
                <router-link to="/orders" class="dropdown-item" @click="closeDropdown">
                  <i class="fas fa-clipboard-list item-icon"></i> 
                  <span>My Orders</span>
                </router-link>
                <router-link to="/wishlist" class="dropdown-item" @click="closeDropdown">
                  <i class="fas fa-heart item-icon"></i> 
                  <span>Wishlist</span>
                </router-link>
                <router-link to="/cart" class="dropdown-item" @click="closeDropdown">
                  <i class="fas fa-shopping-cart item-icon"></i> 
                  <span>Cart</span>
                </router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item logout" @click="handleLogout">
                  <i class="fas fa-sign-out-alt item-icon"></i> 
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-login">
            <i class="fas fa-sign-in-alt"></i>
            <span>Sign In</span>
          </router-link>
          <router-link to="/register" class="btn-register">
            <i class="fas fa-user-plus"></i>
            <span>Register</span>
          </router-link>
        </template>
      </div>
      
      <button class="mobile-toggle" @click="toggleMobile">
        <span></span><span></span><span></span>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ active: isMobileOpen }">
      <router-link to="/" class="mobile-link" @click="closeMobile">
        <i class="fas fa-home"></i> Home
      </router-link>
      <router-link to="/shop" class="mobile-link" @click="closeMobile">
        <i class="fas fa-shopping-bag"></i> Shop
      </router-link>
      <router-link v-if="authStore.isAuthenticated" to="/orders" class="mobile-link" @click="closeMobile">
        <i class="fas fa-clipboard-list"></i> Orders
      </router-link>
      <router-link v-else to="/login" class="mobile-link" @click="closeMobile">
        <i class="fas fa-clipboard-list"></i> Orders
      </router-link>
      <router-link to="/about" class="mobile-link" @click="closeMobile">
        <i class="fas fa-info-circle"></i> About
      </router-link>
      <router-link to="/contact" class="mobile-link" @click="closeMobile">
        <i class="fas fa-envelope"></i> Contact
      </router-link>
      <div class="mobile-divider"></div>
      <template v-if="authStore.isAuthenticated">
        <router-link to="/profile" class="mobile-link" @click="closeMobile">
          <i class="fas fa-user-circle"></i> Profile
        </router-link>
        <router-link to="/wishlist" class="mobile-link" @click="closeMobile">
          <i class="fas fa-heart"></i> Wishlist
        </router-link>
        <router-link to="/cart" class="mobile-link" @click="closeMobile">
          <i class="fas fa-shopping-cart"></i> Cart
        </router-link>
        <button class="mobile-logout" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="mobile-link btn-mobile-login" @click="closeMobile">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </router-link>
        <router-link to="/register" class="mobile-link btn-mobile-register" @click="closeMobile">
          <i class="fas fa-user-plus"></i> Register
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isDropdownOpen = ref(false)
const isMobileOpen = ref(false)

const cartCount = computed(() => cartStore.totalItems)
const wishlistCount = computed(() => wishlistStore.totalItems)

const openDropdown = () => { if (authStore.isAuthenticated) isDropdownOpen.value = true }
const closeDropdown = () => { isDropdownOpen.value = false }
const toggleMobile = () => { isMobileOpen.value = !isMobileOpen.value }
const closeMobile = () => { isMobileOpen.value = false }

const handleLogout = async () => {
  await authStore.logout()
  closeDropdown()
  closeMobile()
  router.push('/login')
}

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (authStore.isAuthenticated) {
    cartStore.fetchCart()
    wishlistStore.fetchWishlist()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary-yellow: #FFD700;
  --primary-black: #1A1A2E;
  --primary-white: #FFFFFF;
  --gradient-dark: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
  --gradient-yellow: linear-gradient(135deg, #FFD700, #F5A623);
  --glass-bg: rgba(255, 255, 255, 0.06);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar {
  background: var(--gradient-dark);
  padding: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid var(--primary-yellow);
  backdrop-filter: blur(10px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-weight: 800;
  font-size: 26px;
  color: var(--primary-white);
  transition: var(--transition);
}

.brand:hover {
  transform: scale(1.02);
}

.brand-icon-wrapper {
  width: 45px;
  height: 45px;
  background: var(--gradient-yellow);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--primary-black);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  transition: var(--transition);
}

.brand:hover .brand-icon-wrapper {
  transform: rotate(-10deg) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
}

.brand-name {
  letter-spacing: -0.5px;
}

.brand-name span {
  color: var(--primary-yellow);
}

.nav-links {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  border-radius: var(--border-radius);
  transition: var(--transition);
  font-size: 14px;
  position: relative;
}

.nav-link i {
  font-size: 16px;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-white);
  background: rgba(255, 215, 0, 0.08);
  transform: translateY(-1px);
}

.nav-link:hover i {
  color: var(--primary-yellow);
  transform: scale(1.1);
}

.nav-link.active {
  color: var(--primary-yellow);
  background: rgba(255, 215, 0, 0.12);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--primary-yellow);
  border-radius: 2px;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.nav-link.active i {
  color: var(--primary-yellow);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-action {
  position: relative;
  padding: 8px 14px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  border-radius: var(--border-radius);
  transition: var(--transition);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
}

.nav-action:hover {
  color: var(--primary-yellow);
  background: rgba(255, 215, 0, 0.08);
  transform: translateY(-2px);
}

.nav-action i {
  transition: var(--transition);
}

.nav-action:hover i {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--gradient-yellow);
  color: var(--primary-black);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 12px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.avatar {
  width: 36px;
  height: 36px;
  background: var(--gradient-yellow);
  color: var(--primary-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  transition: var(--transition);
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.2);
}

.profile-btn {
  padding: 4px 12px 4px 4px;
  gap: 6px;
}

.profile-btn:hover .avatar {
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
}

.dropdown-arrow {
  font-size: 11px;
  transition: var(--transition);
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.btn-login {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--primary-white);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: var(--transition);
}

.btn-login i {
  font-size: 14px;
}

.btn-login:hover {
  border-color: var(--primary-yellow);
  color: var(--primary-yellow);
  background: rgba(255, 215, 0, 0.05);
  transform: translateY(-2px);
}

.btn-register {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  background: var(--gradient-yellow);
  color: var(--primary-black);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
}

.btn-register i {
  font-size: 14px;
}

.btn-register:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  min-width: 260px;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: var(--border-radius);
  padding: 8px 0;
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
}

.avatar-large {
  width: 48px;
  height: 48px;
  background: var(--gradient-yellow);
  color: var(--primary-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--primary-white);
  font-size: 15px;
  margin-bottom: 2px;
}

.user-email {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.dropdown-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin: 6px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  transition: var(--transition);
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: left;
}

.dropdown-item i {
  font-size: 16px;
  width: 20px;
  transition: var(--transition);
}

.dropdown-item:hover {
  background: rgba(255, 215, 0, 0.08);
  color: var(--primary-yellow);
}

.dropdown-item:hover i {
  color: var(--primary-yellow);
  transform: scale(1.1);
}

.dropdown-item.logout {
  color: #ff6b6b;
}

.dropdown-item.logout i {
  color: #ff6b6b;
}

.dropdown-item.logout:hover {
  background: rgba(255, 107, 107, 0.08);
  color: #ff6b6b;
}

.dropdown-item.logout:hover i {
  color: #ff6b6b;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: var(--transition);
}

.mobile-toggle:hover span {
  background: var(--primary-yellow);
}

.mobile-toggle span {
  width: 28px;
  height: 2px;
  background: var(--primary-white);
  border-radius: 2px;
  transition: var(--transition);
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(20px);
  padding: 20px 24px;
  flex-direction: column;
  gap: 4px;
  border-bottom: 3px solid var(--primary-yellow);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.mobile-menu.active {
  display: flex;
  animation: slideDown 0.3s ease;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: var(--transition);
  font-size: 15px;
}

.mobile-link i {
  font-size: 18px;
  width: 24px;
}

.mobile-link:hover {
  background: rgba(255, 215, 0, 0.08);
  color: var(--primary-yellow);
}

.mobile-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin: 8px 0;
}

.mobile-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: var(--transition);
  width: 100%;
}

.mobile-logout i {
  font-size: 18px;
  width: 24px;
}

.mobile-logout:hover {
  background: rgba(255, 107, 107, 0.08);
}

.btn-mobile-login {
  background: rgba(255, 215, 0, 0.15);
  color: var(--primary-yellow) !important;
  text-align: center;
  justify-content: center;
}

.btn-mobile-register {
  background: var(--gradient-yellow);
  color: var(--primary-black) !important;
  text-align: center;
  justify-content: center;
}

@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
  .mobile-toggle {
    display: flex;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 10px 16px;
  }
  
  .brand-name {
    font-size: 20px;
  }
  
  .brand-icon-wrapper {
    width: 38px;
    height: 38px;
    font-size: 18px;
  }
  
  .btn-login, .btn-register {
    padding: 7px 14px;
    font-size: 13px;
  }
  
  .btn-login span, .btn-register span {
    display: none;
  }
  
  .btn-login i, .btn-register i {
    font-size: 16px;
  }
  
  .nav-action {
    padding: 6px 10px;
    font-size: 16px;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
  
  .badge {
    font-size: 9px;
    padding: 1px 6px;
    min-width: 16px;
    top: -2px;
    right: -2px;
  }
}
</style>