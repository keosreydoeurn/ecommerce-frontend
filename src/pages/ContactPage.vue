<template>
  <div class="contact-page">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Contact Us</span>
        <h2>Get In <span>Touch</span></h2>
        <p>We'd love to hear from you. Reach out to us anytime.</p>
      </div>

      <div class="contact-content">
        <div class="contact-info-grid">
          <div class="info-item glass-card">
            <div class="info-icon">📧</div>
            <h3>Email</h3>
            <p>info@eshop.com</p>
            <p>support@eshop.com</p>
          </div>
          <div class="info-item glass-card">
            <div class="info-icon">📞</div>
            <h3>Phone</h3>
            <p>+1 234 567 890</p>
            <p>+1 234 567 891</p>
          </div>
          <div class="info-item glass-card">
            <div class="info-icon">📍</div>
            <h3>Address</h3>
            <p>123 Main Street,</p>
            <p>New York, NY 10001,</p>
            <p>United States</p>
          </div>
          <div class="info-item glass-card">
            <div class="info-icon">🕐</div>
            <h3>Working Hours</h3>
            <p>Mon - Fri: 9:00 - 18:00</p>
            <p>Sat: 10:00 - 16:00</p>
            <p>Sun: Closed</p>
          </div>
        </div>

        <div class="contact-form-container glass-card">
          <h2>Send Us a <span>Message</span></h2>
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input id="name" v-model="form.name" type="text" required placeholder="Your name" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" type="email" required placeholder="Your email" />
              </div>
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input id="subject" v-model="form.subject" type="text" required placeholder="Subject" />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" rows="5" required placeholder="Your message"></textarea>
            </div>
            <button type="submit" class="btn-submit" :disabled="sending">
              {{ sending ? 'Sending...' : 'Send Message →' }}
            </button>
            <div v-if="success" class="success">✅ Message sent successfully!</div>
          </form>
        </div>
      </div>

      <div class="map-container glass-card">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7aa73%3A0xb0c9c7b3b0e4b5a3!2sNew%20York%20City%20Hall!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus" 
          width="100%" 
          height="300" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const sending = ref(false)
const success = ref(false)

const submitForm = async () => {
  sending.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  success.value = true
  sending.value = false
  form.value = { name: '', email: '', subject: '', message: '' }
  setTimeout(() => success.value = false, 5000)
}
</script>

<style scoped>
.contact-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header .subtitle {
  display: inline-block;
  padding: 6px 20px;
  background: rgba(255, 215, 0, 0.1);
  color: #F4B400;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.section-header h2 {
  font-size: 38px;
  font-weight: 800;
  color: #1a1a2e;
}

.section-header h2 span {
  color: #F4B400;
}

.section-header p {
  color: #8a8a8a;
  font-size: 16px;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.info-item {
  padding: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  transition: all 0.3s;
}

.info-item:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 215, 0, 0.25);
}

.info-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.info-item h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.info-item p {
  color: #8a8a8a;
  margin: 2px 0;
}

.contact-form-container {
  padding: 40px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
}

.contact-form-container h2 {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.contact-form-container h2 span {
  color: #F4B400;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #1a1a2e;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 215, 0, 0.15);
  border-radius: 12px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.05);
  color: #1a1a2e;
  transition: all 0.3s;
  font-family: 'Inter', sans-serif;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #F4B400;
  box-shadow: 0 0 0 4px rgba(244, 180, 0, 0.08);
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  color: #1a1a2e;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  margin-top: 16px;
  padding: 14px;
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(46, 204, 113, 0.2);
}

.map-container {
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-info-grid {
    grid-template-columns: 1fr 1fr;
  }
  .section-header h2 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .contact-info-grid {
    grid-template-columns: 1fr;
  }
  .contact-form-container {
    padding: 24px 16px;
  }
}
</style>
