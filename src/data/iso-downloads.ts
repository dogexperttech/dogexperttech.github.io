export type IsoDownload = {
  title: string;
  description: string;
  badge: string;
  href: string;
  external?: boolean;
};

/** ISO and OS images available for download (short links + direct files). */
export const isoDownloads: IsoDownload[] = [
  {
    title: 'Anti-Petya Ultimate',
    description: 'Green Petya ransomware recovery ISO from the file library.',
    badge: 'ISO',
    href: 'https://drive.google.com/uc?id=1PH0YA-bYJXmGbuAl1Tcaqn2FvmGYX8cT&export=download',
    external: true,
  },
  {
    title: 'Windows 11 (English)',
    description: 'Official Microsoft Windows 11 download page.',
    badge: 'Windows',
    href: '/go/GWIN11ENVG/',
  },
  {
    title: 'Windows 11 (Estonian)',
    description: 'Windows 11 download page (Estonian locale).',
    badge: 'Windows',
    href: '/go/GWIN11ESVT/',
  },
  {
    title: 'Windows 7 Ultimate x64',
    description: 'Windows 7 SP1 x64 ISO mirror.',
    badge: 'Windows',
    href: '/go/GWIN7X64/',
  },
  {
    title: 'Windows 7 Ultimate x86',
    description: 'Windows 7 SP1 x86 ISO mirror.',
    badge: 'Windows',
    href: '/go/GWIN7X86/',
  },
  {
    title: 'Bob Omb Win10 PE',
    description: 'Modified Windows 10 PE ISO (archive.org).',
    badge: 'WinPE',
    href: '/go/GEW10BO10/',
  },
  {
    title: 'Dog10PE',
    description: 'Custom Windows 10 PE environment by Dog Expert Tech.',
    badge: 'WinPE',
    href: '/Dog10PE/',
  },
];

export const operatingSystemDownloads = isoDownloads.filter(
  (item) => item.badge === 'Windows' || item.badge === 'WinPE',
);

export const isoImageDownloads = isoDownloads.filter((item) => item.badge === 'ISO');
