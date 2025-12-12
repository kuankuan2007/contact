<template>
  <div class="menu">
    <k-language :first-load="firstLoad" />
    <k-setting />
    <k-event-shower :first-load="firstLoad" />
    <k-theme-button />
  </div>
</template>
<script setup lang="ts">
import KLanguage from './KLanguage.vue';
import KSetting from './KSetting.vue';
import KEventShower from './KEventShower.vue';
import KThemeButton from './KThemeButton.vue';
const firstLoad = ref(true);
onMounted(() => {
  setTimeout(() => {
    firstLoad.value = false;
  }, 1000);
})
</script>
<style scoped lang="scss">
.menu {
  font-size: min(1.8rem, 3vw);
}
</style>
