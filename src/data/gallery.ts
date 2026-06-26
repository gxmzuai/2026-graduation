import galleryRaw from './gallery.json';

/**
 * 时光长廊数据（图片直链模式）。
 * 所有照片写在 src/data/gallery.json 的 photos 数组里，每条 = 一张照片：
 *   {
 *     "year": "year-1",          // 学年：year-1 研一 / year-2 研二 / year-3 研三
 *     "url":  "https://…/x.jpg", // 图片直链（留空的条目不会显示）
 *     "title": "青秀山 · 春日花海", // 可选，缺省用学年占位
 *     "description": "……",        // 可选
 *     "date": "2024-04-04"        // 可选
 *   }
 * 加新照片：往 photos 里按顺序追加一条即可；展示顺序 = 数组顺序。
 */
interface RawPhoto {
  year: string;
  url: string;
  title?: string;
  description?: string;
  date?: string;
}

const rawPhotos = (galleryRaw as { photos: RawPhoto[] }).photos;

export interface GalleryPhoto {
  year: string;
  /** 图片直链 */
  url: string;
  title: string;
  description: string;
  date: string;
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

let running = 0;
export const galleryYears: GalleryYear[] = YEAR_META.map((meta) => {
  const photos: GalleryPhoto[] = rawPhotos
    .filter((p) => p.year === meta.id && p.url.trim() !== '')
    .map((p) => ({
      year: meta.id,
      url: p.url.trim(),
      title: p.title?.trim() || meta.label, // 未写标题时用学年作占位，避免空标题
      description: p.description?.trim() ?? '',
      date: p.date?.trim() ?? '',
      index: running++,
    }));
  return { ...meta, photos };
});

export const allPhotos: GalleryPhoto[] = galleryYears.flatMap((y) => y.photos);
export const photoCount = allPhotos.length;
