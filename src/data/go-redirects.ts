export interface MirrorLink {
  label: string;
  url: string;
}

export type GoRedirectValue = string | MirrorLink[];

export const goRedirects: Record<string, GoRedirectValue> = {
  youtube: 'https://www.youtube.com/@dogexperttech/',
  youtubeextra: 'https://www.youtube.com/@DogExpertExtra/',
  discord: 'discord.gg/a7F7p6S63J',
  HvUTdUi: 'https://www.wagnardsoft.com/displayddu',
  ADBAMD29: 'https://www.amd.com/en/support/download/drivers.html',
  GWIN11ENVG: 'https://www.microsoft.com/en-us/software-download/windows11',
  GWIN11ESVT: 'https://www.microsoft.com/et-ee/software-download/windows11',
  GEW10BO10:
    'https://dn721905.ca.archive.org/0/items/bob-ombs-windows-10-pe-iso/Bob.Ombs.Modified.Win10PEx64.v4.985.ISO',
  G0PyRCD: [
    { label: 'Archive.org', url: 'https://archive.org/download/antipetya_ultimate/antipetya_ultimate.iso' },
    { label: 'Google Drive', url: 'https://drive.google.com/uc?id=1PH0YA-bYJXmGbuAl1Tcaqn2FvmGYX8cT&export=download' },
    { label: 'OneDrive', url: 'https://1drv.ms/u/c/afe901c9cc84bf2b/IQCA7MZmslv6Qqplp49BJssVAR9YQyYtdFbxhTIiQjE7zr4?e=8wDNhp' },
  ],
  GoAvL1: 'https://www.google.com',
  Dog10PE: '/Dog10PE/',
  GWIN7X64: 'https://buzzheavier.com/lllag2h2ucql',
  GWIN7X86: 'https://buzzheavier.com/wru8ac6nwk2x',
  GWIN10X64: 'https://buzzheavier.com/fuxscqu93mnn',
  GWIN10X86: 'https://buzzheavier.com/4wlxz1qpf5vm',
  GWIN8X64: 'https://buzzheavier.com/dn0bb0ozyxup',
  GWIN8X86: 'https://buzzheavier.com/4uh1amj718hl',
  GWIN81X64: 'https://buzzheavier.com/2i65axai8pao',
  GWIN81X86: 'https://buzzheavier.com/ddhrb4eax1x1',
  GWINXP: 'https://buzzheavier.com/nar2zwokpo9t',
};

export const goRedirectSlugs = Object.keys(goRedirects);
