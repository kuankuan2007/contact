<template>
  <div class="select-list">
    <div class="select-title" tabindex="0">
      <slot name="title"></slot>
    </div>
    <div class="fold-box">
      <ul class="fold-list">
        <li class="fold-item" v-for="{ id, name } in data" :key="id">
          <slot :data="{ id, name }" name="content">
            <button
              class="fold-list-button"
              type="button"
              @click="active = id"
              :class="{ active: active === id }"
            >
              {{ name }}
            </button>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
defineProps<{
  data: { id: string; name: string | Ref<string> }[];
}>();
const active = defineModel<string>('active');
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
.select-list {
  border: 0.1em solid transparent;
  border-radius: 1.5em;
  transform-origin: top center;
  transition:
    right 0.3s,
    transform 0.3s;
  overflow: hidden;
  backdrop-filter: blur(0.2em);
  @include theme.use {
    border-color: theme.get('color');
    background: rgba(theme.get('background'), 0.8);
  }

  &:hover,
  &:focus-within {
    border-radius: 1.5em;

    & .fold-box {
      grid-template-rows: 1fr;
    }
  }

  .select-title {
    padding: 0.3em 1em;
  }
}

.fold-box {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 1fr;
  transition: grid-template-rows 0.3s;

  .fold-list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    row-gap: 0.1em;
    .fold-item{
      width: 100%;
    }

    .fold-list-button {
      display: block;
      width: 100%;
      background: none;
      cursor: pointer;
      font-size: 1em;
      outline: none;
      border: none;
      margin: 0;
      padding: 0;
      transition:
        color 0.3s,
        background 0.3s;
      text-align: center;

      @include theme.use {
        color: theme.get('color');
      }

      &.active {
        @include theme.use {
          color: color.mix(theme.get('active-color'), theme.get('color'), 50%);
        }
      }

      &:hover,
      &:focus {
        @include theme.use {
          background: color.mix(theme.get('background'), theme.get('active-color'), 80%);
        }
      }
    }
  }
}
</style>
