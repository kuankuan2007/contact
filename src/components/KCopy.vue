<template>
  <div>
    <k-small-button type="button" class="copy-button" @click.stop="copy"><k-icon :id="id" /></k-small-button>
  </div>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import KSmallButton from './KSmallButton.vue';

const id = ref('copy');

const props = defineProps<{
  content: string;
}>();
let lastTimeout: number;
function copy() {
  if (!props.content) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(props.content);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = props.content;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  id.value = "tick"
  clearTimeout(lastTimeout);
  lastTimeout = window.setTimeout(() => {
    id.value = "copy";
  }, 800);
}
defineExpose({
  copy,
});
</script>
<style scoped lang="scss"></style>
