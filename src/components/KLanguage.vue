<template>
  <k-folding-list :data="languageList" class="language" :class="{ 'first-load': firstLoad }"
    v-model:active="languageValue">
    <template #title>
      <div class="button">
        <k-icon id="language" />
        <div class="language-text">Language</div>
        <div class="current-language-box">
          <div class="current-language">{{ languageName[language as keyof typeof languageName] }}</div>
        </div>
      </div>
    </template>
  </k-folding-list>
</template>
<script setup lang="ts">
import KFoldingList from './KFoldingList.vue';
import KIcon from './KIcon.vue';
import { languageList, language, languageName, localSettingLanguage } from '@/i18n/index';
defineProps<{
  firstLoad: boolean;
}>();
const languageValue = computed({
  get: () => {
    return localSettingLanguage.value
  }, set: (value) => {
    language.value = value
  }
})
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';



.language {
  position: fixed;
  top: 1em;
  right: 1em;


  &.first-load {
    right: 50%;
    transform: translate(50%, 0) scale(1.1);
    pointer-events: none;
  }

}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;

  .language-text {
    margin-left: 0.2em;
  }

  .current-language-box {
    display: grid;
    grid-auto-rows: max-content;
    grid-template-columns: 0fr;
    transition: grid-template-columns 0.3s;

    .language.first-load & {
      grid-template-columns: 1fr;
    }

    .current-language {
      transition: padding-left 0.3s;

      .language.first-load & {
        padding-left: 0.5em;
      }

      white-space: nowrap;
      text-wrap: nowrap;
      overflow: hidden;
    }
  }
}
</style>
