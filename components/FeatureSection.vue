<template>
  <section class="feature-section">
    <div class="feature-content">
      <h2 class="feature-title">
        <span class="title-line">游戏那么棒</span>
        <span class="title-line primary-text">友情可以等</span>
      </h2>
      
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🎲</div>
          <h3 class="feature-card-title">游戏库</h3>
          <p class="feature-card-text">
            数百款游戏等着你和你的朋友
          </p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🏠</div>
          <h3 class="feature-card-title">房间创建</h3>
          <p class="feature-card-text">
            创建私密房间，轻松邀请好友
          </p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3 class="feature-card-title">快速加入</h3>
          <p class="feature-card-text">
            通过 Orango.ing 一键加入游戏
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.feature-section {
  min-height: 100vh;
  width: 100%;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.feature-content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.feature-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 4rem;
}

.title-line {
  display: block;
  color: var(--green);
}

.primary-text {
  color: var(--orange);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 3rem 2rem;
  border-radius: 2rem;
  background: var(--white);
  border: 2px solid var(--sage);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--orange);
  transform: translateY(-8px);
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.feature-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 1rem;
}

.feature-card-text {
  color: var(--sage);
  font-size: 1.1rem;
}
</style>
