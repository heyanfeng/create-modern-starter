import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

export const cwd = process.cwd()

export const renameFiles: Record<string, string> = {
  _gitignore: '.gitignore',
}

export function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

export function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.removeSync(path.resolve(dir, file))
  }
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

export function initGit(root: string) {
  try {
    execSync('git init', { cwd: root, stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

export function installDependencies(root: string, userAgent: string | undefined) {
  const pkgInfo = pkgFromUserAgent(userAgent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  
  try {
    execSync(`${pkgManager} install`, { cwd: root, stdio: 'inherit' })
    return true
  } catch (e) {
    return false
  }
}

export const TEMPLATES = [
  {
    name: 'react-ts',
    display: 'React + TypeScript + Vite + Tailwind',
    color: 'cyan',
  },
  {
    name: 'vue-ts',
    display: 'Vue + TypeScript + Vite + Tailwind',
    color: 'green',
  },
]
