<template>
  <main class="page-container" :style="{ '--visual-scale': visualScale }">
    <!-- <nav class="nav-bar" aria-label="Main navigation">
      <button class="nav-btn home-btn">主页</button>
      <button class="nav-btn about-btn">关于我们</button>
      <button class="nav-btn games-btn">游戏库</button>
    </nav> -->

    <div class="brand-header">
      <Transition name="intro-logo">
        <p v-if="showChineseBrand" class="brand-logo-zh">开个橘子</p>
      </Transition>
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

        <a class="game-start-btn" :href="currentGame.playUrl" target="_blank" rel="noopener noreferrer"
          @mouseenter="onStartButtonEnter" @mouseleave="onStartButtonLeave">
          <img class="game-start-btn__icon" :src="orangoIcon" alt="" aria-hidden="true" />
          <span class="game-start-btn__label">开始游戏</span>
        </a>
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
import orangoIcon from "~/assets/logo/orango-icon.svg";

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
const isStartButtonHovered = ref(false);

const MOBILE_BREAKPOINT_PX = 768;
const ORANGE_DESIGN_WIDTH = 275;
const MOBILE_SCALE_MIN = 0.42;
const MOBILE_SCALE_MAX = 0.7;
const visualScale = ref(1);
const isMobile = ref(false);
const showChineseBrand = computed(() => isIntroPage.value || !isMobile.value);

function updateVisualScale() {
  if (typeof window === "undefined") return;

  const width = window.innerWidth;
  isMobile.value = width <= MOBILE_BREAKPOINT_PX;

  if (width > MOBILE_BREAKPOINT_PX) {
    visualScale.value = 1;
    return;
  }

  const target = (width * 0.5) / ORANGE_DESIGN_WIDTH;
  visualScale.value = Math.min(
    MOBILE_SCALE_MAX,
    Math.max(MOBILE_SCALE_MIN, target),
  );
}

const TRANSITION_SAFETY_MS = 1600;

let autoPlayTimer: ReturnType<typeof setTimeout> | null = null;
let autoPlayDeadline = 0;
let autoPlayRemainingMs = AUTO_PLAY_MS;
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

function clearAutoPlayTimer() {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }
}

function onAutoPlayTick() {
  autoPlayTimer = null;
  changePage((currentPageIndex.value + 1) % pageCount, false);
  scheduleAutoPlay(AUTO_PLAY_MS);
}

function scheduleAutoPlay(delayMs: number) {
  clearAutoPlayTimer();
  autoPlayRemainingMs = delayMs;

  if (isStartButtonHovered.value) return;

  autoPlayDeadline = Date.now() + delayMs;
  autoPlayTimer = setTimeout(onAutoPlayTick, delayMs);
}

function pauseAutoPlay() {
  if (!autoPlayTimer) return;

  autoPlayRemainingMs = Math.max(0, autoPlayDeadline - Date.now());
  clearAutoPlayTimer();
}

function resumeAutoPlay() {
  scheduleAutoPlay(autoPlayRemainingMs);
}

function restartAutoPlay() {
  scheduleAutoPlay(AUTO_PLAY_MS);
}

function onStartButtonEnter() {
  isStartButtonHovered.value = true;
  pauseAutoPlay();
}

function onStartButtonLeave() {
  isStartButtonHovered.value = false;
  resumeAutoPlay();
}

onMounted(() => {
  restartAutoPlay();
  updateVisualScale();
  window.addEventListener("resize", updateVisualScale);
});

onUnmounted(() => {
  clearAutoPlayTimer();
  clearTransitionSafetyTimer();
  window.removeEventListener("resize", updateVisualScale);
});
</script>

<style scoped src="@/assets/css/index.css"></style>
