<template>
  <div class="gwtc-visual">
    <div class="visual-layer visual-layer--back">
      <div class="gwtc-back-card"></div>
      <img class="gwtc-back-crow-body" :src="assets.backCrowBody" alt="" />
    </div>

    <div class="visual-layer visual-layer--mid gwtc-mid"></div>

    <div class="visual-layer visual-layer--front">
      <img class="gwtc-front-feet" :src="assets.frontFeet" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { goWithTheCrowAssets } from "~/data/games";

const assets = goWithTheCrowAssets;
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

.visual-layer--front {
  inset: 0;
  z-index: 8;
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
  left: 404px;
  top: 453px;
  width: 152px;
  height: 221px;
  transform: rotate(7.45deg);
  transform-origin: center;
}

.gwtc-front-feet {
  position: absolute;
  left: 431px;
  top: 603px;
  width: 101px;
  height: 34px;
}

</style>
