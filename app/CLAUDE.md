# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。
本仓库全部使用中文回答。

## 命令

```bash
npm run dev       # 启动开发服务器（含 HMR）
npm run build     # 类型检查（tsc -b）后构建生产版本（vite build）
npm run lint      # 对整个项目运行 ESLint
npm run preview   # 本地预览生产构建结果
```

## 架构

这是一个基于 **React 19 + Vite 7 + TypeScript** 的单页应用——2027年羊年春节倒计时页面，部署于 Cloudflare Pages。

- **样式方案：** Tailwind CSS 3 + `tailwindcss-animate`。设计系统通过 CSS 自定义属性实现主题化（shadcn/ui 风格，通过 `@/lib/utils.ts` 中的 `cn()` 工具函数整合 `clsx` 和 `tailwind-merge`）。采用深色主题搭配金/红配色。
- **UI 组件库：** `src/components/ui/` 包含完整的 shadcn/ui（New York 风格）组件库，基于 Radix UI 原语构建，均为通用可复用组件。
- **应用专属组件**（位于 `src/components/`）：
  - `CountdownUnit.tsx` — 单个倒计时数字展示卡片
  - `BlessingCard.tsx` — 悬停显示释义的祝福语卡片网格
  - `FireworkEffect.tsx` — 基于 Canvas 的粒子烟花动画
  - `Lantern.tsx` — 带摇摆动画的装饰灯笼
  - `ParticleBackground.tsx` — 浮动粒子背景效果
- **Hooks：** `useCountdown(targetDate)` 返回 `{ days, hours, minutes, seconds, isComplete }`，每秒更新。`use-mobile.ts` 是 shadcn sidebar 的辅助 hook。
- **路径别名：** `@/` 映射到 `src/`（在 `vite.config.ts` 和 `tsconfig.app.json` 中均有配置）。
- **入口：** `src/main.tsx` → `src/App.tsx` → `src/index.css`（Tailwind + 自定义关键帧动画）。
- **字体：** 从 Google Fonts 加载 Noto Serif SC（思源宋体），营造传统中国风。

## 关键模式

- **CSS 变量定义主题**，位于 `src/index.css` 的 `:root` 块中（background、foreground、card、popover、primary、secondary、muted、accent、destructive、border、input、ring）。颜色使用 HSL 值；Tailwind 通过 `hsl(var(--...))` 引用。
- **自定义动画关键帧**同时在 `tailwind.config.js`（使 Tailwind 生成工具类）和 `src/index.css`（供直接使用 CSS 类名，如 `animate-float`）中定义。
- **应用内容每年更新**：目标日期硬编码在 `App.tsx` 第 12 行，年份主题色和祝福语随生肖年份更替。
- **`base: './'`** 在 Vite 配置中使用相对资源路径，适配 CF Pages 等路径部署。
