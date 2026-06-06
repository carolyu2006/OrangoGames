<template>
  <section id="how-it-works" class="how-section">
    <div class="how-content">
      <h2 class="how-title">如何使用</h2>
      
      <div class="how-steps">
        <div class="how-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3 class="step-title">浏览游戏库</h3>
            <p class="step-text">找到适合你下一个游戏夜的完美游戏</p>
          </div>
        </div>
        
        <div class="how-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3 class="step-title">创建房间</h3>
            <p class="step-text">设置你的私人游戏房间并分享链接</p>
          </div>
        </div>
        
        <div class="how-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3 class="step-title">开始游戏</h3>
            <p class="step-text">通过 Orango.ing 邀请好友并享受！</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.how-section {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--cream) 0%, var(--white) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.how-content {
  max-width: 900px;
  width: 100%;
}

.how-title {
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: var(--green);
  margin-bottom: 4rem;
}

.how-steps {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.how-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .how-step {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 2rem;
  }
}

.step-number {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--orange);
  color: var(--white);
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--green);
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 1.25rem;
  color: var(--sage);
}
</style>
