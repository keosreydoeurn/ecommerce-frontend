<template>
  <div class="auth-page">
    <div class="bg-blob bg-blob-1"></div>
    <div class="bg-blob bg-blob-2"></div>
    <div class="bg-blob bg-blob-3"></div>
    <div class="float-shape float-shape-1"></div>
    <div class="float-shape float-shape-2"></div>
    <div class="float-shape float-shape-3"></div>
    <div class="float-shape float-shape-4"></div>

    <div class="login-left">
      <div class="glass-card">
        <div class="logo-wrapper">
          <div class="logo-icon"><i class="fas fa-shopping-bag"></i></div>
          <span class="logo-text">E-Shop<span>Customer</span></span>
        </div>

        <div class="welcome-text">Join Us Today</div>
        <div class="welcome-title">Create <span>Account</span></div>
        <div class="welcome-desc">Start your shopping journey with us</div>

        <div v-if="error" class="alert alert-danger">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ error }}</span>
        </div>

        <div v-if="success" class="alert alert-success">
          <i class="fas fa-check-circle"></i>
          <span>{{ success }}</span>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Full Name</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="fas fa-user"></i></span>
              <input 
                type="text" 
                id="name" 
                v-model="name" 
                placeholder="Enter your full name" 
                required 
                autofocus
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="fas fa-envelope"></i></span>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="Enter your email" 
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="fas fa-lock"></i></span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Create a password (min 6 characters)" 
                required
              />
              <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="fas fa-check-circle"></i></span>
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="password_confirmation" 
                v-model="password_confirmation" 
                placeholder="Confirm your password" 
                required
              />
              <button type="button" class="toggle-password" @click="toggleConfirmPasswordVisibility">
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-login" :disabled="loading">
            <i class="fas fa-user-plus"></i> 
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="divider"><span>Or continue with</span></div>

        <div class="social-login">
          <button class="social-btn google" @click="socialLogin('Google')">
            <i class="fab fa-google"></i> Google
          </button>
          <button class="social-btn facebook" @click="socialLogin('Facebook')">
            <i class="fab fa-facebook"></i> Facebook
          </button>
          <button class="social-btn github" @click="socialLogin('GitHub')">
            <i class="fab fa-github"></i> GitHub
          </button>
        </div>

        <div class="login-footer">
          Already have an account? <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>

    <div class="login-right">
      <div class="hero-glass">
        <div class="hero-title">Join Our<br><span>Community</span><br>Today</div>
        <div class="hero-desc">Create your account and enjoy exclusive deals, personalized recommendations, and a seamless shopping experience.</div>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Products</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4.8⭐</div>
            <div class="stat-label">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  // Validation
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    loading.value = false
    return
  }
  
  if (password.value !== password_confirmation.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }
  
  const result = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  })
  
  if (result.success) {
    success.value = 'Account created successfully!'
    
    // Auto login after registration
    const loginResult = await authStore.login({
      email: email.value,
      password: password.value
    })
    
    if (loginResult.success) {
      await Promise.all([
        cartStore.fetchCart(),
        wishlistStore.fetchWishlist()
      ])
      router.push('/')
    } else {
      // If auto-login fails, redirect to login page
      router.push('/login')
    }
  } else {
    error.value = result.error || 'Registration failed. Please try again.'
  }
  
  loading.value = false
}

const socialLogin = (provider) => {
  alert(`${provider} login will be available soon!`)
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.auth-page {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #1A1A2E 100%);
  overflow: hidden;
  position: relative;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: floatBlob 8s ease-in-out infinite;
}

.bg-blob-1 { width: 400px; height: 400px; background: radial-gradient(circle, #FFD700, transparent); top: -100px; right: -100px; animation-delay: 0s; }
.bg-blob-2 { width: 350px; height: 350px; background: radial-gradient(circle, #F5A623, transparent); bottom: -80px; left: -80px; animation-delay: 2s; }
.bg-blob-3 { width: 200px; height: 200px; background: radial-gradient(circle, #FFD700, transparent); top: 40%; left: 30%; animation-delay: 4s; opacity: 0.15; }

@keyframes floatBlob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.float-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  animation: floatShape 6s ease-in-out infinite;
}

.float-shape-1 { width: 60px; height: 60px; background: rgba(255, 215, 0, 0.15); top: 15%; right: 20%; border: 2px solid rgba(255, 215, 0, 0.1); animation-delay: 0s; }
.float-shape-2 { width: 40px; height: 40px; background: rgba(255, 215, 0, 0.15); bottom: 25%; left: 15%; border: 2px solid rgba(255, 215, 0, 0.1); animation-delay: 1.5s; }
.float-shape-3 { width: 80px; height: 80px; background: rgba(255, 215, 0, 0.08); top: 50%; right: 10%; border: 2px solid rgba(255, 215, 0, 0.08); animation-delay: 3s; }
.float-shape-4 { width: 30px; height: 30px; background: rgba(255, 215, 0, 0.2); bottom: 40%; right: 30%; border: 2px solid rgba(255, 215, 0, 0.15); animation-delay: 2s; }

@keyframes floatShape {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(20px, -20px) scale(1.2) rotate(180deg); }
}

.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  z-index: 2;
}

.glass-card {
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 28px;
  padding: 48px 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  background: linear-gradient(135deg, #FFD700, #F5A623);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #1A1A2E;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
}

.logo-text {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}

.logo-text span {
  color: #FFD700;
}

.welcome-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.welcome-title {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.welcome-title span {
  color: #FFD700;
}

.welcome-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin-bottom: 28px;
}

.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, 0.8); margin-bottom: 5px; }

.input-wrapper { position: relative; }
.input-wrapper .input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  transition: color 0.3s;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.input-wrapper input::placeholder { color: rgba(255, 255, 255, 0.3); }

.input-wrapper input:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.08);
}

.input-wrapper .toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s;
  padding: 4px;
}

