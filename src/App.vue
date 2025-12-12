<template>
  <div class="main">
    <k-contact-info v-model:group="nowGroup" />
    <k-menu />
    <k-background />
  </div>
</template>
<script setup lang="ts">

import KMenu from '@/components/KMenu.vue';
import KBackground from '@/components/KBackground.vue';
import KContactInfo from './components/KContactInfo.vue';

const nowGroup = ref<string>(window.location.hash.slice(1))

watch(() => nowGroup.value, (newValue) => {
  window.location.hash = newValue
})

window.addEventListener('popstate', () => {
  nowGroup.value = window.location.hash.slice(1)
})
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';
</style>
