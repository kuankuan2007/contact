<template>
  <div class="language" :class="{ 'first-load': firstLoad }">
    <div class="button">
      <k-icon id="language" />
      <div class="language-text">Language</div>
      <div class="current-language-box">
        <div class="current-language">{{ languageName[language as keyof typeof languageName] }}</div>
      </div>
    </div>
    <div class="language-list-box">
      <ul class="language-list">
        <li class="language-item" v-for="{ id, name } in languageList" :key="id">
          <button class="language-button" type="button" @click="language = id"
            :class="{ active: localSettingLanguage === id }">{{
              name }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import { languageList, language, languageName, localSettingLanguage } from '@/i18n/index';
const firstLoad = ref(true);
onMounted(() => {
  setTimeout(() => {
    firstLoad.value = false;
  }, 1000);
})
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';



.language {
  position: fixed;
  top: 1em;
  right: 1em;
  border: 0.1em solid transparent;
  border-radius: 1.5em;
  transition: border-radius 0.3s, border-color 0.3s;
  transform-origin: top center;
  transition: right 0.3s, transform 0.3s;
  overflow: hidden;
  font-size: min(1.8rem, 3vw);

  &.first-load {
    right: 50%;
    transform: translate(50%, 0) scale(1.1);
    pointer-events: none;
  }

  @include useTheme {
    border-color: getTheme('color');
  }



  &:hover,
  &:focus-within {
    border-radius: 1.5em;

    & .language-list-box {
      grid-template-rows: 1fr;
    }
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em 1em;
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
      padding-left: 0.5em;
      white-space: nowrap;
      text-wrap: nowrap;
      overflow: hidden;
    }
  }
}

.language-list-box {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 1fr;
  transition: grid-template-rows 0.3s;

  .language-list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;

    .language-button {
      width: 100%;
      background: none;
      cursor: pointer;
      font-size: 1em;
      outline: none;
      border: none;
      transition: color 0.3s, background 0.3s;
      text-align: center;


      @include useTheme {
        color: getTheme('color');
      }

      &.active {
        @include useTheme {
          color: color.mix(getTheme('active-color'), getTheme('color'), 50%);
        }
      }

      &:hover,
      &:focus {
        @include useTheme {
          background: color.mix(getTheme('background'), getTheme('active-color'), 80%);
        }
      }


    }
  }
}
</style>