.input-wrapper .toggle-password:hover { color: rgba(255, 255, 255, 0.7); }

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #FFD700, #F5A623);
  color: #1A1A2E;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  margin-top: 8px;
}

.btn-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn-login:hover::before { left: 100%; }
.btn-login:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3); }
.btn-login:active { transform: scale(0.98); }
.btn-login:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 22px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.divider span {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.social-login { display: flex; gap: 10px; }

.social-login .social-btn {
  flex: 1;
  padding: 11px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Inter', sans-serif;
}

.social-login .social-btn:hover {
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
}

.social-login .social-btn.google { color: #ea4335; }
.social-login .social-btn.facebook { color: #1877f2; }
.social-login .social-btn.github { color: #fff; }

.login-footer {
  margin-top: 22px;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

.login-footer a {
  color: #FFD700;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.login-footer a:hover { color: #e6c300; text-decoration: underline; }

.alert {
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.alert-danger { color: #ff6b6b; border-color: rgba(255, 107, 107, 0.2); }
.alert-success { color: #51cf66; border-color: rgba(81, 207, 102, 0.2); }
.alert i { font-size: 16px; }

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  z-index: 2;
}

.hero-glass {
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 28px;
  padding: 48px 44px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-title {
  font-size: 48px;
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 16px;
}

.hero-title span { color: #FFD700; }

.hero-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  margin-bottom: 32px;
}

.hero-stats { display: flex; gap: 20px; }

.stat-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 215, 0, 0.08);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
  transition: all 0.3s;
  cursor: default;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 215, 0, 0.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.2);
}

.stat-number {
  font-size: 24px;
  font-weight: 800;
  color: #FFD700;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  margin-top: 2px;
}

@media (max-width: 1024px) {
  .hero-title { font-size: 36px; }
  .glass-card { padding: 36px 28px; }
  .hero-glass { padding: 36px 28px; }
  .hero-stats { gap: 14px; }
  .stat-card { padding: 16px 12px; }
  .stat-number { font-size: 20px; }
}

@media (max-width: 768px) {
  .auth-page { overflow-y: auto; flex-direction: column; }
  .login-left { padding: 30px 20px; min-height: 50vh; }
  .login-right { padding: 30px 20px; min-height: 50vh; }
  .glass-card { max-width: 100%; padding: 32px 24px; }
  .hero-glass { max-width: 100%; padding: 32px 24px; }
  .hero-title { font-size: 32px; }
  .bg-blob-1, .bg-blob-2, .bg-blob-3 { display: none; }
  .float-shape { display: none; }
  .hero-stats { flex-wrap: wrap; }
  .stat-card { flex: 1 1 calc(33.33% - 10px); min-width: 100px; }
  .social-login { flex-direction: column; }
}

@media (max-width: 480px) {
  .login-left { padding: 20px 16px; }
  .login-right { padding: 20px 16px; }
  .glass-card { padding: 24px 16px; border-radius: 20px; }
  .hero-glass { padding: 24px 16px; border-radius: 20px; }
  .logo-text { font-size: 18px; }
  .welcome-title { font-size: 24px; }
  .hero-title { font-size: 26px; }
  .stat-card { padding: 12px 8px; }
  .stat-number { font-size: 17px; }
  .stat-label { font-size: 10px; }
  .btn-login { padding: 12px; font-size: 14px; }
}
</style>