import { nowEnv, type DeviceType, type PlatformType } from './device';

export type LinkType = `platform:${PlatformType}` | `device:${DeviceType}` | 'default';

export type Links =
  | string
  | {
      on: LinkType[];
      data: string | null;
    }[];

export function getLink(links: Links | undefined): string | undefined {
  if (!links) {
    return void 0;
  }
  if (typeof links === 'string') {
    return links;
  }

  const activeTags = [
    `platform:${nowEnv.value.platform}`,
    `device:${nowEnv.value.device}`,
    'default',
  ];

  for (const link of links) {
    for (const on of link.on) {
      if (activeTags.includes(on)) {
        return link.data || void 0;
      }
    }
  }
  return void 0;
}
export function getLinkRef(links: Links | undefined) {
  return computed(() => getLink(links));
}
