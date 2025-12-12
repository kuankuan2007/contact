import type { Ref } from 'vue';
let nowId = 0;
export const eventLevels = ['info', 'warn'] as const;
export type EventLevel = (typeof eventLevels)[number];
export class KAppEvent {
  id: number;
  time: Date;
  constructor(
    public content: string | Ref<string>,
    public level: 'info' | 'warn' = 'info'
  ) {
    this.id = nowId++;
    this.time = new Date();
  }
}
export function emitEvent(content: string | Ref<string>, level: EventLevel = 'info') {
  notifyHandlers(new KAppEvent(content, level));
}
type EventHandler = (event: KAppEvent) => void;
const eventHandlers: EventHandler[] = [];
export function registerEventHandler(handler: EventHandler) {
  eventHandlers.push(handler);
  return () => unregisterEventHandler(handler);
}
export function unregisterEventHandler(handler: EventHandler) {
  const index = eventHandlers.indexOf(handler);
  if (index !== -1) {
    eventHandlers.splice(index, 1);
  }
}
function notifyHandlers(event: KAppEvent) {
  for (const handler of eventHandlers) {
    handler(event);
  }
}
