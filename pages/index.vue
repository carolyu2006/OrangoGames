<template>
  <main class="page-container">
    <!-- <nav class="nav-bar" aria-label="Main navigation">
      <button class="nav-btn home-btn">主页</button>
      <button class="nav-btn about-btn">关于我们</button>
      <button class="nav-btn games-btn">游戏库</button>
    </nav> -->

    <Transition name="intro-logo">
      <div v-if="isIntroPage" class="logo-wrap">
        <h1 class="logo-text">ORANGO</h1>
      </div>
    </Transition>

    <GameVisual
      :visual-id="currentGame?.id ?? null"
      :frame-switching="frameSwitching"
      :centered="isIntroPage"
      @frame-animation-end="onFrameAnimationEnd"
    />

    <Transition name="game-card">
      <section v-if="currentGame" class="game-card" aria-labelledby="game-title">
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
      </section>
    </Transition>

    <div class="game-navigation" aria-label="Page carousel controls">
      <button
        class="carousel-btn"
        aria-label="Previous page"
        @click="prevPage"
      >
        <img :src="gameNavLeft" alt="" />
      </button>
      <div class="carousel-dots" role="tablist" aria-label="Select page">
        <button
          v-for="page in pages"
          :key="page.index"
          class="carousel-dot"
          :class="{ active: page.index === currentPageIndex }"
          role="tab"
          :aria-selected="page.index === currentPageIndex"
          :aria-label="page.label"
          @click="goToPage(page.index)"
        >
          <img
            :src="page.index === currentPageIndex ? gameNavDotsSelected : gameNavDots"
            alt=""
          />
        </button>
      </div>
      <button class="carousel-btn" aria-label="Next page" @click="nextPage">
        <img :src="gameNavRight" alt="" />
      </button>
    </div>
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
const queuedPageIndex = ref<number | null>(null);
const queuedPageShouldRestartAutoPlay = ref(false);

let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

async function changePage(index: number, shouldRestartAutoPlay = true) {
  if (index === currentPageIndex.value) return;

  if (frameSwitching.value) {
    queuedPageIndex.value = index;
    queuedPageShouldRestartAutoPlay.value ||= shouldRestartAutoPlay;
    return;
  }

  frameSwitching.value = false;
  await nextTick();
  currentPageIndex.value = index;
  frameSwitching.value = true;

  if (shouldRestartAutoPlay) {
    restartAutoPlay();
  }
}

function onFrameAnimationEnd() {
  frameSwitching.value = false;

  if (queuedPageIndex.value === null) return;

  const nextPageIndex = queuedPageIndex.value;
  const shouldRestartAutoPlay = queuedPageShouldRestartAutoPlay.value;
  queuedPageIndex.value = null;
  queuedPageShouldRestartAutoPlay.value = false;
  changePage(nextPageIndex, shouldRestartAutoPlay);
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
});
</script>

<style scoped src="@/assets/css/index.css"></style>
