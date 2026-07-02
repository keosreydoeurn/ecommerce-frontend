<template>
  <div class="contact-page">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="section-header">
          <span class="subtitle">📬 Contact Us</span>
          <h2>Get In <span>Touch</span></h2>
          <p>We're here to help! Reach out to us for any questions, support, or collaboration opportunities.</p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-item glass-card">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Support Available</div>
        </div>
        <div class="stat-item glass-card">
          <div class="stat-number">15min</div>
          <div class="stat-label">Average Response Time</div>
        </div>
        <div class="stat-item glass-card">
          <div class="stat-number">100%</div>
          <div class="stat-label">Satisfaction Rate</div>
        </div>
        <div class="stat-item glass-card">
          <div class="stat-number">10K+</div>
          <div class="stat-label">Happy Customers</div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="contact-info-grid">
        <div class="info-item glass-card" v-for="item in contactInfo" :key="item.title">
          <div class="info-icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <div v-for="detail in item.details" :key="detail" class="info-detail">
            <p>{{ detail }}</p>
          </div>
          <div v-if="item.action" class="info-action">
            <button class="action-btn" @click="handleAction(item.action)">
              {{ item.actionLabel }}
            </button>
          </div>
        </div>
      </div>

      <!-- Contact Form & Additional Info -->
      <div class="contact-wrapper">
        <div class="contact-form-container glass-card">
          <h2>Send Us a <span>Message</span></h2>
          <p class="form-subtitle">We'll get back to you within 24 hours</p>
          
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input 
                  id="name" 
                  v-model="form.name" 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  :class="{ 'error': errors.name }"
                />
                <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
              </div>
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  required 
                  placeholder="john@example.com"
                  :class="{ 'error': errors.email }"
                />
                <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                id="phone" 
                v-model="form.phone" 
                type="tel" 
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <div class="form-group">
              <label for="subject">Subject *</label>
              <select id="subject" v-model="form.subject" required :class="{ 'error': errors.subject }">
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales & Pricing</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
              <span v-if="errors.subject" class="error-text">{{ errors.subject }}</span>
            </div>
            
            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                required 
                placeholder="How can we help you?"
                :class="{ 'error': errors.message }"
              ></textarea>
              <div class="char-counter">{{ form.message.length }}/500</div>
              <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
            </div>
            
            <div class="form-footer">
              <div class="form-actions">
                <button type="submit" class="btn-submit" :disabled="sending">
                  <span v-if="!sending">Send Message →</span>
                  <span v-else>
                    <span class="spinner"></span> Sending...
                  </span>
                </button>
                <button type="reset" class="btn-reset" @click="resetForm">Clear</button>
              </div>
              <div v-if="success" class="success">
                <span class="success-icon">✅</span>
                <div>
                  <strong>Message sent successfully!</strong>
                  <p>We'll respond to you within 24 hours.</p>
                </div>
              </div>
              <div v-if="error" class="error-message">
                <span class="error-icon">❌</span>
                <span>{{ error }}</span>
              </div>
            </div>
          </form>
        </div>

        <!-- Side Info -->
        <div class="side-info">
          <div class="faq-card glass-card">
            <h3>❓ Frequently Asked</h3>
            <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
              <button class="faq-question" @click="toggleFaq(index)">
                {{ faq.question }}
                <span class="faq-toggle">{{ activeFaq === index ? '−' : '+' }}</span>
              </button>
              <div v-if="activeFaq === index" class="faq-answer">
                {{ faq.answer }}
              </div>
            </div>
          </div>

          <div class="social-card glass-card">
            <h3>🌐 Connect With Us</h3>
            <div class="social-links">
              <a href="#" class="social-link" v-for="social in socialLinks" :key="social.name">
                <span class="social-icon">{{ social.icon }}</span>
                <span>{{ social.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Map & Business Hours -->
      <div class="map-section">
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

      <!-- Newsletter -->
      <div class="newsletter-section glass-card">
        <div class="newsletter-content">
          <h3>📨 Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest updates and offers</p>
          <div class="newsletter-form">
            <input 
              type="email" 
              v-model="newsletterEmail" 
              placeholder="Enter your email"
              @keyup.enter="subscribeNewsletter"
            />
            <button @click="subscribeNewsletter" class="btn-newsletter">
              Subscribe
            </button>
          </div>
          <p v-if="newsletterSuccess" class="newsletter-success">✅ Subscribed successfully!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sending = ref(false)
const success = ref(false)
const error = ref('')
const newsletterEmail = ref('')
const newsletterSuccess = ref(false)
const activeFaq = ref(null)

// Contact Information
const contactInfo = [
  {
    icon: '📧',
    title: 'Email Us',
    details: ['info@eshop.com', 'support@eshop.com', 'sales@eshop.com'],
    action: 'email',
    actionLabel: 'Send Email'
  },
  {
    icon: '📞',
    title: 'Call Us',
    details: ['+1 (234) 567-8900', '+1 (234) 567-8901', 'Toll-free: 1-800-ES-HOP'],
    action: 'phone',
    actionLabel: 'Call Now'
  },
  {
    icon: '📍',
    title: 'Visit Us',
    details: ['123 Main Street, Suite 100', 'New York, NY 10001', 'United States'],
    action: 'directions',
    actionLabel: 'Get Directions'
  },
  {
    icon: '🕐',
    title: 'Working Hours',
    details: [
      'Monday - Friday: 9:00 - 18:00',
      'Saturday: 10:00 - 16:00',
      'Sunday: Closed',
      'Emergency: 24/7 Support'
    ]
  }
]

// FAQ Data
const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, while express shipping delivers within 1-2 business days.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all products. Items must be returned in original condition.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by destination.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track it in your account.'
  }
]

