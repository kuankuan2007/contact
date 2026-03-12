<template>
  <div class="way-cmp" :class="{ 'has-link': link }">
    <a
      class="way-link"
      :href="link || '#'"
      target="_blank"
      @click="onClick"
      :title="$t(linkTitle)"
      tabindex="0"
    >
      <div class="way-type" v-if="info.type">
        {{ $t(`contact-type.${info.type}`) }}<span class="sep">:</span>
      </div>
      <div class="way-main">{{ info.main }}</div>
    </a>
    <k-copy
      class="copy-button"
      v-if="info.copy !== null"
      :content="info.copy || info.main"
      ref="copyRef"
      @show-success:change="copyShowSuccess = $event"
    />
    <k-qrcode
      class="qrcode-button"
      v-if="!(info.qrcode === null || (info.qrcode === void 0 && !link))"
      :data="info.qrcode || link || info.main"
      :text="info.main"
      :title="title"
    />
  </div>
</template>
<script setup lang="ts">
import type { ContactInfo } from '@/scripts/contact';
import { getLinkRef } from '../scripts/link';
import KCopy from './KCopy.vue';
import KQrcode from './KQrcode.vue';
const props = defineProps<{ info: ContactInfo; title: string }>();
const copyRef = useTemplateRef('copyRef');
const link = getLinkRef(props.info.link);
const copyShowSuccess = ref(false);
const linkTitle = computed(() => {
  const showSuccess = copyShowSuccess.value;
  if (link.value) {
    return 'string.ele-title.link-jump';
  }
  return showSuccess ? 'string.ele-title.copied' : 'string.ele-title.copy';
});
function onClick(event: MouseEvent) {
  if (!link.value) {
    event.preventDefault();
    copyRef.value?.copy();
  }
}
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
.way-cmp {
  display: flex;
  align-items: center;
  gap: 0.2em;
}

a.way-link {
  text-decoration: none;
  transition: color 0.3s;
  padding-bottom: 0.1em;
  outline: none;
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.3em;

  .way-type {
    font-weight: bold;
  }

  .has-link &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border: none;
    border-bottom: solid 0.1em;

    transform-origin: left;
    transform: scaleX(0);

    transition: transform 0.3s;

    @include theme.use {
      border-bottom-color: theme.mix('active-color', 'background', 90%);
    }
  }

  @include theme.use {
    color: color.mix(theme.get('color'), theme.get('active-color'), 50%);
  }

  &:hover,
  &:focus,
  &:active {
    @include theme.use {
      color: theme.mix('active-color', 'background', 90%);
    }

    .way-cmp.has-link & ~ .copy-button {
      opacity: 0;
    }

    & ~ .qrcode-button {
      opacity: 0;
    }

    & ~ .copy-button {
      @include theme.use {
        color: theme.get('active-color');
      }
    }

    &::after {
      transform: scaleX(1);
    }
  }
}

.copy-button,
.qrcode-button {
  transition:
    color 0.3s,
    opacity 0.3s;

  @include theme.use {
    color: color.mix(theme.get('color'), theme.get('active-color'), 50%);
  }
}
</style>
