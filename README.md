# @heyanfeng/create-modern-starter

A modern, opinionated CLI to scaffold production-ready frontend projects. Built for speed and best practices.

![License](https://img.shields.io/github/license/heyanfeng/create-modern-starter)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![Version](https://img.shields.io/npm/v/@heyanfeng/create-modern-starter)

## Features

- ⚡️ **Vite**: Blazing fast dev server and build.
- 📘 **TypeScript**: First-class support with strict type checking.
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- 📦 **Modern Stack**: Support for both React and Vue 3 ecosystems.
- 🛠 **Best Practices**: Pre-configured with ESLint, Prettier, PostCSS, and Autoprefixer.
- 🚀 **Zero Config**: Get started in seconds with automated Git init and dependency installation.

## Usage

### With NPM

```bash
npm create @heyanfeng/modern-starter@latest
```

### With Yarn

```bash
yarn create @heyanfeng/modern-starter
```

### With PNPM

```bash
pnpm create @heyanfeng/modern-starter
```

## Templates

Currently supported templates:

- **React + TypeScript + Tailwind** (`react-ts`): A solid foundation for React applications.
- **Vue + TypeScript + Tailwind** (`vue-ts`): A modern setup for Vue 3 development.

## CLI Options

You can also use command line flags to skip the interactive prompts:

```bash
# Create a React project
npx @heyanfeng/create-modern-starter my-react-app --template react-ts

# Create a Vue project
npx @heyanfeng/create-modern-starter my-vue-app --template vue-ts
```

## Project Structure

The generated projects follow a clean and standard structure:

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

## Development

1. Clone the repository
   ```bash
   git clone https://github.com/heyanfeng/create-modern-starter.git
   ```
2. Install dependencies: `npm install`
3. Run dev mode: `npm run dev`
4. Build: `npm run build`

## License

MIT
