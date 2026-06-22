import roommatesRaw from './roommates.json';
import classmatesRaw from './classmates.json';

export interface Member {
  id: string;
  name: string;
  qq: string;
  gender: '男' | '女';
}

export const roommates: Member[] = roommatesRaw.roommates as Member[];
export const classmates: Member[] = classmatesRaw.classmates as Member[];

/**
 * QQ 头像（腾讯公开头像接口）。
 * s 只接受固定档位：非法值（如 240）会被服务端降级成 40×40 的糊图，
 * 因此这里把请求尺寸吸附到最近的有效档位。
 */
const QQ_SPECS = [40, 100, 140, 640];
export function qqAvatar(qq: string, size = 140): string {
  const spec = QQ_SPECS.find((s) => s >= size) ?? 640;
  return `https://q.qlogo.cn/g?b=qq&nk=${qq}&s=${spec}`;
}

/** 由姓名派生一个稳定的暖色渐变（头像加载失败时的占位底色）。 */
const FALLBACK_GRADIENTS = [
  'linear-gradient(140deg, oklch(0.42 0.08 35), oklch(0.28 0.05 35))',
  'linear-gradient(140deg, oklch(0.42 0.08 168), oklch(0.27 0.05 168))',
  'linear-gradient(140deg, oklch(0.44 0.10 60), oklch(0.29 0.06 60))',
  'linear-gradient(140deg, oklch(0.40 0.09 150), oklch(0.26 0.05 150))',
  'linear-gradient(140deg, oklch(0.43 0.11 40), oklch(0.28 0.06 40))',
];
export function fallbackGradient(name: string): string {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return FALLBACK_GRADIENTS[h % FALLBACK_GRADIENTS.length];
}

export const memberStats = {
  classCount: classmates.length,
  dormCount: roommates.length,
  maleCount: classmates.filter((m) => m.gender === '男').length,
  femaleCount: classmates.filter((m) => m.gender === '女').length,
};
