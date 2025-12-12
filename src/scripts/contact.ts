import type { Links } from '@/scripts/link';
export interface ContactInfo {
  main: string;
  link?: Links;
  type?: string;
  copy?: string | null; // null means no copy button
  qrcode?: string | null; // null means no qrcode button
}
export type ContactInfoList = { name: string; data: ContactInfo[] }[];

class Email implements ContactInfo {
  link: Links;
  qrcode = null;
  constructor(
    public main: string,
    public type: string | undefined = void 0
  ) {
    this.link = `mailto:${main}`;
  }
}
export const mainContactInfoList: ContactInfoList = [
  {
    name: 'email',
    data: [new Email('3169748076@qq.com', 'furry'), new Email('2163826131@qq.com', 'personal')],
  },
  {
    name: 'qq',
    data: [
      {
        main: '3169748076',
        type: 'furry',
        link: [
          {
            on: ['platform:open-harmony'],
            data: null, // I can't find a way to open QQ profile in HarmonyOS >= 5.0
          },
          {
            on: ['device:desktop'],
            data: 'tencent://ntqq-open?subCmd=profile&action=openMiniBuddyProfile&actionParams=%7B%22uin%22%3A%223169748076%22%2C%22sourceType%22%3A%22QrCodeShareBuddyLink%22%7D',
          },
          {
            on: ['device:mobile'],
            data: 'mqqopensdkapi://bizAgent/qm/qr?url=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3DpCjpwuvbmNoeQeQqPlWojZPILvdkRdoh%26jump_from%3D%26auth%3D%26app_name%3D%26authSig%3D%26source_id%3D3_40001',
          },
        ],
        qrcode: 'https://qm.qq.com/q/NYpgKnLWaO',
      },
      {
        main: '2163826131',
        type: 'personal',
        link: [
          {
            on: ['platform:open-harmony'],
            data: null,
          },
          {
            on: ['device:desktop'],
            data: 'tencent://ntqq-open?subCmd=profile&action=openMiniBuddyProfile&actionParams=%7B%22uin%22%3A%222163826131%22%2C%22sourceType%22%3A%22QrCodeShareBuddyLink%22%7D',
          },
          {
            on: ['device:mobile'],
            data: 'mqqopensdkapi://bizAgent/qm/qr?url=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3DG8QnW8vT1IJrQo2fj11OgRb68aueoabr%26jump_from%3D%26auth%3D%26app_name%3D%26authSig%3D%26source_id%3D3_40001',
          },
        ],
        qrcode: 'https://qm.qq.com/q/HOHiDjVaUY',
      },
    ],
  },
  {
    name: 'wechat',
    data: [
      {
        main: 'furrykuankuan',
        qrcode: 'https://u.wechat.com/MKB8MRTsX2UlHzeUXpW3cd4',
        type: 'furry',
      },
      {
        main: 'gouhaoming2007',
        type: 'personal',
        qrcode: 'https://u.wechat.com/MA68wczc7MHT02gN6WUPDWQ?s=3',
      },
    ],
  },
  {
    name: 'douyin',
    data: [{ main: 'kuankuan2007', link: 'https://v.douyin.com/Sjk3L8fgp3g/' }],
  },
  {
    name: 'x',
    data: [
      {
        main: 'kuankuan2007',
        link: 'https://x.com/kuankuan2007',
        qrcode: 'https://x.com/kuankuan2007/profile_image',
      },
    ],
  },
  {
    name: 'bilibili',
    data: [{ main: 'kuankuan2007', link: 'https://space.bilibili.com/662698080' }],
  },
  {
    name: 'youtube',
    data: [
      {
        main: 'kuankuan2007',
        link: 'https://www.youtube.com/@kuankuan2007',
      },
    ],
  },
  {
    name: 'kuaishou',
    data: [{ main: 'kuankuan2007', link: 'https://v.kuaishou.com/KDGp3jb5' }],
  },
  {
    name: 'github',
    data: [{ main: 'kuankuan2007', link: 'https://github.com/kuankuan2007' }],
  },
  {
    name: 'gitee',
    data: [{ main: 'kuankuan2007', link: 'https://gitee.com/kuankuan2007' }],
  },
  {
    name: 'gitcode',
    data: [{ main: 'kuankuan2007', link: 'https://gitcode.com/kuankuan2007' }],
  },
  {
    name: 'npm',
    data: [{ main: 'kuankuan', link: 'https://www.npmjs.com/~kuankuan' }],
  },
  {
    name: 'pypi',
    data: [{ main: 'kuankuan', link: 'https://pypi.org/user/kuankuan' }],
  },
];
export const contactGroupConfig: {
  name: string;
  data: (string | { id: string; type: (string | { src: string; target: string | undefined })[] })[];
}[] = [
  {
    name: 'general',
    data: ['qq', 'wechat', 'email', 'douyin', 'x', 'github'],
  },

  {
    name: 'developer',
    data: ['github', 'gitee', 'gitcode', 'npm', 'pypi'],
  },

  {
    name: 'furry',
    data: [
      { id: 'qq', type: [{ src: 'furry', target: void 0 }] },
      { id: 'wechat', type: [{ src: 'furry', target: void 0 }] },
      { id: 'email', type: [{ src: 'furry', target: void 0 }] },
      'douyin',
      'bilibili',
    ],
  },
  {
    name: 'social',
    data: ['douyin', 'x', 'bilibili', 'youtube', 'kuaishou'],
  },
];
export const groupedContactInfoList: {
  name: string;
  data: ContactInfoList;
}[] = contactGroupConfig.map((group) => {
  return {
    name: group.name,
    data: group.data
      .map((item) => {
        const target = mainContactInfoList.find((i) =>
          typeof item === 'string' ? i.name === item : i.name === item.id
        )!;
        if (typeof item === 'string') {
          return target;
        } else {
          return {
            name: target.name,
            data: target.data
              .map((info) => {
                const match = item.type.find((i) =>
                  typeof i === 'string' ? info.type === i : info.type === i.src
                );
                if (match === void 0) {
                  return void 0;
                }
                if (typeof match === 'string') {
                  return info;
                }
                return {
                  ...info,
                  type: match.target,
                };
              })
              .filter((i) => i !== void 0),
          };
        }
      })
      .filter(Boolean),
  };
});
