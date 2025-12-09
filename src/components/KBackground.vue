<template>
  <div class="background">
    <div class="background-inner">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="logo"></img>
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
  filter: blur(0.15em);
  mix-blend-mode: difference;

  @include useTheme {
    fill: color.mix(getTheme('background'), getTheme('color'), 90%);
  }
}

.logo {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: auto;
  opacity: 0.05;
  mask: linear-gradient(to right bottom, black, transparent 40em);
}
</style>
