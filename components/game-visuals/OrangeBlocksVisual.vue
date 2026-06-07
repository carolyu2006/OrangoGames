<template>
  <div class="ob-visual">
    <div class="visual-layer visual-layer--back">
      <img
        class="ob-back-block-strip"
        :src="assets.backBlockStrip"
        alt=""
      />
      <img
        class="ob-back-block-green"
        :src="assets.backBlockGreen"
        alt=""
      />
      <img
        class="ob-back-orange-slice"
        :src="assets.backOrangeSlice"
        alt=""
      />
    </div>

    <div class="visual-layer visual-layer--mid">
      <div class="ob-mid-screen">
        <div class="ob-mid-screen-bg"></div>
        <img class="ob-mid-screen-grid" :src="assets.midGrid" alt="" />
      </div>
      <img
        class="ob-mid-screen-blocks"
        :src="assets.midScreenBlocks"
        alt=""
      />
      <img
        class="ob-mid-falling-piece"
        :src="assets.midFallingPiece"
        alt=""
      />
    </div>

    <div class="visual-layer visual-layer--front">
      <div class="ob-front-controller">
        <!-- <div class="ob-controller-panel"></div>
        <div class="ob-controller-btn ob-controller-btn--turn" aria-hidden="true"></div>
        <div class="ob-controller-btn ob-controller-btn--drop" aria-hidden="true">
          <span class="ob-controller-drop-icon"></span>
        </div>
        <div class="ob-controller-btn ob-controller-btn--delete" aria-hidden="true"></div>
        <div class="ob-controller-btn ob-controller-btn--left" aria-hidden="true">
          <span class="ob-controller-arrow ob-controller-arrow--left"></span>
        </div>
        <div class="ob-controller-btn ob-controller-btn--right" aria-hidden="true">
          <span class="ob-controller-arrow ob-controller-arrow--right"></span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orangeBlocksAssets } from "~/data/games";

const assets = orangeBlocksAssets;
</script>

<style scoped>
.ob-visual {
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
  inset: 0;
}

.visual-layer--front {
  inset: 0;
  z-index: 8;
}

.ob-back-block-strip {
  position: absolute;
  left: 253px;
  top: 456px;
  width: 126px;
  height: 30px;
  transform: rotate(33deg);
}

.ob-back-block-green {
  position: absolute;
  left: 302px;
  top: 416px;
  width: 62px;
  height: 61px;
  transform: rotate(33deg);
}

.ob-back-orange-slice {
  position: absolute;
  left: 280px;
  top: 532px;
  width: 95px;
  height: 62px;
  transform: rotate(33.99deg);
}

.ob-mid-screen {
  position: absolute;
  left: 378px;
  top: 354px;
  width: 177px;
  height: 266px;
  transform: rotate(8.18deg);
  transform-origin: center;
}

.ob-mid-screen-bg {
  position: absolute;
  inset: 0;
  background-color: var(--black);
  border-radius: 13px;
  box-shadow: inset 0 10px 1px rgba(0, 0, 0, 0.1);
}

.ob-mid-screen-grid {
  position: absolute;
  left: 9px;
  top: 16px;
  width: 160px;
  height: 240px;
  border-radius: 13px;
  opacity: 0.6;
  object-fit: cover;
}

.ob-mid-screen-blocks {
  position: absolute;
  left: 379px;
  top: 523px;
  width: 171px;
  height: 99px;
}

.ob-mid-falling-piece {
  position: absolute;
  left: 456px;
  top: 339px;
  width: 85px;
  height: 62px;
  transform: rotate(-105.84deg) scaleY(-1);
}

.ob-front-controller {
  position: absolute;
  left: 359px;
  top: 580px;
  width: 148px;
  height: 92px;
  transform: rotate(8.18deg);
  transform-origin: top left;
}

.ob-controller-panel {
  position: absolute;
  left: 10px;
  top: 0;
  width: 139px;
  height: 73px;
  background-color: #fffef4;
  border-radius: 0 0 7px 7px;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.15);
}

.ob-controller-btn {
  position: absolute;
  border-radius: 6px;
}

.ob-controller-btn--turn {
  left: 13px;
  top: 10px;
  width: 27px;
  height: 27px;
  background-color: var(--green);
}

.ob-controller-btn--drop {
  left: 40px;
  top: 14px;
  width: 27px;
  height: 27px;
  background-color: var(--sage);
}

.ob-controller-drop-icon {
  position: absolute;
  left: 8px;
  top: 6px;
  width: 11px;
  height: 13px;
  background-color: #fffef4;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}

.ob-controller-btn--delete {
  left: 112px;
  top: 24px;
  width: 27px;
  height: 27px;
  background-color: #9e2d1a;
}

.ob-controller-btn--delete::after {
  content: "";
  position: absolute;
  left: 7px;
  top: 7px;
  width: 13px;
  height: 13px;
  background-color: #fffef4;
  border-radius: 2px;
}

.ob-controller-btn--left {
  left: 8px;
  top: 41px;
  width: 55px;
  height: 31px;
  background-color: #ff8419;
  border-radius: 8px;
}

.ob-controller-btn--right {
  left: 80px;
  top: 51px;
  width: 55px;
  height: 31px;
  background-color: var(--orange-dark);
  border-radius: 8px;
}

.ob-controller-arrow {
  position: absolute;
  top: 9px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
}

.ob-controller-arrow--left {
  left: 22px;
  border-right: 12px solid #fffef4;
}

.ob-controller-arrow--right {
  left: 22px;
  border-left: 12px solid #fffef4;
}

</style>
