<template>
  <button ref="buttonRef" type="button" class="carousel-nav-dot" :class="{ active }" role="tab" :aria-label="label"
    :aria-selected="active" :disabled="disabled" @click="$emit('select')">
    <svg class="carousel-nav-dot__svg" viewBox="0 0 66 40" overflow="visible" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path ref="starTemplateRef" :d="STAR_PATH" transform="translate(20 7)" visibility="hidden" />
      <path ref="leafTemplateRef" :d="LEAF_PATH" visibility="hidden" />

      <g ref="contentRef">
        <path ref="greenPathRef" :d="STAR_PATH" transform="translate(20 7)" fill="#3A664B" />

        <circle ref="orangeCircleRef" cx="19.845" cy="19.845" :r="ORANGE_RADIUS" fill="#FF8519" />
      </g>
    </svg>
  </button>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

const STAR_PATH =
  "M0.675207 13.983C-0.225044 13.4918 -0.225094 12.1989 0.675207 11.7076L7.8129 7.81408L11.7074 0.675408C12.1986 -0.225136 13.4926 -0.225136 13.9838 0.675408L17.8764 7.81408L25.016 11.7076C25.9162 12.1989 25.9162 13.4917 25.016 13.983L17.8764 17.8776L13.9838 25.0153C13.4926 25.9158 12.1986 25.9158 11.7074 25.0153L7.8129 17.8766L0.675207 13.983Z";

const LEAF_PATH =
  "M47.0144 29.5469C47.498 29.8106 48.0824 29.8106 48.5659 29.5469L63.0028 21.6722C64.1285 21.0582 64.1285 19.4418 63.0028 18.8278L48.5659 10.9532C48.0824 10.6894 47.498 10.6894 47.0144 10.9532L32.5775 18.8278C31.4518 19.4418 31.4518 21.0582 32.5775 21.6722L47.0144 29.5469Z";

const STAR_TRANSFORM = "translate(20 7)";
const STAR_CENTER_X = 33;
const STAR_CENTER_Y = 20;
const IDLE_CONTENT_SCALE = 66 / 26;
const INACTIVE_SIZE = 20.8;
const ACTIVE_WIDTH = 52.8;
const ACTIVE_HEIGHT = 32;
const ORANGE_RADIUS = 19.845;
const ORANGE_CENTER = 19.845;
const ORANGE_ORIGIN = `${ORANGE_CENTER} ${ORANGE_CENTER}`;
const ANIM_DURATION = 0.35;

const props = defineProps<{
  active: boolean;
  disabled?: boolean;
  label: string;
}>();

defineEmits<{
  select: [];
}>();

const buttonRef = ref<HTMLButtonElement | null>(null);
const contentRef = ref<SVGGElement | null>(null);
const greenPathRef = ref<SVGPathElement | null>(null);
const leafTemplateRef = ref<SVGPathElement | null>(null);
const starTemplateRef = ref<SVGPathElement | null>(null);
const orangeCircleRef = ref<SVGCircleElement | null>(null);

let gsapContext: gsap.Context | null = null;
let activeTimeline: gsap.core.Timeline | null = null;

function setContentScale(active: boolean) {
  if (!contentRef.value) return;

  gsap.set(contentRef.value, {
    scale: active ? 1 : IDLE_CONTENT_SCALE,
    svgOrigin: `${STAR_CENTER_X} ${STAR_CENTER_Y}`,
  });
}

function setGreenPathState(active: boolean) {
  if (!greenPathRef.value) return;

  if (active) {
    greenPathRef.value.setAttribute("d", LEAF_PATH);
    greenPathRef.value.removeAttribute("transform");
    return;
  }

  greenPathRef.value.setAttribute("d", STAR_PATH);
  greenPathRef.value.setAttribute("transform", STAR_TRANSFORM);
}

function setOrangeState(active: boolean) {
  if (!orangeCircleRef.value) return;

  gsap.set(orangeCircleRef.value, {
    scale: active ? 1 : 0,
    svgOrigin: ORANGE_ORIGIN,
  });
}

function applyState(active: boolean, animate: boolean) {
  if (
    !buttonRef.value ||
    !contentRef.value ||
    !greenPathRef.value ||
    !leafTemplateRef.value ||
    !starTemplateRef.value ||
    !orangeCircleRef.value
  ) {
    return;
  }

  activeTimeline?.kill();

  if (!animate) {
    gsap.set(buttonRef.value, {
      width: active ? ACTIVE_WIDTH : INACTIVE_SIZE,
      height: active ? ACTIVE_HEIGHT : INACTIVE_SIZE,
    });
    setContentScale(active);
    setGreenPathState(active);
    setOrangeState(active);
    return;
  }

  activeTimeline = gsap.timeline();

  activeTimeline.to(
    buttonRef.value,
    {
      width: active ? ACTIVE_WIDTH : INACTIVE_SIZE,
      height: active ? ACTIVE_HEIGHT : INACTIVE_SIZE,
      duration: ANIM_DURATION,
      ease: "power1.inOut",
    },
    0,
  );

  activeTimeline.to(
    contentRef.value,
    {
      scale: active ? 1 : IDLE_CONTENT_SCALE,
      duration: ANIM_DURATION,
      ease: "power1.inOut",
      svgOrigin: `${STAR_CENTER_X} ${STAR_CENTER_Y}`,
    },
    0,
  );

  if (active) {
    activeTimeline.to(
      greenPathRef.value,
      {
        morphSVG: leafTemplateRef.value,
        duration: ANIM_DURATION,
        ease: "power1.inOut",
      },
      0,
    );
    activeTimeline.to(
      greenPathRef.value,
      {
        attr: { transform: "translate(0 0)" },
        duration: ANIM_DURATION,
        ease: "power1.inOut",
      },
      0,
    );
    activeTimeline.fromTo(
      orangeCircleRef.value,
      {
        scale: 0,
        svgOrigin: ORANGE_ORIGIN,
      },
      {
        scale: 1,
        duration: ANIM_DURATION * 0.8,
        ease: "power1.out",
        svgOrigin: ORANGE_ORIGIN,
      },
      ANIM_DURATION * 0.18,
    );
    return;
  }

  activeTimeline.to(
    orangeCircleRef.value,
    {
      scale: 0,
      duration: ANIM_DURATION * 0.45,
      ease: "power1.in",
      svgOrigin: ORANGE_ORIGIN,
    },
    0,
  );
  activeTimeline.to(
    greenPathRef.value,
    {
      morphSVG: starTemplateRef.value,
      duration: ANIM_DURATION,
      ease: "power1.inOut",
    },
    0,
  );
  activeTimeline.to(
    greenPathRef.value,
    {
      attr: { transform: STAR_TRANSFORM },
      duration: ANIM_DURATION,
      ease: "power1.inOut",
    },
    0,
  );
}

onMounted(() => {
  gsap.registerPlugin(MorphSVGPlugin);

  gsapContext = gsap.context(() => {
    applyState(props.active, false);
  });

  watch(
    () => props.active,
    (active) => {
      applyState(active, true);
    },
  );
});

onUnmounted(() => {
  activeTimeline?.kill();
  gsapContext?.revert();
});
</script>

<style scoped>
.carousel-nav-dot {
  width: 20.8px;
  height: 20.8px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  line-height: 0;
  overflow: visible;
}

.carousel-nav-dot:disabled {
  cursor: not-allowed;
}

.carousel-nav-dot__svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
