// 站点级常量与文案
export const SITE = {
  school: '广西民族大学',
  schoolEn: 'Guangxi Minzu University',
  college: '相思湖畔',
  classOf: '2026',
  title: '广西民族大学 · 2026 届毕业纪念',
  description:
    '广西民族大学 2026 届研究生毕业纪念册 —— 把相思湖畔三年的山水、同窗与时光，留在这里。',
  author: 'Jiakai',
  repo: 'https://github.com/gxmzuai/2026-graduation', // 源码仓库
  // 在一起的起点与终点（用于「在一起的第 N 天」计数，计满即定格）
  startDate: '2023-09-10', // 入学报到
  endDate: '2026-06-23', // 毕业离校
} as const;

export interface NavLink {
  href: string;
  label: string;
  en: string;
}

export const NAV: NavLink[] = [
  { href: '/', label: '首页', en: 'Home' },
  { href: '/gallery', label: '时光长廊', en: 'Gallery' },
  { href: '/roommates', label: '宿舍', en: 'Dorm' },
  { href: '/classmates', label: '班级', en: 'Class' },
];
