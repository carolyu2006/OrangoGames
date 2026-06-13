<template>
  <main class="page-container">
    <!-- <nav class="nav-bar" aria-label="Main navigation">
      <button class="nav-btn home-btn">主页</button>
      <button class="nav-btn about-btn">关于我们</button>
      <button class="nav-btn games-btn">游戏库</button>
    </nav> -->

    <div class="brand-header">
      <p class="brand-logo-zh">开个橘子</p>
      <Transition name="intro-logo">
        <h1 v-if="isIntroPage" class="logo-text">ORANGO</h1>
      </Transition>
    </div>

    <GameVisual :visual-id="currentGame?.id ?? null" :frame-switching="frameSwitching" :centered="isIntroPage"
      @frame-animation-end="onFrameAnimationEnd" />

    <Transition name="game-card">
      <section v-if="currentGame" class="game-card" aria-labelledby="game-title">
        <header class="game-header">
          <p class="game-title-en">{{ currentGame.titleEn }}</p>
          <h2 id="game-title" class="game-title-zh">{{ currentGame.titleZh }}</h2>
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
            <img class="info-item-icon duration-icon" :src="iconDuration" alt="" />
            <span>{{ currentGame.duration }}</span>
          </div>
        </div>

        <p class="game-description">
          {{ currentGame.description }}
        </p>
      </section>
    </Transition>

    <CarouselPagination :pages="pages" :current-index="currentPageIndex" :disabled="frameSwitching" @prev="prevPage"
      @next="nextPage" @select="goToPage" />
  </main>
</template>

<script setup lang="ts">
import GameVisual from "~/components/game-visuals/GameVisual.vue";
import { games } from "~/data/games";
import iconCompetitive from "~/assets/icons/shared/icon-competitive.svg";
import iconDuration from "~/assets/icons/shared/icon-duration.svg";
import iconPlayers from "~/assets/icons/shared/icon-players.svg";

definePageMeta({
  layout: "blank",
});

useHead({
  title: "开个橘子Orango",
});

const AUTO_PLAY_MS = 5000;

const currentPageIndex = ref(0);
const pageCount = games.length + 1;
const isIntroPage = computed(() => currentPageIndex.value === 0);
const currentGame = computed(() => games[currentPageIndex.value - 1] ?? null);
const pages = computed(() => [
  { index: 0, label: "ORANGO intro" },
  ...games.map((game, index) => ({
    index: index + 1,
    label: game.titleZh,
  })),
]);
const frameSwitching = ref(false);

const TRANSITION_SAFETY_MS = 1600;

let autoPlayTimer: ReturnType<typeof setInterval> | null = null;
let transitionSafetyTimer: ReturnType<typeof setTimeout> | null = null;

function clearTransitionSafetyTimer() {
  if (transitionSafetyTimer) {
    clearTimeout(transitionSafetyTimer);
    transitionSafetyTimer = null;
  }
}

function armTransitionSafetyTimer() {
  clearTransitionSafetyTimer();
  transitionSafetyTimer = setTimeout(() => {
    transitionSafetyTimer = null;
    if (frameSwitching.value) {
      finishTransition();
    }
  }, TRANSITION_SAFETY_MS);
}

function beginTransition(index: number, shouldRestartAutoPlay: boolean) {
  if (shouldRestartAutoPlay) {
    restartAutoPlay();
  }

  currentPageIndex.value = index;
  frameSwitching.value = true;
  armTransitionSafetyTimer();
}

function finishTransition() {
  if (!frameSwitching.value) return;

  clearTransitionSafetyTimer();
  frameSwitching.value = false;
}

function changePage(index: number, shouldRestartAutoPlay = true) {
  if (index === currentPageIndex.value && !frameSwitching.value) return;
  if (frameSwitching.value) return;

  beginTransition(index, shouldRestartAutoPlay);
}

function onFrameAnimationEnd() {
  finishTransition();
}

function goToPage(index: number) {
  changePage(index);
}

function nextPage() {
  changePage((currentPageIndex.value + 1) % pageCount);
}

function prevPage() {
  changePage((currentPageIndex.value - 1 + pageCount) % pageCount);
}

function restartAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    changePage((currentPageIndex.value + 1) % pageCount, false);
  }, AUTO_PLAY_MS);
}

onMounted(() => {
  restartAutoPlay();
});

onUnmounted(() => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  clearTransitionSafetyTimer();
});
</script>

<style scoped src="@/assets/css/index.css"></style>
