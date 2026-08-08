<div align="center">

# 🌍 世界探索者 / World Explorer

**双语世界探索者 — Bilingual World Explorer**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![SQLite](https://img.shields.io/badge/SQLite-Drizzle-003B57?logo=sqlite)](https://orm.drizzle.team)

</div>

---

## 📖 项目简介

**世界探索者** 是一个支持中英文切换的双语个人网站，最大特色是交互式世界地图，可以标记和展示个人旅行轨迹和地点故事。

**World Explorer** is a bilingual personal website supporting Chinese and English. Its standout feature is an interactive world map built with react-simple-maps, where you can mark and showcase travel routes and location-based stories.

## ✨ 功能特性

| 功能 | Feature |
|------|---------|
| 🗺️ 交互式世界地图 | Interactive world map |
| 🌐 中英文双语切换 | Chinese/English bilingual toggle |
| 📍 地点标记与故事 | Location markers & stories |
| 🌓 深色/浅色主题 | Dark/light theme toggle |
| 📝 文章系统 | Article system |
| 👤 个人档案 | Personal profile |
| 📱 响应式设计 | Responsive design |
| 🗄️ SQLite 数据库 | SQLite + Drizzle ORM |
| ⚡ 管理后台 | Admin dashboard |

## 🛠️ 技术栈

- **框架**: Next.js 16 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.x
- **地图**: react-simple-maps + d3-geo
- **UI 组件**: shadcn/ui
- **数据库**: SQLite + Drizzle ORM
- **部署**: Vercel / 自托管

## 📂 项目结构

```
world-explorer/
├── app/
│   ├── api/
│   │   ├── posts/         # 文章 API (中英双语)
│   │   ├── locations/     # 地点 API
│   │   └── profile/       # 个人档案 API
│   ├── posts/             # 文章页
│   ├── map/               # 地图页
│   ├── about/             # 关于页
│   ├── admin/             # 管理后台
│   ├── layout.tsx
│   └── page.tsx           # 首页 (含地图)
├── components/
│   ├── WorldMap.tsx        # 世界地图组件
│   ├── LanguageToggle.tsx  # 语言切换
│   └── ...
├── lib/
│   ├── db.ts              # 数据库配置
│   ├── schema.ts          # Drizzle Schema
│   └── i18n.ts            # 国际化配置
├── public/
│   └── world-110m.json    # 世界地图 GeoJSON
└── drizzle/               # 数据库迁移
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 初始化数据库
npx drizzle-kit push

# 启动开发服务器 (端口 3005)
npm run dev -- -p 3005
```

打开 [http://localhost:3005](http://localhost:3005) 查看效果。

## 📡 API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/posts` | GET/POST | 获取/创建文章 (支持中英文) |
| `/api/locations` | GET/POST | 获取/创建地点标记 |
| `/api/profile` | GET/PUT | 获取/更新个人档案 |

## 📄 许可证

MIT License