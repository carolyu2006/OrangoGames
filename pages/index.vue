<template>
  <main class="page-container">
    <!-- <nav class="nav-bar" aria-label="Main navigation">
      <button class="nav-btn home-btn">主页</button>
      <button class="nav-btn about-btn">关于我们</button>
      <button class="nav-btn games-btn">游戏库</button>
    </nav> -->

    <div class="logo-wrap">
      <h1 class="logo-text">ORANGO</h1>
    </div>

    <GameVisual
      :visual-id="currentGame.id"
      :frame-switching="frameSwitching"
      @frame-animation-end="onFrameAnimationEnd"
    />

    <section class="game-card" aria-labelledby="game-title">
      <header class="game-header">
        <h2 id="game-title" class="game-title-zh">{{ currentGame.titleZh }}</h2>
        <p class="game-title-en">{{ currentGame.titleEn }}</p>
      </header>

      <div class="game-info" aria-label="Game details">
        <div class="info-item">
          <img class="info-item-icon" :src="iconCompetitive" alt="" />
          <span>{{ currentGame.type }}</span>
        </div>
        <div class="info-item">
          <img class="info-item-icon" :src="iconPlayers" alt="" />
          <span>{{ currentGame.players }}</span>
        </div>
        <div class="info-item">
          <img
            class="info-item-icon duration-icon"
            :src="iconDuration"
            alt=""
          />
          <span>{{ currentGame.duration }}</span>
        </div>
      </div>

      <p class="game-description">
        {{ currentGame.description }}
      </p>

      <div class="game-navigation" aria-label="Game carousel controls">
        <button
          class="carousel-btn"
          aria-label="Previous game"
          @click="prevGame"
        >
          <img :src="gameNavLeft" alt="" />
        </button>
        <div class="carousel-dots" role="tablist" aria-label="Select game">
          <button
            v-for="(game, index) in games"
            :key="game.id"
            class="carousel-dot"
            :class="{ active: index === currentIndex }"
            role="tab"
            :aria-selected="index === currentIndex"
            :aria-label="game.titleZh"
            @click="goToGame(index)"
          >
            <img
              :src="index === currentIndex ? gameNavDotsSelected : gameNavDots"
              alt=""
            />
          </button>
        </div>
        <button class="carousel-btn" aria-label="Next game" @click="nextGame">
          <img :src="gameNavRight" alt="" />
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import GameVisual from "~/components/game-visuals/GameVisual.vue";
import { games } from "~/data/games";
import gameNavDots from "~/assets/icons/shared/game-nav-dots.svg";
import gameNavDotsSelected from "~/assets/icons/shared/game-nav-dots-selected.svg";
import gameNavLeft from "~/assets/icons/shared/game-nav-left.svg";
import gameNavRight from "~/assets/icons/shared/game-nav-right.svg";
import iconCompetitive from "~/assets/icons/shared/icon-competitive.svg";
import iconDuration from "~/assets/icons/shared/icon-duration.svg";
import iconPlayers from "~/assets/icons/shared/icon-players.svg";

definePageMeta({
  layout: "blank",
});

useHead({
  title: "开个橘子Orango",
});

const AUTO_PLAY_MS = 3000;

const currentIndex = ref(0);
const currentGame = computed(() => games[currentIndex.value]);
const frameSwitching = ref(false);
const hasMounted = ref(false);

let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

async function triggerFrameAnimation() {
  frameSwitching.value = false;
  await nextTick();
  frameSwitching.value = true;
}

function onFrameAnimationEnd() {
  frameSwitching.value = false;
}

watch(currentIndex, () => {
  if (!hasMounted.value) return;
  triggerFrameAnimation();
});

function goToGame(index: number) {
  if (index === currentIndex.value) return;
  currentIndex.value = index;
  restartAutoPlay();
}

function nextGame() {
  currentIndex.value = (currentIndex.value + 1) % games.length;
  restartAutoPlay();
}

function prevGame() {
  currentIndex.value = (currentIndex.value - 1 + games.length) % games.length;
  restartAutoPlay();
}

function restartAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % games.length;
  }, AUTO_PLAY_MS);
}

onMounted(() => {
  hasMounted.value = true;
  restartAutoPlay();
});

onUnmounted(() => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
});
</script>

<style scoped src="@/assets/css/index.css"></style>
