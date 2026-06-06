<template>
  <section id="locations" class="locations-section">
    <div class="locations-content">
      <h2 class="locations-title">找到我们</h2>
      <p class="locations-subtitle">愿坐标永远对你有利</p>
      
      <div class="locations-grid">
        <div class="location-card">
          <div class="location-icon">🌍</div>
          <h3 class="location-name">地球</h3>
          <p class="location-info">总部</p>
        </div>
        
        <div class="location-card">
          <div class="location-icon">🌙</div>
          <h3 class="location-name">月球</h3>
          <p class="location-info">即将上线</p>
        </div>
        
        <div class="location-card">
          <div class="location-icon">🌌</div>
          <h3 class="location-name">银河系</h3>
          <p class="location-info">未来计划</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.locations-section {
  min-height: 100vh;
  width: 100%;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.locations-content {
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.locations-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 0.5rem;
}

.locations-subtitle {
  font-size: 1.25rem;
  color: var(--sage);
  margin-bottom: 3rem;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.location-card {
  padding: 2.5rem;
  border-radius: 1.5rem;
  background: var(--white);
  border: 2px solid var(--sage);
}

.location-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.location-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 0.5rem;
}

.location-info {
  font-size: 1rem;
  color: var(--sage);
}
</style>
