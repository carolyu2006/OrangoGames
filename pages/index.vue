<template>
  <div class="page-container">
    <!-- 导航栏 -->
    <nav class="nav-bar">
      <button class="nav-btn active">主页</button>
      <button class="nav-btn">关于我们</button>
      <button class="nav-btn accent">游戏库</button>
    </nav>

    <!-- 主内容 -->
    <main class="main-content">
      <!-- 左侧标题 -->
      <div class="left-section">
        <h1 class="brand-title">ORANGO</h1>
        <div class="decoration-box"></div>
        <div class="decoration-dot"></div>
        <div class="decoration-dot"></div>
      </div>

      <!-- 右侧游戏展示 -->
      <div class="right-section">
        <div class="game-card">
          <div class="game-header">
            <h2 class="game-title-zh">同流合乌</h2>
            <p class="game-title-en">Go With The Crow</p>
          </div>
          
          <div class="game-meta">
            <div class="meta-item">
              <span class="meta-icon">⚔️</span>
              <span class="meta-text">竞技</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">👥</span>
              <span class="meta-text">2-6 人</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">⏱️</span>
              <span class="meta-text">20分钟</span>
            </div>
          </div>

          <p class="game-description">
            实际上，公开演讲很有趣。玩家会看到他们从未见过的图片幻灯片和他们从未写过的单词。演讲从来没这么奇怪过，也没这么有趣过。
          </p>

          <div class="game-nav">
            <button class="nav-arrow left">
              <span class="arrow-shape"></span>
            </button>
            <div class="nav-dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <button class="nav-arrow right">
              <span class="arrow-shape"></span>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- 开始按钮 -->
    <button class="start-btn">
      <span class="btn-orange"></span>
      <span class="btn-green"></span>
      <span class="btn-text">开始</span>
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: var(--cream);
  position: relative;
  overflow: hidden;
  padding: 40px;
}

/* 导航栏 */
.nav-bar {
  position: absolute;
  top: 45px;
  right: 45px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10;
}

.nav-btn {
  padding: 20px 50px;
  border: none;
  border-radius: 15px;
  font-family: 'Heiti SC', sans-serif;
  font-size: 24px;
  letter-spacing: 0.04em;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-btn:hover {
  transform: scale(1.05);
}

.nav-btn.active {
  background-color: var(--sage);
}

.nav-btn:not(.active):not(.accent) {
  background-color: var(--green);
}

.nav-btn.accent {
  background-color: var(--orange);
}

/* 主内容 */
.main-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  padding-top: 100px;
}

/* 左侧 */
.left-section {
  position: relative;
}

.brand-title {
  font-family: 'Lexend Deca', sans-serif;
  font-size: 128px;
  font-weight: 700;
  color: var(--dark-brown);
  letter-spacing: 0.02em;
  writing-mode: vertical-rl;
  margin: 0;
}

.decoration-box {
  position: absolute;
  left: 90px;
  top: 198px;
  width: 253px;
  height: 314px;
  background-color: var(--green-dark);
  border-radius: 20px;
}

.decoration-dot {
  position: absolute;
  width: 43px;
  height: 34px;
  background-color: var(--brown);
  border-radius: 2.5px;
}

.decoration-dot:nth-of-type(2) {
  left: 300px;
  top: 427px;
}

.decoration-dot:nth-of-type(3) {
  left: 242px;
  top: 430px;
}

/* 右侧 */
.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.game-card {
  width: 356px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.game-header {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.game-title-zh {
  font-family: 'AaManHuaJia', sans-serif;
  font-size: 64px;
  font-weight: 400;
  color: var(--black);
  margin: 0;
}

.game-title-en {
  font-family: 'Lexend Deca', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: var(--dark-brown);
  margin: 0;
}

.game-meta {
  display: flex;
  gap: 42px;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-icon {
  font-size: 28px;
}

.meta-text {
  font-family: 'Heiti SC', sans-serif;
  font-size: 18px;
  color: var(--dark-brown);
}

.game-description {
  font-family: 'AaManHuaJia', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--dark-brown);
  margin: 0;
}

.game-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px