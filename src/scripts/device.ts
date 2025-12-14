import { tRef } from '@/i18n';
import { emitEvent } from './event';

export const platforms = [
  'windows',
  'android',
  'macos',
  'ios',
  'open-harmony',
  'ubuntu',
  'unknown',
] as const;
export const devices = ['mobile', 'desktop'] as const;
export type PlatformType = (typeof platforms)[number];
export type DeviceType = (typeof devices)[number];
function getPlatform(): PlatformType {
  if (navigator.userAgent.includes('Windows') || navigator.platform.includes('Win32')) {
    return 'windows';
  }

  if (navigator.userAgent.includes('OpenHarmony')) {
    return 'open-harmony';
  }
  if (navigator.userAgent.includes('Android')) {
    return 'android';
  }
  if (navigator.platform.includes('Mac') || navigator.platform.includes('Macintosh')) {
    return 'macos';
  }
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
    return 'ios';
  }
  if (navigator.userAgent.includes('Ubuntu')) {
    return 'ubuntu';
  }
  return 'unknown';
}
function getDevice(): DeviceType {
  if (navigator.userAgent.includes('Mobile')) {
    return 'mobile';
  }
  return 'desktop';
}

export const nowEnv = ref<{ platform: PlatformType; device: DeviceType }>({
  platform: getPlatform(),
  device: getDevice(),
});
watch(
  () => nowEnv.value.platform,
  (newVal) => {
    if (newVal === 'open-harmony') {
      setTimeout(() => {
        emitEvent(tRef('string.message.running-on-harmonyos'), 'info');
      });
    }
  },
  { immediate: true }
);
let torchTipShown = false;

function torchTip() {
  if (nowEnv.value.device === 'desktop' && !torchTipShown) {
    torchTipShown = true;
    window.removeEventListener('touchstart', torchTip);
    emitEvent(tRef('string.message.touch-tip'), 'info');
  }
}

window.addEventListener('touchstart', torchTip);

export const platformsData = platforms.map((i) => ({
  id: i,
  name: tRef(`settings.platforms.${i}`),
}));
export const devicesData = devices.map((i) => ({
  id: i,
  name: tRef(`settings.devices.${i}`),
}));
