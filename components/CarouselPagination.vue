<template>
  <div class="carousel-pagination" aria-label="Page carousel controls" :aria-busy="disabled">
    <div class="carousel-dots" role="tablist" aria-label="Select page">
      <CarouselNavDot
        v-for="page in pages"
        :key="page.index"
        :active="page.index === currentIndex"
        :disabled="disabled"
        :label="page.label"
        @select="$emit('select', page.index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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

.carousel-dots {
  display: flex;
  align-items: center;
  gap: 16px;
  width: auto;
  height: 32px;
}
</style>