// Social Links
const socialLinks = [
  { name: 'Facebook', icon: '📘' },
  { name: 'Twitter', icon: '🐦' },
  { name: 'Instagram', icon: '📸' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'YouTube', icon: '▶️' }
]

// Form Validation
const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!form.subject) {
    errors.subject = 'Please select a subject'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (form.message.length > 500) {
    errors.message = 'Message cannot exceed 500 characters'
    isValid = false
  }

  return isValid
}

// Submit Form
const submitForm = async () => {
  if (!validateForm()) return

  sending.value = true
  error.value = ''
  success.value = false

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    success.value = true
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    setTimeout(() => success.value = false, 5000)
  } catch (err) {
    error.value = 'Failed to send message. Please try again.'
  } finally {
    sending.value = false
  }
}

// Reset Form
const resetForm = () => {
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  Object.assign(errors, {
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  error.value = ''
  success.value = false
}

// Toggle FAQ
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// Handle Action Buttons
const handleAction = (action) => {
  switch(action) {
    case 'email':
      window.location.href = 'mailto:info@eshop.com'
      break
    case 'phone':
      window.location.href = 'tel:+12345678900'
      break
    case 'directions':
      window.open('https://maps.google.com', '_blank')
      break
  }
}

// Newsletter Subscription
const subscribeNewsletter = () => {
  if (newsletterEmail.value && newsletterEmail.value.includes('@')) {
    newsletterSuccess.value = true
    setTimeout(() => {
      newsletterSuccess.value = false
      newsletterEmail.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.contact-page {
  padding: 40px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

/* Hero Section */
.hero-section {
  margin-bottom: 40px;
}

.section-header {
  text-align: center;
  padding: 40px 20px;
}

.section-header .subtitle {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(244, 180, 0, 0.15);
  color: #F4B400;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
  border: 1px solid rgba(244, 180, 0, 0.2);
}

.section-header h2 {
  font-size: 48px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.section-header h2 span {
  color: #F4B400;
}

.section-header p {
  color: #5a5a7a;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-item {
  text-align: center;
  padding: 24px;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #F4B400;
  margin-bottom: 4px;
}

.stat-label {
  color: #5a5a7a;
  font-size: 14px;
  font-weight: 500;
}

/* Contact Info Grid */
.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.info-item {
  padding: 28px 24px;
  text-align: center;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.info-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(244, 180, 0, 0.15);
}

.info-icon {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}

.info-item h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.info-detail p {
  color: #5a5a7a;
  margin: 4px 0;
  font-size: 15px;
}

.info-action {
  margin-top: 12px;
}

.action-btn {
  padding: 8px 20px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  border: none;
  border-radius: 30px;
  font-weight: 600;
  color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.action-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(244, 180, 0, 0.3);
}

/* Contact Wrapper */
.contact-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.contact-form-container {
  padding: 40px;
  border-radius: 24px;
}

.contact-form-container h2 {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.contact-form-container h2 span {
  color: #F4B400;
}

.form-subtitle {
  color: #5a5a7a;
  margin-bottom: 24px;
  font-size: 15px;
}

/* Form Styles */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #1a1a2e;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.8);
  color: #1a1a2e;
  transition: all 0.3s;
  font-family: 'Inter', sans-serif;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #F4B400;
  box-shadow: 0 0 0 4px rgba(244, 180, 0, 0.08);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.char-counter {
  text-align: right;
  font-size: 12px;
  color: #8a8a8a;
  margin-top: 4px;
}

.form-footer {
  margin-top: 24px;
}

.form-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-submit {
  flex: 1;
  padding: 14px 28px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  color: #1a1a2e;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-reset {
  padding: 14px 28px;
  background: transparent;
  color: #5a5a7a;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-reset:hover {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.15);
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(26, 26, 46, 0.1);
  border-top-color: #1a1a2e;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success {
  margin-top: 16px;
  padding: 16px 20px;
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border-radius: 12px;
  border: 1px solid rgba(46, 204, 113, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
}

.success-icon {
  font-size: 24px;
}

.success p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.error-message {
  margin-top: 16px;
  padding: 14px 20px;
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border-radius: 12px;
  border: 1px solid rgba(231, 76, 60, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Side Info */
.side-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-card {
  padding: 28px 24px;
  border-radius: 20px;
}

.faq-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 16px;
}

.faq-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 12px 0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;
  font-family: 'Inter', sans-serif;
  padding: 4px 0;
}

.faq-question:hover {
  color: #F4B400;
}

.faq-toggle {
  font-size: 22px;
  color: #F4B400;
  font-weight: 300;
  margin-left: 12px;
}

.faq-answer {
  padding: 8px 0 4px;
  color: #5a5a7a;
  font-size: 14px;
  line-height: 1.6;
}

/* Social Card */
.social-card {
  padding: 28px 24px;
  border-radius: 20px;
}

.social-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 16px;
}

.social-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  color: #1a1a2e;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(244, 180, 0, 0.1);
  transform: translateX(4px);
}

.social-icon {
  font-size: 20px;
}

/* Map Section */
.map-section {
  margin-bottom: 40px;
}

.map-container {
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.map-container iframe {
  display: block;
}

/* Newsletter */
.newsletter-section {
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  background: linear-gradient(135deg, rgba(244, 180, 0, 0.05), rgba(255, 213, 79, 0.05));
}

.newsletter-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.newsletter-content p {
  color: #5a5a7a;
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 18px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #F4B400;
  box-shadow: 0 0 0 4px rgba(244, 180, 0, 0.08);
}

.btn-newsletter {
  padding: 12px 28px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  border: none;
  border-radius: 12px;
  font-weight: 700;
  color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-newsletter:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(244, 180, 0, 0.3);
}

.newsletter-success {
  margin-top: 12px;
  color: #2ecc71;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 992px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }
  
  .side-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-info-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .section-header h2 {
    font-size: 32px;
  }
  
  .side-info {
    grid-template-columns: 1fr;
  }
  
  .contact-form-container {
    padding: 24px 16px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-submit,
  .btn-reset {
    width: 100%;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .contact-info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header h2 {
    font-size: 28px;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
}
</style>