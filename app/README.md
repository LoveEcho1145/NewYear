# 新春倒计时

基于 React 19 + Vite 7 + TypeScript 构建的农历新年倒计时单页应用，采用深色主题搭配金/红中国传统配色。

## 在线访问

[CF Pages 部署](https://newyear.010912.top/)

## 技术栈

- **框架：** React 19 + TypeScript
- **构建工具：** Vite 7
- **样式：** Tailwind CSS 3 + `tailwindcss-animate`
- **组件库：** shadcn/ui (New York 风格)，基于 Radix UI 原语
- **图标：** Lucide React
- **字体：** Noto Serif SC（思源宋体）
- **部署：** Cloudflare Pages

## 本地开发

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器（含 HMR）
npm run build   # 类型检查 + 生产构建
npm run preview # 本地预览生产构建
npm run lint    # 运行 ESLint
```

## 年度更新

每年春节前更新以下内容：

1. `src/App.tsx` — 修改目标日期和年份文案
2. `src/components/BlessingCard.tsx` — 替换祝福语
3. `tailwind.config.js` — 调整主题色（可选）
4. `src/index.css` — 更新 CSS 变量中的主题色（可选）
