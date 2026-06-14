<template>
  <div class="game-visual" :style="frameTimingStyle">
    <div class="game-visual__scene" :class="{
      'is-centered': centered,
      'is-opening': props.frameSwitching && frameMotion === 'opening',
    }">
      <div class="game-visual__scene-inner">
        <div class="game-visual__stage" :class="{
          'is-exiting': visualAnimPhase === 'exiting',
          'is-entering': visualAnimPhase === 'entering',
          'is-pre-enter': isPreEnter,
          'is-hidden': !displayedVisualId && visualAnimPhase === 'idle',
        }">
          <component v-if="visualComponent" :is="visualComponent" />
        </div>

        <img :key="transitionGeneration" class="game-visual__frame-top" :class="frameTopClasses"
          :src="frameAssets.frameTop" alt="" />

        <img class="game-visual__frame-bottom" :src="frameAssets.frameBottom" alt="" />

        <div id="game-visual-foreground" class="game-visual__foreground" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameVisualId } from "~/data/games";
import {
  commonAssets,
} from "~/data/games";
import GoWithTheCrowVisual from "~/components/game-visuals/GoWithTheCrow.vue";
import OrtrisVisual from "~/components/game-visuals/Ortris.vue";

const FRAME_CLOSE_MS = 500;
const FRAME_PAUSE_MS = 300;
const FRAME_OPEN_MS = 700;
const FRAME_TOTAL_MS = FRAME_CLOSE_MS + FRAME_PAUSE_MS + FRAME_OPEN_MS;

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

const emit = defineEmits<{
  "frame-animation-end": [];
}>();

const displayedVisualId = ref<GameVisualId | null>(props.visualId);
const visualAnimPhase = ref<"idle" | "exiting" | "entering">("idle");
const enterTransitionKind = ref<"opening" | "switch" | null>(null);
const isPreEnter = ref(false);
const frameMotion = ref<"switching" | "closing" | "opening" | null>(null);
const transitionGeneration = ref(0);

let swapTimer: ReturnType<typeof setTimeout> | null = null;
let enterTimer: ReturnType<typeof setTimeout> | null = null;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
let completionTimer: ReturnType<typeof setTimeout> | null = null;
let frameMotionResetFrame = 0;

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
  if (completionTimer) {
    clearTimeout(completionTimer);
    completionTimer = null;
  }
}

function scheduleTransitionComplete(durationMs: number) {
  if (completionTimer) {
    clearTimeout(completionTimer);
  }

  completionTimer = setTimeout(() => {
    completionTimer = null;
    emit("frame-animation-end");
  }, durationMs);
}

function setFrameMotion(motion: "switching" | "closing" | "opening" | null) {
  frameMotionResetFrame += 1;
  const resetFrame = frameMotionResetFrame;
  frameMotion.value = null;

  requestAnimationFrame(() => {
    if (resetFrame !== frameMotionResetFrame) return;
    frameMotion.value = motion;
  });
}

function beginTransition(motion: "switching" | "closing" | "opening", durationMs: number) {
  transitionGeneration.value += 1;
  setFrameMotion(motion);
  scheduleTransitionComplete(durationMs);
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

provide("gameVisualAnim", {
  phase: visualAnimPhase,
  enterKind: enterTransitionKind,
  isPreEnter,
});

watch(
  () => props.visualId,
  (newId) => {
    if (newId === displayedVisualId.value && visualAnimPhase.value === "idle") {
      if (props.frameSwitching) {
        scheduleTransitionComplete(0);
      }
      return;
    }

    clearVisualTimers();

    if (!displayedVisualId.value && newId) {
      displayedVisualId.value = newId;
      enterTransitionKind.value = "opening";
      visualAnimPhase.value = "entering";
      beginTransition("opening", FRAME_OPEN_MS);

      idleTimer = setTimeout(() => {
        visualAnimPhase.value = "idle";
        enterTransitionKind.value = null;
      }, FRAME_OPEN_MS);
      return;
    }

    enterTransitionKind.value = null;
    isPreEnter.value = false;
    const motion = newId ? "switching" : "closing";
    visualAnimPhase.value = "exiting";
    beginTransition(motion, FRAME_TOTAL_MS);

    swapTimer = setTimeout(() => {
      displayedVisualId.value = newId;

      if (!newId) {
        visualAnimPhase.value = "idle";
        return;
      }

      visualAnimPhase.value = "idle";
      isPreEnter.value = true;

      enterTimer = setTimeout(() => {
        isPreEnter.value = false;
        enterTransitionKind.value = "switch";
        visualAnimPhase.value = "entering";

        idleTimer = setTimeout(() => {
          visualAnimPhase.value = "idle";
          enterTransitionKind.value = null;
        }, FRAME_OPEN_MS);
      }, FRAME_PAUSE_MS);
    }, FRAME_CLOSE_MS);
  },
);

onUnmounted(clearVisualTimers);
</script>

<style scoped>
.game-visual {
  --frame-close-duration: 500ms;
  --frame-pause-duration: 300ms;
  --frame-open-duration: 700ms;
  --frame-total-duration: calc(var(--frame-close-duration) + var(--frame-pause-duration) + var(--frame-open-duration));
  --scene-y-offset: var(--design-scene-y-offset, -80px);
  --frame-center-x: var(--design-orange-center-x, 435px);
  --frame-top-width: 269.62px;
  --frame-top-height: 170px;
  --frame-bottom-width: 275px;
  --frame-bottom-height: var(--design-frame-bottom-height, 77.64px);
  --frame-top-y: 228px;
  --frame-bottom-y: var(--design-frame-bottom-y, 624px);

  position: absolute;
  inset: 0;
  pointer-events: none;
}

.game-visual__scene {
  position: absolute;
  inset: 0;
  transform: translateY(var(--scene-y-offset)) translateX(calc(50vw - var(--design-section-center-x, 656.5px)));
}

.game-visual__scene-inner {
  position: absolute;
  inset: 0;
  transform: translateX(0);
  transition: transform 480ms ease-in-out;
}

.game-visual__scene.is-centered .game-visual__scene-inner {
  transform: translateX(calc(var(--design-section-center-x, 656.5px) - var(--design-orange-center-x, 435px)));
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

.game-visual__stage.is-hidden,
.game-visual__stage.is-pre-enter {
  transform: scale(0);
}

.game-visual__frame-top {
  position: absolute;
  z-index: 5;
  left: calc(var(--frame-center-x) - var(--frame-top-width) / 2);
  top: var(--frame-top-y);
  width: var(--frame-top-width);
  height: var(--frame-top-height);
  display: block;
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
  left: calc(var(--frame-center-x) - var(--frame-bottom-width) / 2);
  top: var(--frame-bottom-y);
  width: var(--frame-bottom-width);
  height: var(--frame-bottom-height);
  display: block;
}

.game-visual__foreground {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
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

@media (max-width: 768px) {
  .game-visual__scene {
    transform-origin: var(--design-orange-center-x, 435px) 0;
    transform:
      translateX(calc(50vw - var(--design-orange-center-x, 435px)))
      translateY(calc(
        var(--viewport-height, 100vh)
        - var(--mobile-orange-bottom-gap, 92px)
        - (var(--design-frame-bottom-y, 624px) + var(--design-frame-bottom-height, 77.64px)) *
          var(--visual-scale, 0.5)
      ))
      scale(var(--visual-scale, 0.5));
  }

  .game-visual__scene.is-centered .game-visual__scene-inner {
    transform: translateX(0);
  }
}
</style>
