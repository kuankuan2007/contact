<template>
  <div class="copy-cmp">
    <k-small-button type="button" class="copy-button" @click.stop="copy" :title="$t(buttonTitle)"><k-icon
        :id="id" /></k-small-button>
  </div>
</template>
<script setup lang="ts">
import { emitEvent } from '@/scripts/event';
import KIcon from './KIcon.vue';
import KSmallButton from './KSmallButton.vue';
import { tRef } from '@/i18n';

const props = defineProps<{
  content: string;
}>();
const emit = defineEmits<{
  'show-success:change': [value: boolean];
}>();
const showSuccess = ref(false);

watch(showSuccess, (newVal) => {
  if (newVal) {
    emit('show-success:change', true);
  } else {
    emit('show-success:change', false);
  }
}, { immediate: true });
const id = computed(() => {
  return showSuccess.value ? 'tick' : 'copy';
})
const buttonTitle = computed(() => {
  return showSuccess.value ? 'string.ele-title.copied' : 'string.ele-title.copy'
})
let lastTimeout: number;
function copy() {
  if (!props.content) return;
  try {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.content);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = props.content;
      textarea.select();
    }
  }
  catch (err) {
    emitEvent(tRef('string.message.copy-failed'), 'warn');
    throw err;
  }
  emitEvent(tRef('string.message.copy-success'), 'info');
  showSuccess.value = true;
  clearTimeout(lastTimeout);
  lastTimeout = window.setTimeout(() => {
    showSuccess.value = false;
  }, 1500);
}
defineExpose({
  copy,
});
</script>
<style scoped lang="scss">
.copy-cmp {
  transition: opacity 0.3s ease;
}
</style>
