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
  copy = null;
  constructor(
    public main: string,
    public type: string | undefined = void 0
  ) {
    this.link = `mailto:${main}`;
  }
}
const mainContactInfoList: ContactInfoList = [
  {
    name: 'contact.email',
    data: [
      new Email('3169748076@qq.com', 'contact-type.furry'),
      new Email('2163826131@qq.com', 'contact-type.personal'),
    ],
  },
  {
    name: 'contact.qq',
    data: [
      {
        main: '3169748076',
        type: 'contact-type.furry',
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
        type: 'contact-type.personal',
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
    name: 'contact.x',
    data: [
      {
        main: 'kuankuan2007',
        link: 'https://x.com/kuankuan2007',
        qrcode: 'https://x.com/kuankuan2007/profile_image',
      },
    ],
  },
  {
    name: 'contact.github',
    data: [{ main: 'kuankuan2007', link: 'https://github.com/kuankuan2007' }],
  },
  {
    name: 'contact.douyin',
    data: [{ main: 'kuankuan2007', link: 'https://v.douyin.com/Sjk3L8fgp3g/' }],
  },
];
export default mainContactInfoList;
