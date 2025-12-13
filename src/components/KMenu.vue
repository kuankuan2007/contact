<template>
  <div class="menu">
    <k-language :first-load="firstLoad" />
    <k-setting @show-debug="showDebug = true" />
    <k-event-shower :first-load="firstLoad" />
    <k-theme-button />
    <k-debug v-model:show="showDebug" />
  </div>
</template>
<script setup lang="ts">
import KLanguage from './KLanguage.vue';
import KSetting from './KSetting.vue';
import KEventShower from './KEventShower.vue';
import KThemeButton from './KThemeButton.vue';
import KDebug from './KDebug.vue';
const firstLoad = ref(true);
onMounted(() => {
  setTimeout(() => {
    firstLoad.value = false;
  }, 1000);
})
const showDebug = ref(false)
</script>
<style scoped lang="scss">
.menu {
  font-size: min(1.8rem, 3vw);
}
</style>
