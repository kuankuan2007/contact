export type Links =
  | string
  | {
      on: LinkType[];
      data: string | null;
    }[];
export const linkTypes = [
  'default',
  'platform:windows',
  'platform:android',
  'platform:macos',
  'platform:ios',
  'platform:open-harmony',
  'platform:ubuntu',
  'device:mobile',
  'device:desktop',
] as const;
export type LinkType = (typeof linkTypes)[number];
export const tag: { [key in LinkType]: boolean } = {
  default: true,
  'platform:windows':
    navigator.userAgent.includes('Windows') || navigator.platform.includes('Win32'),
  'platform:android': navigator.userAgent.includes('Android'),
  'platform:macos': navigator.platform.includes('Mac') || navigator.platform.includes('Mac'),
  'platform:ios': navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad'),
  'platform:open-harmony': navigator.userAgent.includes('OpenHarmony'),
  'platform:ubuntu': navigator.userAgent.includes('Ubuntu'),
  'device:mobile': navigator.userAgent.includes('Mobile'),
  'device:desktop': !navigator.userAgent.includes('Mobile'),
};
export function getLink(links: Links | undefined): string | undefined {
  if (!links) {
    return void 0;
  }
  if (typeof links === 'string') {
    return links;
  }
  for (const link of links) {
    for (const on of link.on) {
      if (tag[on]) {
        return link.data === null ? void 0 : link.data;
      }
    }
  }
  return void 0;
}
