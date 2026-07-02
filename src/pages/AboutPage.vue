<template>
  <div class="about-page">
    <div class="container">
      <!-- Hero Section -->
      <div class="section-header">
        <span class="subtitle">✨ About Us</span>
        <h2>Who We <span>Are</span></h2>
        <p>Discover the story behind E-Shop and our commitment to excellence</p>
      </div>

      <!-- Story Section -->
      <div class="story-section glass-card">
        <div class="story-content">
          <div class="story-text">
            <span class="story-badge">Our Story</span>
            <h2>Building Dreams Since <span>2020</span></h2>
            <p class="story-intro">What started as a small vision has grown into a global community of satisfied customers.</p>
            <div class="story-details">
              <p>E-Shop was founded with a simple yet powerful mission: to revolutionize the online shopping experience by combining quality products with exceptional service. Our journey began with just a handful of products and an unwavering commitment to customer satisfaction.</p>
              <p>Today, we're proud to serve thousands of customers across 30+ countries, offering a curated selection of premium products at competitive prices. Our success is built on trust, transparency, and a deep understanding of what our customers truly need.</p>
            </div>
            <div class="story-highlights">
              <div class="highlight-item">
                <span class="highlight-number">5+</span>
                <span class="highlight-label">Years of Excellence</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-number">50K+</span>
                <span class="highlight-label">Happy Customers</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-number">100%</span>
                <span class="highlight-label">Customer Satisfaction</span>
              </div>
            </div>
          </div>
          <div class="story-image">
            <img src="https://i.pinimg.com/736x/a8/7d/ec/a87deceb186e37c5edb905c025f22c3a.jpg" alt="Our Story" />
            <div class="image-badge">⭐ Trusted Since 2020</div>
          </div>
        </div>
      </div>

      <!-- Mission Vision Values -->
      <div class="mvp-section">
        <div class="mvp-grid">
          <div class="mvp-card glass-card" v-for="item in mvpData" :key="item.title">
            <div class="mvp-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div v-if="item.points" class="mvp-points">
              <span v-for="point in item.points" :key="point" class="mvp-point">
                {{ point }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Choose Us -->
      <div class="choose-section">
        <div class="section-header">
          <span class="subtitle">Why Choose Us</span>
          <h2>What Makes Us <span>Different</span></h2>
          <p>Here's why thousands of customers trust E-Shop for their shopping needs</p>
        </div>
        <div class="choose-grid">
          <div class="choose-card glass-card" v-for="reason in reasons" :key="reason.title">
            <div class="choose-icon">{{ reason.icon }}</div>
            <h3>{{ reason.title }}</h3>
            <p>{{ reason.description }}</p>
            <div class="choose-stats">
              <span class="stat-highlight">{{ reason.stat }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item glass-card" v-for="stat in statistics" :key="stat.label">
            <div class="stat-number" :data-count="stat.number">
              <span class="counter">{{ stat.number }}</span>
              <span class="stat-suffix">{{ stat.suffix || '' }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline-section">
        <div class="section-header">
          <span class="subtitle">Our Journey</span>
          <h2>Company <span>Timeline</span></h2>
          <p>Key milestones in our growth story</p>
        </div>
        <div class="timeline">
          <div class="timeline-item" v-for="(event, index) in timeline" :key="index">
            <div class="timeline-marker" :class="{ 'active': index % 2 === 0 }">
              <span class="year">{{ event.year }}</span>
            </div>
            <div class="timeline-content glass-card">
              <h4>{{ event.title }}</h4>
              <p>{{ event.description }}</p>
              <span class="timeline-tag">{{ event.tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="team-section">
        <div class="section-header">
          <span class="subtitle">Our Team</span>
          <h2>Meet Our <span>Leaders</span></h2>
          <p>The passionate people behind E-Shop's success</p>
        </div>
        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card glass-card">
            <div class="team-image">
              <img :src="member.image" :alt="member.name" />
              <div class="team-status" :class="member.status"></div>
            </div>
            <h4>{{ member.name }}</h4>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-bio">{{ member.bio }}</p>
            <div class="team-social">
              <a href="#" class="social-link" v-for="social in member.social" :key="social.platform">
                {{ social.icon }}
              </a>
            </div>
            <div class="team-experience">
              <span>⭐ {{ member.experience }} years experience</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="testimonials-section">
        <div class="section-header">
          <span class="subtitle">Testimonials</span>
          <h2>What Our <span>Customers Say</span></h2>
          <p>Real feedback from real people who love E-Shop</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card glass-card" v-for="testimonial in testimonials" :key="testimonial.name">
            <div class="testimonial-rating">
              <span v-for="n in 5" :key="n" class="star">⭐</span>
            </div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <img :src="testimonial.avatar" :alt="testimonial.name" />
              <div>
                <h4>{{ testimonial.name }}</h4>
                <span>{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partners -->
      <div class="partners-section glass-card">
        <h3>🤝 Trusted By Leading Brands</h3>
        <div class="partners-grid">
          <div class="partner-item" v-for="partner in partners" :key="partner">
            <span>{{ partner }}</span>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section glass-card">
        <div class="cta-content">
          <h2>Ready to Experience <span>E-Shop</span>?</h2>
          <p>Join thousands of satisfied customers and discover the difference</p>
          <div class="cta-buttons">
            <button class="btn-primary" @click="navigateToShop">Shop Now →</button>
            <button class="btn-secondary" @click="navigateToContact">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Team Data
const team = [
  { 
    name: 'KEO YERAR', 
    role: 'CEO & Founder', 
    image: 'https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/724590239_1631381212328505_832577750490264161_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s960x960&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFKkkFAcTGe9DHXiq9_94r6UeCLsCUJzMZR4IuwJQnMxgZY51il2tUlezeY2LwA-G_zPrB8Lm2F6M8sGf2ejS07&_nc_ohc=ZG_fCc1LIKgQ7kNvwHjZmXP&_nc_oc=AdqLOq5ljXiiVmh-1jKUt7Z5am9OcObWXeoIPI7Ycz1oF281dOCwLg2kl1I5GpFL3Pw&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=rCV7vx-7SEZ73gO8XThuvQ&_nc_ss=7b2a8&oh=00_Af_3QCmHPdGErkE0bERw0gy28jorLmRKSlGiMfh30AECtA&oe=6A4797B7', 
    bio: 'Visionary leader with a passion for e-commerce innovation.',
    status: 'online',
    experience: 8,
    social: [
      { platform: 'linkedin', icon: '💼' },
      { platform: 'twitter', icon: '🐦' },
      { platform: 'instagram', icon: '📸' }
    ]
  },
  { 
    name: 'CHOI YEONJUN', 
    role: 'Head of Operations', 
    image: 'https://i.pinimg.com/736x/69/97/cc/6997cc7881f1a5844a4aa427c81a8ba7.jpg',
    bio: 'Operations expert ensuring smooth delivery worldwide.',
    status: 'online',
    experience: 6,
    social: [
      { platform: 'linkedin', icon: '💼' },
      { platform: 'twitter', icon: '🐦' }
    ]
  },
  { 
    name: 'HWANG YEJI', 
    role: 'Marketing Director', 
    image: 'https://i.pinimg.com/736x/27/8e/38/278e384f0903288ef2b38bf8752b729c.jpg',
    bio: 'Creative marketing strategist driving brand growth.',
    status: 'away',
    experience: 5,
    social: [
      { platform: 'linkedin', icon: '💼' },
      { platform: 'instagram', icon: '📸' }
    ]
  },
  { 
    name: 'KAI', 
    role: 'Customer Support Lead', 
    image: 'https://i.pinimg.com/1200x/18/26/2c/18262c75c5421502bbb65f2565c4e694.jpg',
    bio: 'Customer satisfaction champion with a heart for service.',
    status: 'online',
    experience: 4,
    social: [
      { platform: 'twitter', icon: '🐦' }
    ]
  },
  { 
    name: 'JENNIE KIM', 
    role: 'Product Manager', 
    image: 'https://i.pinimg.com/1200x/37/dc/ca/37dccaf3a81082585205b3f8975c0489.jpg',
    bio: 'Product development expert creating amazing experiences.',
    status: 'offline',
    experience: 7,
    social: [
      { platform: 'linkedin', icon: '💼' },
      { platform: 'instagram', icon: '📸' }
    ]
  }
]

// MVP Data
const mvpData = [
  {
    icon: '🎯',
    title: 'Our Mission',
    description: 'To provide high-quality products at affordable prices with exceptional customer service and a seamless shopping experience.',
    points: ['Quality Products', 'Affordable Pricing', 'Exceptional Service']
  },
  {
    icon: '👁️',
    title: 'Our Vision',
    description: 'To become the most trusted and preferred online shopping destination globally, known for quality, reliability, and innovation.',
    points: ['Global Leader', 'Trusted Brand', 'Innovation Driven']
  },
  {
    icon: '💎',
    title: 'Our Values',
    description: 'We operate with integrity, transparency, and a commitment to excellence in everything we do.',
    points: ['Integrity', 'Innovation', 'Excellence', 'Sustainability', 'Customer First']
  }
]

// Reasons to Choose
const reasons = [
  {
    icon: '🛡️',
    title: 'Quality Assurance',
    description: 'Every product undergoes rigorous quality checks to ensure you get the best.',
    stat: '100% Quality Guaranteed'
  },
  {
    icon: '🚀',
    title: 'Fast Delivery',
    description: 'Lightning-fast shipping with real-time tracking available 24/7.',
    stat: '2-3 Day Average Delivery'
  },
  {
    icon: '💳',
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-level security encryption.',
    stat: '256-bit SSL Encryption'
  },
  {
    icon: '🎧',
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you.',
    stat: '15-min Response Time'
  },
  {
    icon: '💰',
    title: 'Best Prices',
    description: 'Competitive pricing with regular deals and exclusive discounts.',
    stat: 'Up to 50% Off Deals'
  },
  {
    icon: '🔄',
    title: 'Easy Returns',
    description: 'Hassle-free returns and exchanges with our 30-day policy.',
    stat: '30-Day Money Back'
  }
]

// Statistics
const statistics = [
  { number: '50K+', suffix: '', label: 'Happy Customers', description: 'Growing family of satisfied shoppers' },
  { number: '10K+', suffix: '', label: 'Products Sold', description: 'Quality items delivered worldwide' },
  { number: '4.8', suffix: '⭐', label: 'Customer Rating', description: 'Based on 5,000+ reviews' },
  { number: '100+', suffix: '', label: 'Brands', description: 'Curated selection of premium brands' },
  { number: '30+', suffix: '', label: 'Countries', description: 'Global reach across continents' },
  { number: '98', suffix: '%', label: 'Satisfaction', description: 'Customer satisfaction rate' }
]

// Timeline
const timeline = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'E-Shop was established with a vision to transform online shopping.',
    tag: '🚀 Launch'
  },
  {
    year: '2021',
    title: 'First 10K Customers',
    description: 'Reached 10,000 happy customers across 5 countries.',
    tag: '🎯 Milestone'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded operations to 20+ countries with new product lines.',
    tag: '🌍 Growth'
  },
  {
    year: '2023',
    title: 'Award Winner',
    description: 'Received Best Online Retailer Award for excellence in service.',
    tag: '🏆 Award'
  },
  {
    year: '2024',
    title: '50K+ Customers',
    description: 'Surpassed 50,000 satisfied customers worldwide.',
    tag: '⭐ Achievement'
  }
]

// Testimonials
const testimonials = [
  {
    name: 'Sarah kim',
    role: 'Fashion Designer',
    text: 'The quality of products and customer service is outstanding. E-Shop has become my go-to shopping destination.',
    avatar: 'https://i.pinimg.com/1200x/08/ce/b8/08ceb8a87180a9d641ec694999f3743a.jpg'
  },
  {
    name: 'Yuna Park',
    role: 'Tech Entrepreneur',
    text: 'Incredible variety and unbeatable prices. I\'ve recommended E-Shop to all my colleagues and friends.',
    avatar: 'https://i.pinimg.com/736x/90/6b/02/906b02278edfc38bada0c7db75878976.jpg'
  },
  {
    name: 'Soungmin Lee',
    role: 'Fitness Coach',
    text: 'Fast shipping and amazing customer support. The team really cares about customer satisfaction.',
    avatar: 'https://i.pinimg.com/736x/64/c3/24/64c3243138688376953ee59091f1a709.jpg'
  }
]

// Partners
const partners = [
  'Amazon Partner', 'Shopify Expert', 'Google Certified', 
  'McAfee Secure', 'Mastercard Partner', 'Visa Partner'
]

// Navigation Methods
const navigateToShop = () => {
  // Navigate to shop page
  console.log('Navigate to shop')
}

const navigateToContact = () => {
  // Navigate to contact page
  console.log('Navigate to contact')
}

// Counter Animation
onMounted(() => {
  const counters = document.querySelectorAll('.stat-number .counter')
  counters.forEach(counter => {
    const target = parseInt(counter.textContent)
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    
    const updateCounter = () => {
      current += step
      if (current < target) {
        counter.textContent = Math.round(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter()
          observer.unobserve(entry.target)
        }
      })
    })
    
    observer.observe(counter)
  })
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.about-page {
  padding: 40px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8edf5 100%);
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

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 40px;
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
  font-size: 42px;
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

/* Story Section */
.story-section {
  padding: 40px;
  border-radius: 24px;
  margin-bottom: 40px;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.story-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(244, 180, 0, 0.1);
  color: #F4B400;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.story-text h2 {
  font-size: 36px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.story-text h2 span {
  color: #F4B400;
}

.story-intro {
  font-size: 18px;
  color: #5a5a7a;
  margin-bottom: 16px;
  font-weight: 500;
}

.story-details p {
  color: #6a6a8a;
  line-height: 1.8;
  margin-bottom: 12px;
}

.story-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.highlight-item {
  text-align: center;
}

.highlight-number {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: #F4B400;
}

.highlight-label {
  font-size: 13px;
  color: #5a5a7a;
}

.story-image {
  position: relative;
}

.story-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
}

.image-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(244, 180, 0, 0.95);
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: 600;
  color: #1a1a2e;
  font-size: 14px;
}

/* MVP Section */
.mvp-section {
  margin-bottom: 40px;
}

.mvp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.mvp-card {
  padding: 30px 24px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.mvp-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(244, 180, 0, 0.12);
}

.mvp-icon {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}

.mvp-card h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.mvp-card p {
  color: #5a5a7a;
  line-height: 1.6;
  font-size: 15px;
}

.mvp-points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}

.mvp-point {
  background: rgba(244, 180, 0, 0.1);
  color: #F4B400;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* Choose Section */
.choose-section {
  margin-bottom: 40px;
}

.choose-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.choose-card {
  padding: 28px 24px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.choose-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(244, 180, 0, 0.1);
}

.choose-icon {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}

.choose-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.choose-card p {
  color: #5a5a7a;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.choose-stats {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(244, 180, 0, 0.1);
  border-radius: 20px;
}

.stat-highlight {
  font-size: 14px;
  font-weight: 600;
  color: #F4B400;
}

/* Stats Section */
.stats-section {
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.stat-item {
  padding: 24px 16px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.08);
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #F4B400;
  margin-bottom: 4px;
}

.stat-suffix {
  font-size: 24px;
  margin-left: 2px;
}

.stat-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 2px;
}

.stat-description {
  font-size: 12px;
  color: #8a8a8a;
}

/* Timeline */
.timeline-section {
  margin-bottom: 40px;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #F4B400, #FFD54F);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px;
  position: relative;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  justify-content: flex-start;
  margin-left: 50%;
}

.timeline-marker {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  border: 3px solid #F4B400;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  left: -30px;
  box-shadow: 0 4px 20px rgba(244, 180, 0, 0.2);
}

.timeline-item:nth-child(even) .timeline-marker {
  left: auto;
  right: -30px;
}

.timeline-marker.active {
  background: #F4B400;
  color: white;
}

.year {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
}

.timeline-marker.active .year {
  color: white;
}

.timeline-content {
  padding: 20px 24px;
  border-radius: 16px;
  width: calc(100% - 40px);
}

.timeline-content h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.timeline-content p {
  color: #5a5a7a;
  font-size: 14px;
  margin-bottom: 8px;
}

.timeline-tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(244, 180, 0, 0.1);
  color: #F4B400;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* Team Section */
.team-section {
  margin-bottom: 40px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.team-card {
  padding: 24px 20px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(244, 180, 0, 0.1);
}

.team-image {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

.team-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #F4B400;
}

.team-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid white;
}

.team-status.online {
  background: #2ecc71;
}

.team-status.away {
  background: #f39c12;
}

.team-status.offline {
  background: #95a5a6;
}

.team-card h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 2px;
}

.team-role {
  color: #F4B400;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.team-bio {
  color: #5a5a7a;
  font-size: 13px;
  margin-bottom: 8px;
}

.team-social {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(244, 180, 0, 0.1);
  transform: scale(1.1);
}

.team-experience {
  font-size: 12px;
  color: #8a8a8a;
}

/* Testimonials */
.testimonials-section {
  margin-bottom: 40px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  padding: 28px 24px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(244, 180, 0, 0.08);
}

.testimonial-rating {
  margin-bottom: 12px;
}

.star {
  font-size: 16px;
  opacity: 0.8;
}

.testimonial-text {
  color: #1a1a2e;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial-author img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-author h4 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.testimonial-author span {
  font-size: 13px;
  color: #8a8a8a;
}

/* Partners */
.partners-section {
  padding: 32px 24px;
  border-radius: 20px;
  margin-bottom: 40px;
  text-align: center;
}

.partners-section h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 20px;
}

