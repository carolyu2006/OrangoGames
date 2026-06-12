<template>
  <div class="game-visual" :style="frameTimingStyle">
    <div
      class="game-visual__scene"
      :class="{
        'is-centered': centered,
        'is-opening': props.frameSwitching && frameMotion === 'opening',
      }"
    >
      <div
        class="game-visual__stage"
        :class="{
          'is-exiting': visualAnimPhase === 'exiting',
          'is-entering': visualAnimPhase === 'entering',
          'is-hidden': !displayedVisualId && visualAnimPhase === 'idle',
        }"
      >
        <component v-if="visualComponent" :is="visualComponent" />
      </div>

      <img
        class="game-visual__frame-top"
        :class="frameTopClasses"
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
  </div>
</template>

<script setup lang="ts">
import type { GameVisualId } from "~/data/games";
import {
  commonAssets,
} from "~/data/games";
import GoWithTheCrowVisual from "~/components/game-visuals/GoWithTheCrowVisual.vue";
import OrtrisVisual from "~/components/game-visuals/Ortris.vue";

const FRAME_CLOSE_MS = 500;
const FRAME_PAUSE_MS = 300;
const FRAME_OPEN_MS = 700;

const frameTimingStyle = {
  "--frame-close-duration": `${FRAME_CLOSE_MS}ms`,
  "--frame-pause-duration": `${FRAME_PAUSE_MS}ms`,
  "--frame-open-duration": `${FRAME_OPEN_MS}ms`,
};

const props = defineProps<{
  visualId: GameVisualId | null;
  frameSwitching: boolean;
  centered: boolean;
}>();

defineEmits<{
  "frame-animation-end": [];
}>();

const displayedVisualId = ref<GameVisualId | null>(props.visualId);
const visualAnimPhase = ref<"idle" | "exiting" | "entering">("idle");
const frameMotion = ref<"switching" | "closing" | "opening" | null>(null);

let swapTimer: ReturnType<typeof setTimeout> | null = null;
let enterTimer: ReturnType<typeof setTimeout> | null = null;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

function clearVisualTimers() {
  if (swapTimer) {
    clearTimeout(swapTimer);
    swapTimer = null;
  }
  if (enterTimer) {
    clearTimeout(enterTimer);
    enterTimer = null;
  }
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

function resolveVisualComponent(id: GameVisualId | null) {
  switch (id) {
    case "ortris":
      return OrtrisVisual;
    case "go-with-the-crow":
    case "orange-court":
      return GoWithTheCrowVisual;
    default:
      return null;
  }
}

function resolveFrameAssets(id: GameVisualId | null) {
  switch (id) {
    case "ortris":
      return {
        frameTop: commonAssets.frameTop,
        frameBottom: commonAssets.frameBottom,
      };
    case "go-with-the-crow":
    case "orange-court":
    default:
      return {
        frameTop: commonAssets.frameTop,
        frameBottom: commonAssets.frameBottom,
      };
  }
}

const visualComponent = computed(() => resolveVisualComponent(displayedVisualId.value));
const frameAssets = computed(() => resolveFrameAssets(displayedVisualId.value));
const frameTopClasses = computed(() => ({
  "is-switching": props.frameSwitching && frameMotion.value === "switching",
  "is-closing": props.frameSwitching && frameMotion.value === "closing",
  "is-opening": props.frameSwitching && frameMotion.value === "opening",
  "is-closed": !props.frameSwitching && !props.visualId,
}));

watch(
  () => props.visualId,
  (newId) => {
    if (newId === displayedVisualId.value && visualAnimPhase.value === "idle") {
      return;
    }

    clearVisualTimers();

    if (!displayedVisualId.value && newId) {
      frameMotion.value = "opening";
      displayedVisualId.value = newId;
      visualAnimPhase.value = "entering";

      idleTimer = setTimeout(() => {
        visualAnimPhase.value = "idle";
      }, FRAME_OPEN_MS);
      return;
    }

    frameMotion.value = newId ? "switching" : "closing";
    visualAnimPhase.value = "exiting";

    swapTimer = setTimeout(() => {
      displayedVisualId.value = newId;

      if (!newId) {
        visualAnimPhase.value = "idle";
        return;
      }

      enterTimer = setTimeout(() => {
        visualAnimPhase.value = "entering";

        idleTimer = setTimeout(() => {
          visualAnimPhase.value = "idle";
        }, FRAME_OPEN_MS);
      }, FRAME_PAUSE_MS);
    }, FRAME_CLOSE_MS);
  },
);

watch(
  () => props.frameSwitching,
  (isSwitching) => {
    if (!isSwitching) {
      frameMotion.value = null;
    }
  },
);

onUnmounted(clearVisualTimers);
</script>

<style scoped>
.game-visual {
  --frame-close-duration: 500ms;
  --frame-pause-duration: 300ms;
  --frame-open-duration: 700ms;
  --frame-total-duration: calc(
    var(--frame-close-duration) + var(--frame-pause-duration) + var(--frame-open-duration)
  );
  --scene-y-offset: -80px;

  position: absolute;
  inset: 0;
  pointer-events: none;
}

.game-visual__scene {
  position: absolute;
  inset: 0;
  transform: translateY(var(--scene-y-offset)) translateX(0);
  transition: transform 480ms ease-in-out;
}

.game-visual__scene.is-centered {
  transform: translateY(var(--scene-y-offset)) translateX(calc(50vw - 435px));
}

.game-visual__stage {
  position: absolute;
  inset: 0;
  z-index: 1;
  transform: scale(1);
  transform-origin: 435px 680px;
}

.game-visual__stage.is-exiting {
  animation: visual-tuck-out var(--frame-close-duration) ease-in-out forwards;
}

.game-visual__stage.is-entering {
  animation: visual-tuck-in var(--frame-open-duration) ease-in-out forwards;
}

.game-visual__stage.is-hidden {
  transform: scale(0);
}

.game-visual__frame-top {
  position: absolute;
  z-index: 5;
  left: 302px;
  top: 228px;
  width: 265px;
  height: 166px;
}

.game-visual__frame-top.is-switching {
  animation: game-frame-close-open var(--frame-total-duration) ease-in-out forwards;
}

.game-visual__frame-top.is-closing {
  animation: game-frame-close-hold var(--frame-total-duration) ease-in-out forwards;
}

.game-visual__frame-top.is-opening {
  animation: game-frame-open var(--frame-open-duration) ease-in-out forwards;
}

.game-visual__frame-top.is-closed {
  transform: translateY(230px);
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

  26.6% {
    transform: translateY(230px);
  }

  69.1% {
    transform: translateY(230px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes game-frame-close-hold {
  0% {
    transform: translateY(0);
  }

  26.6% {
    transform: translateY(230px);
  }

  100% {
    transform: translateY(230px);
  }
}

@keyframes game-frame-open {
  from {
    transform: translateY(230px);
  }

  to {
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
