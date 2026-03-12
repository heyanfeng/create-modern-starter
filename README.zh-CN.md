# @heyanfeng/create-modern-starter

[English](README.md) | 简体中文

一个现代化的、固执己见的 CLI 工具，用于快速搭建生产级的前端项目。专为速度和最佳实践而生。

![License](https://img.shields.io/github/license/heyanfeng/create-modern-starter)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![Version](https://img.shields.io/npm/v/@heyanfeng/create-modern-starter)

## 特性

- ⚡️ **Vite**: 极速的开发服务器和构建体验。
- 📘 **TypeScript**: 一流的 TypeScript 支持，严格的类型检查。
- 🎨 **Tailwind CSS**: 实用优先的 CSS 框架，快速构建 UI。
- 📦 **现代技术栈**: 同时支持 React 和 Vue 3 生态系统。
- 🛠 **最佳实践**: 预配置 ESLint, Prettier, PostCSS 和 Autoprefixer。
- 🚀 **零配置**: 自动化 Git 初始化和依赖安装，几秒钟内即可开始开发。

## 使用方法

### 使用 NPM

```bash
npm create @heyanfeng/modern-starter@latest
```

### 使用 Yarn

```bash
yarn create @heyanfeng/modern-starter
```

### 使用 PNPM

```bash
pnpm create @heyanfeng/modern-starter
```

## 模板

当前支持的模板：

- **React + TypeScript + Tailwind** (`react-ts`): React 应用的坚实基础。
- **Vue + TypeScript + Tailwind** (`vue-ts`): Vue 3 开发的现代化配置。

## CLI 选项

你也可以使用命令行参数来跳过交互式提示：

```bash
# 创建一个 React 项目
npx @heyanfeng/create-modern-starter my-react-app --template react-ts

# 创建一个 Vue 项目
npx @heyanfeng/create-modern-starter my-vue-app --template vue-ts
```

## 项目结构

生成的项目遵循清晰且标准的结构：

```
my-app/
├── src/
│   ├── components/
│   ├── App.tsx (or .vue)
│   ├── main.tsx (or .ts)
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .eslintrc.cjs
├── .prettierrc
└── tailwind.config.js
```

## 本地开发

1. 克隆仓库
   ```bash
   git clone https://github.com/heyanfeng/create-modern-starter.git
   ```
2. 安装依赖: `npm install`
3. 运行开发模式: `npm run dev`
4. 构建: `npm run build`

## 许可证

MIT
