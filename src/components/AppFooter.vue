<template>
  <footer class="footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-grid">
        <!-- Brand Section -->
        <div class="footer-section brand-section">
          <div class="footer-brand">
            <div class="brand-icon-wrapper">
              <i class="fas fa-store-alt"></i>
            </div>
            <span class="brand-name">E-<span>Shop</span></span>
          </div>
          <p class="footer-desc">Your premium destination for quality products at unbeatable prices. Shop with confidence and experience the best online shopping.</p>
          <div class="footer-social">
            <a href="#" class="social-link facebook" title="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link instagram" title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-link twitter" title="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-link youtube" title="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="#" class="social-link linkedin" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="footer-section">
          <h4><i class="fas fa-link"></i> Quick Links</h4>
          <router-link to="/">
            <i class="fas fa-home"></i> Home
          </router-link>
          <router-link to="/shop">
            <i class="fas fa-shopping-bag"></i> Shop
          </router-link>
          <router-link to="/about">
            <i class="fas fa-info-circle"></i> About
          </router-link>
          <router-link to="/contact">
            <i class="fas fa-envelope"></i> Contact
          </router-link>
        </div>
        
        <!-- Customer Service -->
        <div class="footer-section">
          <h4><i class="fas fa-headset"></i> Customer Service</h4>
          <a href="#">
            <i class="fas fa-question-circle"></i> Help Center
          </a>
          <a href="#">
            <i class="fas fa-undo-alt"></i> Returns Policy
          </a>
          <a href="#">
            <i class="fas fa-truck"></i> Shipping Info
          </a>
          <a href="#">
            <i class="fas fa-comments"></i> FAQs
          </a>
        </div>
        
        <!-- Contact Info -->
        <div class="footer-section contact-section">
          <h4><i class="fas fa-address-card"></i> Contact Us</h4>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <span>info@eshop.com</span>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-phone-alt"></i>
            </div>
            <span>+1 (234) 567-890</span>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <span>123 Main Street, City</span>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-clock"></i>
            </div>
            <span>Mon-Fri: 9AM - 6PM</span>
          </div>
        </div>
      </div>
      
      
      
      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; 2026 <span>E-Shop</span>. All rights reserved.</p>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <span class="divider">|</span>
            <a href="#">Terms of Service</a>
            <span class="divider">|</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
        <div class="footer-payments">
          <span class="payment-icon" title="Visa">
            <i class="fab fa-cc-visa"></i>
          </span>
          <span class="payment-icon" title="Mastercard">
            <i class="fab fa-cc-mastercard"></i>
          </span>
          <span class="payment-icon" title="PayPal">
            <i class="fab fa-cc-paypal"></i>
          </span>
          <span class="payment-icon" title="Apple Pay">
            <i class="fab fa-cc-apple-pay"></i>
          </span>
          <span class="payment-icon" title="Stripe">
            <i class="fab fa-cc-stripe"></i>
          </span>
          <span class="payment-icon" title="Amazon Pay">
            <i class="fab fa-amazon-pay"></i>
          </span>
        </div>
      </div>
      
      <!-- Back to Top -->
      <button class="back-to-top" @click="scrollToTop" title="Back to Top">
        <i class="fas fa-chevron-up"></i>
      </button>
    </div>
  </footer>
</template>

<script setup>
const subscribeNewsletter = () => {
  alert('Thank you for subscribing to our newsletter!')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary-yellow: #FFD700;
  --primary-black: #1A1A2E;
  --primary-white: #FFFFFF;
  --gradient-dark: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
  --gradient-yellow: linear-gradient(135deg, #FFD700, #F5A623);
  --glass-bg: rgba(255, 255, 255, 0.04);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer {
  background: var(--gradient-dark);
  color: rgba(255, 255, 255, 0.7);
  padding: 60px 0 0;
  margin-top: 60px;
  border-top: 3px solid var(--primary-yellow);
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.03), transparent);
  border-radius: 50%;
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  animation: fadeInUp 0.6s ease both;
}

.footer-section:nth-child(2) { animation-delay: 0.1s; }
.footer-section:nth-child(3) { animation-delay: 0.2s; }
.footer-section:nth-child(4) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.brand-section {
  padding-right: 20px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.brand-icon-wrapper {
  width: 48px;
  height: 48px;
  background: var(--gradient-yellow);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--primary-black);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
  transition: var(--transition);
}

.footer-brand:hover .brand-icon-wrapper {
  transform: rotate(-10deg) scale(1.05);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.3);
}

.brand-name {
  font-size: 26px;
  font-weight: 800;
  color: var(--primary-white);
  letter-spacing: -0.5px;
}

.brand-name span {
  color: var(--primary-yellow);
}

