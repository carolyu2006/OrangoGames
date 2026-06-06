<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-logo animate-float">
        <div class="logo-circle">
          <span class="logo-emoji">🎮</span>
        </div>
      </div>
      
      <h1 class="hero-title">
        <span class="title-line">比无聊更</span>
        <span class="title-line primary-text">小比星球</span>
      </h1>
      
      <p class="hero-subtitle">
        星际游戏夜的终极平台
      </p>
      
      <button class="hero-button">
        开始游戏
      </button>
    </div>
    
    <div class="scroll-indicator">
      <div class="scroll-icon"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  z-index: 10;
}

.hero-logo {
  margin-bottom: 2rem;
}

.logo-circle {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-dark) 100%);
  box-shadow: 0 0 60px rgba(255, 133, 25, 0.3), 0 0 100px rgba(255, 133, 25, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-emoji {
  font-size: 5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.title-line {
  display: block;
  color: var(--green);
}

.primary-text {
  color: var(--orange);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--sage);
  margin-bottom: 3rem;
}

.hero-button {
  padding: 1.25rem 3rem;
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: 999px;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.hero-button:hover {
  background: var(--orange-dark);
  transform: scale(1.05);
  box-shadow: 0 0 40px rgba(255, 133, 25, 0.5);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-icon {
  width: 24px;
  height: 40px;
  border: 2px solid var(--sage);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-icon::after {
  content: '';
  width: 4px;
  height: 12px;
  background: var(--sage);
  border-radius: 999px;
  animation: scroll-down 2s infinite;
}

@keyframes scroll-down {
  0%, 100% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(4px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
