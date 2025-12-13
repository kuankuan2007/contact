<template>
  <div class="k-setting" :class="{
    active: isActive
  }">
    <div class="setting-item-box">
      <k-folding-list :data="devicesData" v-model:active="nowEnv.device">
        <template #title>
          <div class="device-title">
            <div class="platform-title-string">{{ $t('settings.string.devices') }}</div>
            <div class="sep">:</div>
            <div class="platform-title-active">
              {{ $t(`settings.devices.${nowEnv.device}`) }}
            </div>
          </div>
        </template>
      </k-folding-list>
      <k-folding-list :data="platformsData" v-model:active="nowEnv.platform">
        <template #title>
          <div class="platform-title">
            <div class="platform-title-string">{{ $t('settings.string.platform') }}</div>
            <div class="sep">:</div>
            <div class="platform-title-active">
              {{ $t(`settings.platforms.${nowEnv.platform}`) }}
            </div>
          </div>

        </template>
      </k-folding-list>
    </div>
    <div class="button" tabindex="0" @mouseenter="($event.currentTarget as HTMLElement)?.focus()" @click="onButtonClick">
      <k-icon id="setting" />
      <div class="setting-title-box">
        <div class="setting-title">{{ $t('settings.string.settings') }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import KFoldingList from './KFoldingList.vue';
import { platformsData, devicesData, nowEnv } from '@/scripts/device';
const DEBUG_CLICK_GAP = 2000;
const DEBUG_CLICK_NUM = 3;

const isActive = ref(false);
const emit = defineEmits<{ showDebug: [] }>()
const clickHistory: number[] = []
function onButtonClick() {
  while (clickHistory.length && clickHistory[0]! < Date.now() - DEBUG_CLICK_GAP) {
    clickHistory.shift()
  }
  clickHistory.push(Date.now())
  if (clickHistory.length >= DEBUG_CLICK_NUM) {
    emit('showDebug')
  }
}
</script>
<style scoped lang="scss">
.k-setting {
  position: fixed;
  right: 1em;
  bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: end;
  row-gap: 0.5em;

}

.platform-title,
.device-title {
  display: flex;
  column-gap: 0.3em;
}

.button {
  display: flex;
  align-items: center;
  gap: 0.3em;
  cursor: default;
  outline: 0;

  .setting-title-box {
    overflow: hidden;
    display: grid;
    grid-template-columns: 0fr;
    transition: grid-template-columns 0.3s;

    .setting-title {
      white-space: nowrap;
      overflow: hidden;
    }

    .k-setting:focus-within &,
    .k-setting.active & {
      grid-template-columns: 1fr;
    }
  }
}

.setting-item-box {
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
  transform: translate(calc(100% + 5em), 0);
  transition: transform 0.3s;

  .k-setting:focus-within &,
  .k-setting.active & {
    transform: translate(0, 0);
  }
}
</style>