.footer-desc {
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.8;
  margin-bottom: 24px;
  font-size: 14px;
}

.footer-social {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  background: var(--glass-bg);
}

.social-link:hover {
  transform: translateY(-4px) scale(1.05);
}

.social-link.facebook:hover {
  background: #1877f2;
  color: white;
  border-color: #1877f2;
  box-shadow: 0 8px 25px rgba(24, 119, 242, 0.3);
}

.social-link.instagram:hover {
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: white;
  border-color: #bc1888;
  box-shadow: 0 8px 25px rgba(188, 24, 136, 0.3);
}

.social-link.twitter:hover {
  background: #1da1f2;
  color: white;
  border-color: #1da1f2;
  box-shadow: 0 8px 25px rgba(29, 161, 242, 0.3);
}

.social-link.youtube:hover {
  background: #ff0000;
  color: white;
  border-color: #ff0000;
  box-shadow: 0 8px 25px rgba(255, 0, 0, 0.3);
}

.social-link.linkedin:hover {
  background: #0a66c2;
  color: white;
  border-color: #0a66c2;
  box-shadow: 0 8px 25px rgba(10, 102, 194, 0.3);
}

.footer-section h4 {
  color: var(--primary-yellow);
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.5px;
}

.footer-section h4 i {
  font-size: 14px;
}

.footer-section a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  margin-bottom: 12px;
  transition: var(--transition);
  font-size: 14px;
  padding: 6px 0;
}

.footer-section a i {
  font-size: 14px;
  width: 20px;
  transition: var(--transition);
}

.footer-section a:hover {
  color: var(--primary-yellow);
  padding-left: 8px;
}

.footer-section a:hover i {
  color: var(--primary-yellow);
  transform: scale(1.1);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  transition: var(--transition);
}

.contact-item:hover {
  color: rgba(255, 255, 255, 0.8);
}

.contact-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  background: var(--glass-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-yellow);
  font-size: 14px;
  border: 1px solid rgba(255, 215, 0, 0.08);
  transition: var(--transition);
}

.contact-item:hover .contact-icon {
  background: rgba(255, 215, 0, 0.1);
  transform: scale(1.05);
}

/* Newsletter Section */
.footer-newsletter {
  background: var(--glass-bg);
  border-radius: var(--border-radius);
  padding: 30px 40px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 215, 0, 0.06);
}

.newsletter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.newsletter-text {
  display: flex;
  align-items: center;
  gap: 16px;
}

.newsletter-text i {
  font-size: 32px;
  color: var(--primary-yellow);
  opacity: 0.8;
}

.newsletter-text h4 {
  color: var(--primary-white);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.newsletter-text p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  flex: 1;
  max-width: 420px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.05);
  color: var(--primary-white);
  font-size: 14px;
  transition: var(--transition);
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.newsletter-form input:focus {
  outline: none;
  border-color: var(--primary-yellow);
  box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.05);
}

.newsletter-form button {
  padding: 12px 24px;
  background: var(--gradient-yellow);
  color: var(--primary-black);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.newsletter-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.newsletter-form button i {
  font-size: 14px;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.footer-copyright {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-copyright p {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

.footer-copyright p span {
  color: var(--primary-yellow);
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  font-size: 13px;
  transition: var(--transition);
}

.footer-legal a:hover {
  color: var(--primary-yellow);
}

.footer-legal .divider {
  color: rgba(255, 255, 255, 0.1);
}

.footer-payments {
  display: flex;
  gap: 16px;
  font-size: 28px;
}

.payment-icon {
  color: rgba(255, 255, 255, 0.2);
  transition: var(--transition);
  cursor: default;
}

.payment-icon:hover {
  color: var(--primary-yellow);
  transform: translateY(-2px);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  background: var(--gradient-yellow);
  color: var(--primary-black);
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
  z-index: 999;
}

.back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 30px;
  }
  
  .brand-section {
    grid-column: 1 / -1;
    padding-right: 0;
  }
  
  .newsletter-content {
    flex-direction: column;
    text-align: center;
  }
  
  .newsletter-form {
    max-width: 100%;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-copyright {
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-legal {
    justify-content: center;
  }
  
  .footer-payments {
    justify-content: center;
  }
  
  .footer-newsletter {
    padding: 24px 20px;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form button {
    justify-content: center;
  }
  
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .footer {
    padding: 40px 0 0;
  }
  
  .brand-section {
    text-align: center;
  }
  
  .footer-brand {
    justify-content: center;
  }
  
  .footer-social {
    justify-content: center;
  }
  
  .footer-section h4 {
    justify-content: center;
  }
  
  .footer-section a {
    justify-content: center;
  }
  
  .contact-item {
    justify-content: center;
  }
  
  .footer-legal {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>