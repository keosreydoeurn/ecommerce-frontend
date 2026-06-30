<template>
  <div id="app">
    <AppNav v-if="showLayout" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="showLayout" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import { useCartStore } from './stores/cartStore'
import { useWishlistStore } from './stores/wishlistStore'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()

const showLayout = computed(() => !route.meta.guest)

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

onMounted(async () => {
  // Check if user is authenticated and fetch data
  if (authStore.isAuthenticated) {
    await authStore.fetchProfile()
    await Promise.all([
      cartStore.fetchCart(),
      wishlistStore.fetchWishlist()
    ])
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Global styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
