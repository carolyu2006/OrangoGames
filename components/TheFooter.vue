<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-text">
        © 2026 Orango Games. 保留所有权利。
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link">Twitter</a>
        <a href="#" class="footer-link">Discord</a>
        <a href="#" class="footer-link">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-container {
  width: 100%;
  padding: 3rem 2rem;
  background: var(--cream);
  border-top: 2px solid var(--sage);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-text {
  color: var(--sage);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--sage);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: var(--orange);
}
</style>
