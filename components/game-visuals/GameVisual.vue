<template>
  <div class="game-visual">
    <div
      class="game-visual__stage"
      :class="{
        'is-exiting': visualAnimPhase === 'exiting',
        'is-entering': visualAnimPhase === 'entering',
      }"
    >
      <component :is="visualComponent" />
    </div>

    <img
      class="game-visual__frame-top"
      :class="{ 'is-switching': frameSwitching }"
      :src="frameAssets.frameTop"
      alt=""
      @animationend="$emit('frame-animation-end')"
    />

    <img
      class="game-visual__frame-bottom"
      :src="frameAssets.frameBottom"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import type { GameVisualId } from "~/data/games";
import {
  goWithTheCrowAssets,
  orangeBlocksAssets,
} from "~/data/games";
import GoWithTheCrowVisual from "~/components/game-visuals/GoWithTheCrowVisual.vue";
import OrangeBlocksVisual from "~/components/game-visuals/OrangeBlocksVisual.vue";

const FRAME_CLOSE_MS = 675;
const FRAME_OPEN_MS = 825;

const props = defineProps<{
  visualId: GameVisualId;
  frameSwitching: boolean;
}>();

defineEmits<{
  "frame-animation-end": [];
}>();

const displayedVisualId = ref<GameVisualId>(props.visualId);
const visualAnimPhase = ref<"idle" | "exiting" | "entering">("idle");

let swapTimer: ReturnType<typeof setTimeout> | null = null;
let enterTimer: ReturnType<typeof setTimeout> | null = null;

function clearVisualTimers() {
  if (swapTimer) {
    clearTimeout(swapTimer);
    swapTimer = null;
  }
  if (enterTimer) {
    clearTimeout(enterTimer);
    enterTimer = null;
  }
}

function resolveVisualComponent(id: GameVisualId) {
  switch (id) {
    case "orange-blocks":
      return OrangeBlocksVisual;
    case "go-with-the-crow":
    case "orange-court":
    default:
      return GoWithTheCrowVisual;
  }
}

function resolveFrameAssets(id: GameVisualId) {
  switch (id) {
    case "orange-blocks":
      return {
        frameTop: orangeBlocksAssets.frameTop,
        frameBottom: orangeBlocksAssets.frameBottom,
      };
    case "go-with-the-crow":
    case "orange-court":
    default:
      return {
        frameTop: goWithTheCrowAssets.frameTop,
        frameBottom: goWithTheCrowAssets.frameBottom,
      };
  }
}

const visualComponent = computed(() => resolveVisualComponent(displayedVisualId.value));
const frameAssets = computed(() => resolveFrameAssets(displayedVisualId.value));

watch(
  () => props.visualId,
  (newId) => {
    if (newId === displayedVisualId.value && visualAnimPhase.value === "idle") {
      return;
    }

    clearVisualTimers();
    visualAnimPhase.value = "exiting";

    swapTimer = setTimeout(() => {
      displayedVisualId.value = props.visualId;
      visualAnimPhase.value = "entering";

      enterTimer = setTimeout(() => {
        visualAnimPhase.value = "idle";
      }, FRAME_OPEN_MS);
    }, FRAME_CLOSE_MS);
  },
);

onUnmounted(clearVisualTimers);
</script>

<style scoped>
.game-visual {
  --frame-close-duration: 675ms;
  --frame-open-duration: 825ms;

  position: absolute;
  inset: 0;
  pointer-events: none;
}

.game-visual__stage {
  position: absolute;
  inset: 0;
  z-index: 1;
  transform: scale(1);
  transform-origin: 435px 624px;
}

.game-visual__stage.is-exiting {
  animation: visual-tuck-out var(--frame-close-duration) ease-in-out forwards;
}

.game-visual__stage.is-entering {
  animation: visual-tuck-in var(--frame-open-duration) ease-in-out forwards;
}

.game-visual__frame-top {
  position: absolute;
  z-index: 5;
  left: 299px;
  top: 228px;
  width: 265px;
  height: 166px;
}

.game-visual__frame-top.is-switching {
  animation: game-frame-close-open 1.5s ease-in-out forwards;
}

.game-visual__frame-bottom {
  position: absolute;
  z-index: 7;
  left: 299px;
  top: 624px;
  width: 271px;
  height: 77px;
}

@keyframes game-frame-close-open {
  0% {
    transform: translateY(0);
  }

  45% {
    transform: translateY(230px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes visual-tuck-out {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }
}

@keyframes visual-tuck-in {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}
</style>
