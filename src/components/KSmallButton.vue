<template>
  <button type="button" class="small-button">
    <slot />
  </button>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
@use "@/styles/theme.scss" as *;
.small-button {
  cursor: pointer;
  color: inherit;
  padding: 0;
  margin: 0;
  background: none;

  font-size: 1em;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  outline: none;

  border: solid 0.1em transparent;
  border-radius: 0.2em;

  &:focus,
  &:active {
    border-color: currentColor;
  }

  transition: color 0.3s,
  opacity 0.3s;

  @include useTheme {

    &:hover {
      color: getTheme('active-color');
    }
  }
}
</style>
