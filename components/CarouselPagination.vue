<template>
  <div class="carousel-pagination" aria-label="Page carousel controls" :aria-busy="disabled">
    <!-- <button
      class="carousel-btn"
      aria-label="Previous page"
      :disabled="disabled"
      @click="$emit('prev')"
    >
      <img :src="gameNavLeft" alt="" />
    </button> -->

    <div class="carousel-dots" role="tablist" aria-label="Select page">
      <button v-for="page in pages" :key="page.index" class="carousel-dot"
        :class="{ active: page.index === currentIndex }" role="tab" :aria-selected="page.index === currentIndex"
        :aria-label="page.label" :disabled="disabled" @click="$emit('select', page.index)">
        <img :src="page.index === currentIndex ? gameNavDotsSelected : gameNavDots" alt="" />
      </button>
    </div>

    <!-- <button
      class="carousel-btn"
      aria-label="Next page"
      :disabled="disabled"
      @click="$emit('next')"
    >
      <img :src="gameNavRight" alt="" />
    </button> -->
  </div>
</template>

<script setup lang="ts">
import gameNavDots from "~/assets/icons/shared/game-nav-dots.svg";
import gameNavDotsSelected from "~/assets/icons/shared/game-nav-dots-selected.svg";
import gameNavLeft from "~/assets/icons/shared/game-nav-left.svg";
import gameNavRight from "~/assets/icons/shared/game-nav-right.svg";

export type CarouselPage = {
  index: number;
  label: string;
};

defineProps<{
  pages: CarouselPage[];
  currentIndex: number;
  disabled?: boolean;
}>();

defineEmits<{
  prev: [];
  next: [];
  select: [index: number];
}>();
</script>

<style scoped>
.carousel-pagination {
  position: absolute;
  left: 50%;
  bottom: 40px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 20px;
  transform: translateX(-50%);
}

.carousel-btn {
  width: 65px;
  height: 30px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
}

.carousel-btn:disabled {
  cursor: not-allowed;
}

.carousel-btn img {
  display: block;
  width: 65px;
  height: 30px;
}

.carousel-dots {
  display: flex;
  align-items: center;
  gap: 16px;
  width: auto;
  height: 32px;
}

.carousel-dot {
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  line-height: 0;
}

.carousel-dot:disabled {
  cursor: not-allowed;
}

.carousel-dot img {
  display: block;
  width: 23.2px;
  height: 23.2px;
}

.carousel-dot.active img {
  width: 52.8px;
  height: 32px;
}
</style>
