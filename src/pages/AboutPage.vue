<template>
  <div class="about-page">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">About Us</span>
        <h2>Who We <span>Are</span></h2>
        <p>Learn more about our story, mission, and values</p>
      </div>

      <div class="about-hero">
        <img src="https://i.pinimg.com/736x/4e/f0/54/4ef054fb2acab4034d9b8528a67f5173.jpg" alt="About Us" style="width: 100%; height: 500px;" />
        <div class="about-hero-overlay">
          <h2>Building Trust Since 2020</h2>
          <p>We're passionate about providing the best shopping experience for our customers worldwide.</p>
        </div>
      </div>

      <div class="about-grid">
        <div class="about-card glass-card">
          <div class="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>To provide high-quality products at affordable prices with exceptional customer service and a seamless shopping experience.</p>
        </div>
        <div class="about-card glass-card">
          <div class="card-icon">👁️</div>
          <h3>Our Vision</h3>
          <p>To become the most trusted and preferred online shopping destination globally, known for quality and reliability.</p>
        </div>
        <div class="about-card glass-card">
          <div class="card-icon">💎</div>
          <h3>Our Values</h3>
          <ul>
            <li>⭐ Quality First</li>
            <li>🤝 Customer Trust</li>
            <li>💡 Innovation</li>
            <li>🌱 Sustainability</li>
            <li>🏆 Excellence</li>
          </ul>
        </div>
        <div class="about-card glass-card">
          <div class="card-icon">✅</div>
          <h3>Why Choose Us</h3>
          <ul>
            <li>✅ Wide product selection</li>
            <li>✅ Competitive prices</li>
            <li>✅ Fast delivery</li>
            <li>✅ 24/7 support</li>
            <li>✅ Secure payments</li>
          </ul>
        </div>
      </div>

      <div class="about-stats">
        <div class="stat-item">
          <span class="stat-number">50K+</span>
          <span class="stat-label">Happy Customers</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">10K+</span>
          <span class="stat-label">Products Sold</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">4.8⭐</span>
          <span class="stat-label">Customer Rating</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">100+</span>
          <span class="stat-label">Brands</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">30+</span>
          <span class="stat-label">Countries</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">98%</span>
          <span class="stat-label">Satisfaction</span>
        </div>
      </div>

      <div class="about-team">
        <h2>Meet Our <span>Team</span></h2>
        <p class="team-subtitle">The passionate people behind E-Shop</p>
        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card glass-card">
            <img :src="member.image" :alt="member.name" />
            <h4>{{ member.name }}</h4>
            <p>{{ member.role }}</p>
            <div class="team-social">
              <a href="#"><i class="fab fa-linkedin"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const team = [
  { name: 'KEO YERAR', role: 'CEO & Founder', image: 'https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/724590239_1631381212328505_832577750490264161_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s960x960&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFKkkFAcTGe9DHXiq9_94r6UeCLsCUJzMZR4IuwJQnMxgZY51il2tUlezeY2LwA-G_zPrB8Lm2F6M8sGf2ejS07&_nc_ohc=ZG_fCc1LIKgQ7kNvwHjZmXP&_nc_oc=AdqLOq5ljXiiVmh-1jKUt7Z5am9OcObWXeoIPI7Ycz1oF281dOCwLg2kl1I5GpFL3Pw&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=rCV7vx-7SEZ73gO8XThuvQ&_nc_ss=7b2a8&oh=00_Af_3QCmHPdGErkE0bERw0gy28jorLmRKSlGiMfh30AECtA&oe=6A4797B7' },
  { name: 'CHOI YEONJUN', role: 'Head of Operations', image: 'https://i.pinimg.com/736x/69/97/cc/6997cc7881f1a5844a4aa427c81a8ba7.jpg' },
  { name: 'HWANG YEJI', role: 'Marketing Director', image: 'https://i.pinimg.com/736x/27/8e/38/278e384f0903288ef2b38bf8752b729c.jpg' },
  { name: 'KAI', role: 'Customer Support', image: 'https://i.pinimg.com/1200x/18/26/2c/18262c75c5421502bbb65f2565c4e694.jpg' },
  { name: 'JENNIE KIM', role: 'Product Manager', image: 'https://i.pinimg.com/1200x/37/dc/ca/37dccaf3a81082585205b3f8975c0489.jpg' },
 
]
</script>

<style scoped>
.about-page {
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

.about-hero {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 40px;
}

.about-hero img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.about-hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
}

.about-hero-overlay h2 {
  font-size: 32px;
  margin-bottom: 8px;
}

.about-hero-overlay p {
  opacity: 0.9;
  font-size: 16px;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.about-card {
  padding: 30px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  transition: all 0.3s;
}

.about-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 215, 0, 0.25);
  box-shadow: 0 20px 50px rgba(255, 215, 0, 0.08);
}

.card-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.about-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.about-card p {
  color: #8a8a8a;
  line-height: 1.7;
}

.about-card ul {
  list-style: none;
  padding: 0;
}

.about-card ul li {
  padding: 6px 0;
  color: #8a8a8a;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  background: rgba(255, 215, 0, 0.05);
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 215, 0, 0.08);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 32px;
  font-weight: 800;
  color: #F4B400;
}

.stat-label {
  color: #8a8a8a;
  font-size: 14px;
}

.about-team h2 {
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  color: #1a1a2e;
}

.about-team h2 span {
  color: #F4B400;
}

.team-subtitle {
  text-align: center;
  color: #8a8a8a;
  margin-bottom: 30px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.team-card {
  text-align: center;
  padding: 24px 16px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  transition: all 0.3s;
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 215, 0, 0.25);
}

.team-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 3px solid #F4B400;
}

.team-card h4 {
  font-size: 18px;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.team-card p {
  color: #8a8a8a;
  font-size: 14px;
}

.team-social {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}

.team-social a {
  color: #8a8a8a;
  transition: all 0.3s;
}

.team-social a:hover {
  color: #F4B400;
}

@media (max-width: 768px) {
  .section-header h2 { font-size: 28px; }
  .about-hero-overlay h2 { font-size: 24px; }
  .about-stats { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 480px) {
  .about-stats { grid-template-columns: repeat(2, 1fr); }
  .about-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr 1fr; }
}
</style>
