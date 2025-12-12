<template>
  <div class="event-shower" :class="{
    'first-load': firstLoad
  }">
    <div class="event-list">
      <transition-group tag="div" name="event-list">
        <div class="event-item-box" v-for="event in showingEvents" :key="event.id">
          <div class="event-item">
            <k-icon :id="getIcon(event.level)" />
            <div class="event-content">{{ event.content }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { KAppEvent, registerEventHandler, unregisterEventHandler, type EventLevel } from '@/scripts/event';
import KIcon from './KIcon.vue';

defineProps<{
  firstLoad: boolean
}>();
const EVENT_SHOWING_TIME = 3000;

function getIcon(level: EventLevel) {
  return level;
}
const showingEvents = shallowReactive<KAppEvent[]>([]);

function eventHander(event: KAppEvent) {
  showingEvents.push(event);
  setTimeout(() => {
    const index = showingEvents.indexOf(event);
    if (index !== -1) {
      showingEvents.splice(index, 1);
    }
  }, EVENT_SHOWING_TIME);
}

onMounted(() => {
  registerEventHandler(eventHander)
})
onUnmounted(() => {
  unregisterEventHandler(eventHander)
})

</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';

.event-shower {
  position: fixed;
  top: 6em;
  left: 50%;
  font-size: 0.9em;
  transition: transform 0.5s ease;
  display: flex;
  justify-content: center;



  .event-list {
    position: relative;
  }
}

.event-item-box {
  transform-origin: left center;
  width: fit-content;
  padding: 0.3em 0;
}

.event-item {
  border: solid 0.1em transparent;
  padding: 0.2em 1em;
  border-radius: 9999999px;
  display: flex;
  align-items: center;
  gap: 0.5em;
  display: flex;
  transform: translate(-50%, 0);

  @include useTheme {
    border-color: getTheme('color');
    background-color: getTheme('background');
    color: getTheme('color');
  }

  .event-content {
    word-break: keep-all;
    white-space: nowrap;
  }
}

.event-list-enter-active,
.event-list-leave-active,
.event-list-move {
  transition: all 0.5s ease;
}

.event-list-enter-from,
.event-list-leave-to {
  opacity: 0;
}

.event-list-enter-from {
  transform: translate(0, 1em) scale(0.8);
}

.event-list-leave-to {
  transform: scale(0.8);
}

.event-list-leave-active {
  position: absolute;
}
</style>
