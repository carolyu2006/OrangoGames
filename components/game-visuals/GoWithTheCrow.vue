<template>
  <div class="gwtc-visual">
    <div class="visual-layer visual-layer--back">
      <div class="gwtc-back-card"></div>
      <img class="gwtc-back-crow-body" :src="assets.backCrowBody" alt="" />
    </div>

    <div class="visual-layer visual-layer--mid gwtc-mid"></div>

    <Teleport to="#game-visual-foreground">
      <img class="gwtc-front-feet" :class="feetAnimClass" :src="assets.frontFeet" alt="" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { goWithTheCrowAssets } from "~/data/games";

const assets = goWithTheCrowAssets;

const gameVisualAnim = inject<{
  phase: Ref<"idle" | "exiting" | "entering">;
  enterKind: Ref<"opening" | "switch" | null>;
  isPreEnter: Ref<boolean>;
}>("gameVisualAnim");

const feetAnimClass = computed(() => {
  const phase = gameVisualAnim?.phase.value ?? "idle";
  const enterKind = gameVisualAnim?.enterKind.value ?? null;
  const isPreEnter = gameVisualAnim?.isPreEnter.value ?? false;

  if (phase === "exiting") return "is-feet-exiting";
  if (isPreEnter) return "is-feet-hidden";
  if (phase === "entering" && enterKind === "opening") return "is-feet-entering-opening";
  if (phase === "entering" && enterKind === "switch") return "is-feet-entering-switch";
  return null;
});
</script>

<style scoped>
.gwtc-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.visual-layer {
  position: absolute;
}

.visual-layer--back {
  inset: 0;
  z-index: 4;
}

.visual-layer--mid {
  z-index: 6;
  left: 299px;
  top: 394px;
  width: 265px;
  height: 230px;
}

.gwtc-back-card {
  position: absolute;
  left: 230px;
  top: 364px;
  width: 253px;
  height: 314px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gwtc-back-card::before {
  content: "";
  width: 170px;
  height: 273px;
  background-color: var(--green-dark);
  border-radius: 20px;
  transform: rotate(-20deg);
}

.gwtc-back-crow-body {
  position: absolute;
  left: 410px;
  top: 456px;
  width: 152px;
  height: 221px;
  transform: rotate(7.45deg);
  transform-origin: center;
}

.gwtc-front-feet {
  position: absolute;
  left: 435px;
  top: 603px;
  width: 101px;
  height: 34px;
  display: block;
  opacity: 1;
  transform: scale(1);
  transform-origin: center center;
}

.gwtc-front-feet.is-feet-hidden {
  transform: scale(0);
}

.gwtc-front-feet.is-feet-exiting {
  animation: gwtc-feet-fade-out var(--frame-close-duration, 500ms) ease-in-out forwards;
}

.gwtc-front-feet.is-feet-entering-opening {
  transform: scale(0);
  animation: gwtc-feet-scale-in-opening var(--frame-open-duration, 700ms) ease-in-out forwards;
}

.gwtc-front-feet.is-feet-entering-switch {
  transform: scale(0);
  animation: gwtc-feet-scale-in-switch var(--frame-open-duration, 700ms) ease-in-out forwards;
}

@keyframes gwtc-feet-fade-out {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes gwtc-feet-scale-in-opening {

  0%,
  75% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes gwtc-feet-scale-in-switch {

  0%,
  46.43% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
