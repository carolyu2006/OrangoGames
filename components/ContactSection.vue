<template>
  <section id="contact" class="contact-section">
    <div class="contact-content">
      <h2 class="contact-line">我们努力让梦想成真</h2>
      <h2 class="contact-line primary-text">银河系说是的</h2>
      <h2 class="contact-line">所以现在，这是真的！来自 Orango 💛</h2>
      
      <button class="contact-button">
        联系我们
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.contact-section {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--white) 0%, var(--cream) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.contact-content {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.contact-line {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 1rem;
}

.primary-text {
  color: var(--orange);
}

.contact-button {
  margin-top: 2rem;
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

.contact-button:hover {
  background: var(--orange-dark);
  transform: scale(1.05);
}
</style>
