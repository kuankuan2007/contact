<template>
  <dialog class="dialog" ref="dialogRef">
    <div class="dialog-close" @click="close">
      <k-small-button class="closs-button"><k-icon id="cross" /></k-small-button>
    </div>
    <slot></slot>
  </dialog>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import KSmallButton from './KSmallButton.vue';
const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef');
function show() {
  dialogRef.value?.showModal();
}
function close() {
  dialogRef.value?.close();
}
defineExpose({
  show,
  close,
});
</script>
<style scoped lang="scss">
@use '@/styles/theme.scss' as *;
@use "sass:color";

dialog {
  border: none;
  outline: none;
  border-radius: 2em;

  @supports (corner-shape: squircle) {
    corner-shape: squircle;
    border-radius: 5em;
  }

  @include useTheme {
    background: getTheme('background');
    color: getTheme('color');
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(0.2em);
  }
}

.dialog-close {
  position: absolute;
  top: 0.8em;
  right: 0.8em;
  transition: color 0.3s;
  z-index: 1;

  .closs-button {

    &:hover,
    &:active,
    &:focus {
      color: red;
    }
  }
}
</style>
