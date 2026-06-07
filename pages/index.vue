<template>
  <main class="page-container">
    <div class="figma-frame" aria-label="Orango Games landing page">
      <nav class="nav-bar" aria-label="Main navigation">
        <button class="nav-btn home-btn">主页</button>
        <button class="nav-btn about-btn">关于我们</button>
        <button class="nav-btn games-btn">游戏库</button>
      </nav>

      <section class="brand-scene" aria-label="Orango brand illustration">
        <div class="logo-wrap">
          <h1 class="logo-text">开个橘子Orango</h1>
        </div>
        <div class="tilted-green-card" aria-hidden="true"></div>
        <img class="game-frame" :src="gameFrame" alt="" aria-hidden="true" />
        <img class="game-detail" :src="gameBodyDetail" alt="" aria-hidden="true" />
        <img class="game-feet" :src="gameFeet" alt="" aria-hidden="true" />
      </section>

      <section class="game-card" aria-labelledby="game-title">
        <header class="game-header">
          <h2 id="game-title" class="game-title-zh">同流合乌</h2>
          <p class="game-title-en">Go With The Crow</p>
        </header>

        <div class="game-info" aria-label="Game details">
          <div class="info-item">
            <img class="info-item-icon" :src="iconCompetitive" alt="" />
            <span>竞技</span>
          </div>
          <div class="info-item">
            <img class="info-item-icon" :src="iconPlayers" alt="" />
            <span>2-6 人</span>
          </div>
          <div class="info-item">
            <img class="info-item-icon duration-icon" :src="iconDuration" alt="" />
            <span>20分钟</span>
          </div>
        </div>

        <p class="game-description">
          实际上，公开演讲很有趣。玩家会看到他们从未见过的图片幻灯片和他们从未写过的单词。演讲从来没这么奇怪过，也没这么有趣过。
        </p>

        <div class="game-navigation" aria-label="Game carousel controls">
          <button class="carousel-btn" aria-label="Previous game">
            <img :src="gameNavLeft" alt="" />
          </button>
          <img class="carousel-dots" :src="gameNavDots" alt="" aria-hidden="true" />
          <button class="carousel-btn" aria-label="Next game">
            <img :src="gameNavRight" alt="" />
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import gameBodyDetail from '~/assets/icons/game-body-detail.svg'
import gameFeet from '~/assets/icons/game-feet.svg'
import gameFrame from '~/assets/icons/game-frame.svg'
import gameNavDots from '~/assets/icons/game-nav-dots.svg'
import gameNavLeft from '~/assets/icons/game-nav-left.svg'
import gameNavRight from '~/assets/icons/game-nav-right.svg'
import iconCompetitive from '~/assets/icons/icon-competitive.svg'
import iconDuration from '~/assets/icons/icon-duration.svg'
import iconPlayers from '~/assets/icons/icon-players.svg'
</script>

<style scoped src="@/assets/css/index.css">
</style>
