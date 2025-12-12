<template>
  <div class="contact-info-main" :class="{
    'disable-transition': diableTransition
  }">
    <div class="contact-info-group-list" :style="{
      transform: `translate(-${activeGroup * 100}%,0)`
    }" ref="contactInfoGroupList">
      <div class="contact-info-group-item" v-for="(group, index) in toScrollArray(groupedContactInfoList)"
        :key="group.name" :class="{ active: index === activeGroup }" :inert="index !== activeGroup">
        <k-contact-way-group :data="group.data" />
      </div>
    </div>
    <div class="choice-button">
      <button class="left-button" @click="prev"><k-icon id="left" /></button>
      <div class="group-name-list-box">
        <div class="group-name-list" :style="{
          transform: `translate(-${activeGroup * 100}%,0)`
        }" ref="groupNameList">
          <div class="group-name-item" :class="{ active: index === activeGroup }"
            v-for="(group, index) in toScrollArray(groupedContactInfoList)" :key="group.name">{{
              $t(`contact-group.${group.name}`) }}</div>
        </div>
      </div>
      <button class="right-button" @click="next"><k-icon id="right" /></button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { groupedContactInfoList } from '@/scripts/contact';
import KContactWayGroup from './KContactWayGroup.vue';
import KIcon from './KIcon.vue';
const groupName = defineModel<string>('group')
const activeGroup = ref<number>(1);

watch(() => groupName.value, (newValue) => {
  console.log(newValue)
  const index = groupedContactInfoList.findIndex(i => i.name === newValue)
  if (index === -1) {
    groupName.value = groupedContactInfoList[0]!.name
    return;
  }
  activeGroup.value = index + 1;
}, { immediate: true })
watch(() => activeGroup.value, (newValue) => {
  if (newValue === 0 || newValue === groupedContactInfoList.length + 1) { return }
  if (newValue < 0) { activeGroup.value = 1; return }
  if (newValue > groupedContactInfoList.length + 1) { activeGroup.value = groupedContactInfoList.length; return }
  groupName.value = groupedContactInfoList[newValue - 1]?.name
})

const diableTransition = ref<boolean>(false);
const groupNameList = useTemplateRef<HTMLDivElement>('groupNameList');
const contactInfoGroupList = useTemplateRef<HTMLDivElement>('contactInfoGroupList');
function disableTransitionTemporarily() {
  diableTransition.value = true;

  return () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    groupNameList.value?.clientLeft
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    contactInfoGroupList.value?.clientLeft

    diableTransition.value = false;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toScrollArray<T extends Array<any>>(arr: T) {
  if (arr.length === 0) return arr;
  const result = Array.from(arr) as T;
  result.push(arr[0]);
  result.unshift(arr[arr.length - 1]);
  return result;
}
function next() {
  if (activeGroup.value >= groupedContactInfoList.length) {
    const restore = disableTransitionTemporarily();
    activeGroup.value = 0;
    setTimeout(() => {
      restore();
      activeGroup.value = 1;
    }, 0);
  } else {
    activeGroup.value += 1;
  }
}
function prev() {
  if (activeGroup.value <= 1) {
    const restore = disableTransitionTemporarily();
    activeGroup.value = groupedContactInfoList.length + 1;
    setTimeout(() => {
      restore();
      activeGroup.value = groupedContactInfoList.length;
    }, 0);
  } else {
    activeGroup.value -= 1;
  }
}
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';

.contact-info-main {
  position: fixed;
  height: 100%;
  font-size: min(3vw, 2vh, 1.5rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2em;
}

@mixin disable-transition {
  .disable-transition & {
    transition: none;
  }
}

.contact-info-group-list {
  display: flex;
  align-items: center;
  $width: 80vw;
  width: $width;
  transition: transform 0.3s ease;
  @include disable-transition;

  .contact-info-group-item {
    flex: 0 0 auto;
    width: $width;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.3s, transform 0.3s;
    @include disable-transition;

    &.active {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.choice-button {
  justify-content: center;
  align-items: center;
  border: solid 0.1em;
  border-radius: 9999999px;
  padding: 0 0.3em;
  position: relative;
  backdrop-filter: blur(0.1em);
  opacity: 0.5;
  transition: opacity 0.3s;
  &:hover,
  &:focus-within {
    opacity: 1;
  }

  @include useTheme {
    border-color: getTheme('color');
    background: rgba(getTheme('background'), 0.5);
  }

  button {
    background: transparent;
    outline: none;
    border: solid 0.1em transparent;
    border-radius: 99999px;
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 1em;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1;
    transition: color 0.3s, border-color 0.3s;

    &.left-button {
      left: 0.15em;
    }

    &.right-button {
      right: 0.15em;
    }

    @include useTheme {
      color: getTheme('color');
    }

    &:hover,
    &:focus {
      @include useTheme {
        border-color: color.mix(getTheme('color'), getTheme('active-color'), 50%);
        color: color.mix(getTheme('color'), getTheme('active-color'), 50%);
      }
    }
  }

  .group-name-list-box {
    $size: 10em;
    width: $size;
    overflow: hidden;
    mask: linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%);

    .group-name-list {
      width: $size;
      display: flex;
      overflow: visible;


      transition: transform 0.3s ease;

      @include disable-transition;


      .group-name-item {
        flex: 0 0 auto;
        width: $size;
        text-align: center;
        opacity: 0.6;
        transition: opacity 0.3s ease;

        @include disable-transition;

        &.active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
