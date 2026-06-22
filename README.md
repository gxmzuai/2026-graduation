# 广西民族大学 · 2026 届毕业纪念

一个写给相思湖畔三年时光的毕业纪念站点 —— 时光长廊、宿舍、班级，都在这里。

## 技术栈

- [Astro 6](https://astro.build/) —— 内容优先、近乎零 JS 的静态站点
- [Tailwind CSS v4](https://tailwindcss.com/) —— CSS-first，`@theme` 令牌（经 `@tailwindcss/vite` 接入）
- `astro:assets` 图片优化（自动生成多尺寸 WebP）
- 纯 Astro + 原生 `<script>`，无前端框架运行时

视觉：**静谧电影感**（墨绿夜色 + 鎏金），点缀**铜鼓 / 壮锦**民族纹样。

## 本地开发

```sh
pnpm install
pnpm dev        # 本地预览 http://localhost:4321
pnpm build      # astro check + 构建到 dist/
pnpm preview    # 预览构建产物
```

## 如何添加内容

### 加照片（时光长廊）

1. 把照片放进对应学年文件夹：`src/assets/gallery/year-1|year-2|year-3/`
   （研三的文件夹已建好，放进去即可自动出现）。
2. 想加说明文字，到 `src/data/gallery.ts` 的 `CAPTIONS` 里按
   `'学年/文件名'`（如 `'year-3/1'`）补一条标题、描述、日期。不写也能正常显示。

### 改成员名单

- 宿舍：`src/data/roommates.json`
- 班级：`src/data/classmates.json`

字段：`id`（学号）、`name`（姓名）、`qq`（QQ 号，用于头像）、`gender`（`男`/`女`）。
头像取自 QQ 公开头像接口；若加载失败，会自动以姓名首字占位。

### 改文案 / 起始日期

站点标题、寄语、「在一起的第 N 天」的起始日期等，集中在 `src/data/site.ts`。

## 目录结构

```
src/
├─ assets/gallery/      # 照片（按学年分文件夹，自动收录）
├─ components/          # Nav / Footer / Ornament(民族纹样) / Avatar / MemberCard / Lightbox …
├─ data/                # site.ts · members.ts · gallery.ts + json 数据
├─ layouts/BaseLayout.astro
├─ pages/               # index · gallery · roommates · classmates
└─ styles/global.css    # Tailwind v4 主题令牌与基础样式
```

## 致谢

感谢 Anthropic 的 Claude 在本次重构中的设计与工程协助。
