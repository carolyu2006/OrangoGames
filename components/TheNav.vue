<template>
  <nav class="nav-container">
    <div class="nav-logo">
      Orango
    </div>
    <div class="nav-links">
      <NuxtLink to="#how-it-works" class="nav-link">
        如何使用
      </NuxtLink>
      <NuxtLink to="#game-library" class="nav-link">
        游戏库
      </NuxtLink>
      <NuxtLink to="#locations" class="nav-link">
        位置
      </NuxtLink>
      <NuxtLink to="#contact" class="nav-link">
        联系我们
      </NuxtLink>
    </div>
    <button class="nav-button">
      开始
    </button>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--cream);
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--green);
}

.nav-links {
  display: none;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  color: var(--sage);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--orange);
}

.nav-button {
  padding: 0.75rem 1.5rem;
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-button:hover {
  background: var(--orange-dark);
  transform: scale(1.05);
}
</style>
