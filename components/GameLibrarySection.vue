<template>
  <section id="game-library" class="library-section">
    <div class="library-content">
      <h2 class="library-title">游戏库</h2>
      <p class="library-subtitle">找到你下一次冒险的完美游戏</p>
      
      <div class="game-grid">
        <div v-for="game in games" :key="game.id" class="game-card">
          <div class="game-icon">{{ game.emoji }}</div>
          <h3 class="game-name">{{ game.name }}</h3>
          <p class="game-players">{{ game.players }}</p>
        </div>
      </div>
      
      <button class="library-button">
        浏览所有游戏
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const games = [
  { id: 1, name: '太空象棋', emoji: '♟️', players: '2-4 人' },
  { id: 2, name: '星际宾果', emoji: '🎯', players: '2-8 人' },
  { id: 3, name: '银河扑克', emoji: '🃏', players: '2-6 人' },
  { id: 4, name: '小行星冲刺', emoji: '☄️', players: '1-4 人' },
  { id: 5, name: '星球大富翁', emoji: '🪐', players: '2-6 人' },
  { id: 6, name: '星云谜题', emoji: '🧩', players: '1-2 人' },
  { id: 7, name: '星际工艺', emoji: '⭐', players: '2-4 人' },
  { id: 8, name: '黑洞 21 点', emoji: '♠️', players: '2-6 人' },
]
</script>

<style scoped>
.library-section {
  min-height: 100vh;
  width: 100%;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.library-content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.library-title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 0.5rem;
}

.library-subtitle {
  font-size: 1.25rem;
  color: var(--sage);
  margin-bottom: 3rem;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.game-card {
  padding: 2rem;
  border-radius: 1.5rem;
  background: var(--cream);
  border: 2px solid var(--sage);
  cursor: pointer;
  transition: all 0.3s;
}

.game-card:hover {
  border-color: var(--orange);
  transform: scale(1.05);
}

.game-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.game-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 0.5rem;
}

.game-players {
  font-size: 0.9rem;
  color: var(--sage);
}

.library-button {
  padding: 1rem 2.5rem;
  background: transparent;
  color: var(--orange);
  border: 2px solid var(--orange);
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.library-button:hover {
  background: var(--orange);
  color: var(--white);
}
</style>