.partners-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.partner-item {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  font-weight: 600;
  color: #5a5a7a;
  font-size: 14px;
}

/* CTA Section */
.cta-section {
  padding: 48px 40px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(244, 180, 0, 0.05), rgba(255, 213, 79, 0.05));
  text-align: center;
}

.cta-content h2 {
  font-size: 36px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.cta-content h2 span {
  color: #F4B400;
}

.cta-content p {
  color: #5a5a7a;
  font-size: 18px;
  margin-bottom: 24px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 14px 36px;
  background: linear-gradient(135deg, #F4B400, #FFD54F);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(244, 180, 0, 0.3);
}

.btn-secondary {
  padding: 14px 36px;
  background: transparent;
  border: 2px solid rgba(244, 180, 0, 0.3);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: rgba(244, 180, 0, 0.05);
  border-color: #F4B400;
}

/* Responsive */
@media (max-width: 992px) {
  .story-content {
    grid-template-columns: 1fr;
  }
  
  .mvp-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .choose-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .timeline-item {
    width: 100%;
    padding: 20px 20px 20px 60px;
    margin-left: 0 !important;
  }
  
  .timeline::before {
    left: 30px;
  }
  
  .timeline-marker {
    left: 0 !important;
    right: auto !important;
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 32px;
  }
  
  .story-text h2 {
    font-size: 28px;
  }
  
  .mvp-grid {
    grid-template-columns: 1fr;
  }
  
  .choose-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .story-highlights {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 28px;
  }
  
  .story-section {
    padding: 24px 16px;
  }
  
  .timeline-content {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .team-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .partners-grid {
    gap: 12px;
  }
  
  .partner-item {
    font-size: 12px;
    padding: 6px 14px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 280px;
  }
}
</style>