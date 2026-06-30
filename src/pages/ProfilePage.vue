<template>
  <div class="profile-page">
    <div class="container">
      <h1>My Profile</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading profile...</p>
      </div>
      
      <div v-else-if="authStore.user" class="profile-content">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-wrapper">
              <img :src="avatarPreview || authStore.user.avatar || 'https://ui-avatars.com/api/?name=' + authStore.user.name + '&background=667eea&color=fff&size=100'" :alt="authStore.user.name" />
              <label class="avatar-upload">
                <input type="file" @change="handleAvatarUpload" accept="image/*" />
                <span>📷</span>
              </label>
            </div>
            <h2>{{ authStore.user.name }}</h2>
            <p class="email">{{ authStore.user.email }}</p>
            <p class="member-since">
              Member since {{ new Date(authStore.user.created_at).toLocaleDateString() }}
            </p>
          </div>
        </div>
        
        <div class="profile-forms">
          <div class="form-card">
            <h3>Update Profile</h3>
            <form @submit.prevent="updateProfile">
              <div class="form-group">
                <label>Full Name</label>
                <input v-model="profileData.name" type="text" required class="form-input" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input v-model="profileData.email" type="email" required class="form-input" />
              </div>
              <button type="submit" class="btn-update" :disabled="updating">
                {{ updating ? 'Updating...' : 'Update Profile' }}
              </button>
              <div v-if="updateSuccess" class="success-message">✅ Profile updated successfully!</div>
              <div v-if="updateError" class="error-message">{{ updateError }}</div>
            </form>
          </div>
          
          <div class="form-card">
            <h3>Change Password</h3>
            <form @submit.prevent="changePassword">
              <div class="form-group">
                <label>Current Password</label>
                <input v-model="passwordData.current_password" type="password" required class="form-input" />
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input v-model="passwordData.new_password" type="password" required class="form-input" />
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <input v-model="passwordData.new_password_confirmation" type="password" required class="form-input" />
              </div>
              <button type="submit" class="btn-password" :disabled="changingPassword">
                {{ changingPassword ? 'Changing...' : 'Change Password' }}
              </button>
              <div v-if="passwordSuccess" class="success-message">✅ Password changed successfully!</div>
              <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { api } from '../api/client'

const authStore = useAuthStore()
const loading = ref(true)
const updating = ref(false)
const changingPassword = ref(false)
const updateSuccess = ref(false)
const updateError = ref('')
const passwordSuccess = ref(false)
const passwordError = ref('')
const avatarPreview = ref(null)

const profileData = ref({
  name: '',
  email: '',
})

const passwordData = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
})

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
      // Here you would upload to server
      alert('Avatar uploaded! (Would save to server)')
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = async () => {
  updating.value = true
  updateSuccess.value = false
  updateError.value = ''
  
  const result = await authStore.updateProfile(profileData.value)
  
  if (result.success) {
    updateSuccess.value = true
    setTimeout(() => updateSuccess.value = false, 3000)
  } else {
    updateError.value = result.error || 'Failed to update profile'
  }
  
  updating.value = false
}

const changePassword = async () => {
  if (passwordData.value.new_password !== passwordData.value.new_password_confirmation) {
    passwordError.value = 'New passwords do not match'
    return
  }
  
  if (passwordData.value.new_password.length < 6) {
    passwordError.value = 'New password must be at least 6 characters'
    return
  }
  
  changingPassword.value = true
  passwordSuccess.value = false
  passwordError.value = ''
  
  const result = await authStore.changePassword(passwordData.value)
  
  if (result.success) {
    passwordSuccess.value = true
    passwordData.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    }
    setTimeout(() => passwordSuccess.value = false, 3000)
  } else {
    passwordError.value = result.error || 'Failed to change password'
  }
  
  changingPassword.value = false
}

onMounted(async () => {
  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchProfile()
  }
  if (authStore.user) {
    profileData.value.name = authStore.user.name
    profileData.value.email = authStore.user.email
  }
  loading.value = false
})
</script>

<style scoped>
.profile-page {
  padding: 40px 0;
  min-height: calc(100vh - 200px);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 30px;
}

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  text-align: center;
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 15px;
}

.avatar-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
}

.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #667eea;
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
}

.avatar-upload input {
  display: none;
}

.profile-avatar h2 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.profile-avatar .email {
  color: #666;
  margin-bottom: 5px;
}

.profile-avatar .member-since {
  color: #999;
  font-size: 14px;
}

.profile-forms {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.form-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-update {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-update:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-password {
  padding: 12px 30px;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-password:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

.btn-update:disabled,
.btn-password:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 10px;
  padding: 10px;
  background: #d4edda;
  color: #155724;
  border-radius: 6px;
  font-size: 14px;
}

.error-message {
  margin-top: 10px;
  padding: 10px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
}
</style>
