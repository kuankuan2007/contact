<template>
  <div class="background">
    <div class="background-inner">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="logo" />
      </div>
      <div class="furry" v-html="furrySvg"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import furrySvg from '@/assets/furry-mask.svg?raw';
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';

.background {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  .background-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }
}

.furry {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40em;
  height: auto;
  opacity: 0.1;

  @include useTheme {
    filter: drop-shadow(getTheme('color') 0 0 0.3em);
  }

  &:deep(svg) {
    @include useTheme {
      fill: getTheme('color');
      color: getTheme('color');
    }
  }
}

.logo {
  position: absolute;
  inset: 0;
  width: min(100vw, 100vh);
  height: auto;
  opacity: 0.05;
  mask: linear-gradient(to right bottom, black, transparent min(100vw, 80vh));
}
</style>
