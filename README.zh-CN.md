# 广西民族大学 · 2026 届毕业纪念

[English](./README.md) · **简体中文**

一个写给相思湖畔三年时光的毕业纪念站点 —— 时光长廊、宿舍、班级，
还有一段会随你翻页一路相伴的背景音乐，都在这里。

🔗 在线访问：<https://gxmzu.gujiakai.top>

## 技术栈

- **[Astro 6](https://astro.build/)** —— 内容优先，几乎零 JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** —— CSS-first，`@theme` 令牌（经官方 `@tailwindcss/vite` 接入）
- **[APlayer](https://github.com/DIYgod/APlayer)** —— 轻量的原生背景音乐播放器
- **Astro 视图过渡**（`<ClientRouter />`）—— 让音乐在翻页之间不中断
- **纯 Astro + 原生 `<script>`** —— 无前端框架运行时

视觉：**静谧电影感**（墨绿夜色）+ **柔玫瑰金**点缀，辅以**朱槿（南宁市花）/ 壮锦**民族纹样。

## 本地开发

```sh
pnpm install
pnpm dev       # 本地预览 http://localhost:4321
pnpm build     # astro check + 构建到 dist/
pnpm preview   # 预览构建产物
```

> 使用 **pnpm**，建议 Node 18+。`dist/` 为纯静态产物，可部署到任意静态托管。

## 内容都写在数据文件里

所有图片均来自**外链直链** —— 仓库里不提交任何图片资源。

| 内容 | 文件 | 字段 |
| --- | --- | --- |
| 时光长廊照片 | `src/data/gallery.json` | `{ year, url, title, description, date }`，`year` 取 `year-1` / `year-2` / `year-3` |
| 背景音乐曲目 | `src/data/music.json` | `{ name, artist, url, cover?, lrc? }`，`url` 为音频直链 |
| 宿舍成员 | `src/data/roommates.json` | `{ id, name, qq, gender }` |
| 班级名单 | `src/data/classmates.json` | `{ id, name, qq, gender }` |
| 站点文案与日期 | `src/data/site.ts` | 标题、导航、仓库地址、「在一起的第 N 天」起止日期 |

- **照片与音乐**都是直接指向你链接的 `<img>` / `<audio>`：往对应 JSON 里追加一条即可
  （展示顺序 = 数组顺序；`url` 留空的条目会被忽略）。
- **头像**取自 QQ 公开头像接口（按 `qq` 取）；加载失败时自动以姓名首字占位。
- **音乐不自动播放** —— 由访客自己点开角落的悬浮迷你播放器，且翻页时继续播放。
- **「在一起的第 N 天」计数**从 `2023-09-10` 起算，到 `2026-06-23` 定格。

## 目录结构

```
src/
├─ components/   Nav · Footer · Ornament(民族纹样) · Avatar · MemberCard · Lightbox · MusicPlayer · …
├─ data/         site.ts · members.ts · gallery.ts + 各 json 数据
├─ layouts/      BaseLayout.astro
├─ pages/        index · gallery · roommates · classmates
└─ styles/       global.css   （Tailwind v4 主题令牌与基础样式）
```

## 致谢

一份私人的毕业纪念 —— 请勿转用其中的照片与姓名。
设计与工程由 Anthropic 的 Claude 协助完成。
