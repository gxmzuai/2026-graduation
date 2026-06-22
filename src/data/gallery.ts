import type { ImageMetadata } from 'astro';

/**
 * 时光长廊数据。
 * 照片自动从 src/assets/gallery/<学年>/ 下读取——
 * 想加新照片：把图片放进对应文件夹（如 year-3/4.jpg），
 * 再到下面的 CAPTIONS 里补一句说明即可（不写也能显示）。
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

interface Caption {
  title: string;
  description: string;
  date: string;
}

// 键名格式：'<学年文件夹>/<文件名(不含扩展名)>'
const CAPTIONS: Record<string, Caption> = {
  'year-1/1': {
    title: '青秀山 · 春日花海',
    description: '佳航与柏村在春天的花海前驻足，那是研一的第一场远行。',
    date: '2024-04-04',
  },
  'year-1/2': {
    title: '青秀山 · 友谊长廊',
    description: '沿着友谊长廊一路向上，山风很轻，话题很多。',
    date: '2024-04-04',
  },
  'year-1/3': {
    title: '青秀山 · 高空绳索',
    description: '宿舍的伙伴们排队挑战高空绳索桥，笑声挂在半空。',
    date: '2024-04-04',
  },
  'year-2/1': {
    title: '南湖 · 中秋夜',
    description: '中秋的晚上，我们结伴去南湖公园，月色与灯火都很满。',
    date: '2024-09-17',
  },
  'year-2/2': {
    title: '航洋城 · 国庆',
    description: '国庆假期挤进航洋城，看人间烟火，也看彼此。',
    date: '2024-10-01',
  },
  'year-2/3': {
    title: '民族博物馆 · 党日',
    description: '党日活动走进广西民族博物馆，铜鼓与壮锦里，是另一种时间。',
    date: '2024-10-11',
  },
};

export interface GalleryPhoto extends Caption {
  key: string;
  src: ImageMetadata;
  /** 跨学年的全局序号，灯箱据此定位 */
  index: number;
}

export interface GalleryYear {
  id: string;
  label: string;
  period: string;
  caption: string;
  photos: GalleryPhoto[];
}

const YEAR_META: Omit<GalleryYear, 'photos'>[] = [
  { id: 'year-1', label: '研一', period: '2023 — 2024', caption: '初到相思湖畔，山水都还很新。' },
  { id: 'year-2', label: '研二', period: '2024 — 2025', caption: '城里城外，四季同行。' },
  { id: 'year-3', label: '研三', period: '2025 — 2026', caption: '聚散有时，所幸后会有期。' },
];

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

function parsePath(path: string): { year: string; name: string } | null {
  const m = path.match(/gallery\/([^/]+)\/([^/]+)\.[a-z0-9]+$/i);
  return m ? { year: m[1], name: m[2] } : null;
}

let running = 0;
export const galleryYears: GalleryYear[] = YEAR_META.map((meta) => {
  const entries = Object.entries(modules)
    .map(([path, mod]) => ({ src: mod.default, info: parsePath(path) }))
    .filter((e): e is { src: ImageMetadata; info: { year: string; name: string } } =>
      e.info !== null && e.info.year === meta.id,
    )
    .sort((a, b) => collator.compare(a.info.name, b.info.name));

  const photos: GalleryPhoto[] = entries.map((e) => {
    const key = `${meta.id}/${e.info.name}`;
    const cap = CAPTIONS[key] ?? {
      title: meta.label, // 未写说明时用学年作标题，避免出现 "研一 · 留影 4" 这类占位文案
      description: '',
      date: '', // 留空，避免把学年区间塞进单日期样式的标签里
    };
    return { key, src: e.src, ...cap, index: running++ };
  });

  return { ...meta, photos };
});

export const allPhotos: GalleryPhoto[] = galleryYears.flatMap((y) => y.photos);
export const photoCount = allPhotos.length;
