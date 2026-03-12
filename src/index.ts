#!/usr/bin/env node

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import prompts from 'prompts'
import { Command } from 'commander'
import { red, green, bold, cyan } from 'kolorist'
import { 
  formatTargetDir, 
  isEmpty, 
  emptyDir, 
  copy, 
  renameFiles, 
  pkgFromUserAgent,
  TEMPLATES 
} from './utils'

// @ts-ignore
import packageJson from '../package.json'

async function init() {
  const program = new Command()
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version)
    .argument('[project-directory]', 'Project directory')
    .option('-t, --template <template>', 'Template name')
    .parse(process.argv)

  const defaultTargetDir = 'my-app'
  const options = program.opts()
  let targetDir = program.args[0]
  
  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'framework'
  >

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ' is not empty. Remove existing files and continue?',
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'packageName',
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          type: options.template && TEMPLATES.find(t => t.name === options.template) ? null : 'select',
          name: 'framework',
          message: 'Select a framework:',
          initial: 0,
          choices: TEMPLATES.map((template) => {
            return {
              title: template.color === 'cyan' ? cyan(template.display) : template.display,
              value: template.name,
            }
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // User input
  const { framework = options.template, overwrite, packageName } = result

  const root = path.join(process.cwd(), targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../templates',
    framework
  )

  console.log(`\nScaffolding project in ${root}...`)

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files) {
    if (file === 'package.json') {
        continue
    }
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
  )

  pkg.name = packageName || toValidPackageName(targetDir)

  write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  // Post-scaffold questions
  let postScaffoldResult: prompts.Answers<'needsGit' | 'needsInstall'>
  try {
    postScaffoldResult = await prompts([
      {
        type: 'confirm',
        name: 'needsGit',
        message: 'Initialize a new git repository?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'needsInstall',
        message: 'Install dependencies now?',
        initial: true
      }
    ], {
      onCancel: () => {
        throw new Error(red('✖') + ' Operation cancelled')
      }
    })
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  const { needsGit, needsInstall } = postScaffoldResult

  if (needsGit) {
    const { initGit } = await import('./utils')
    console.log(`\nInitializing git repository...`)
    if (initGit(root)) {
      console.log(green('Git repository initialized.'))
    } else {
      console.log(red('Failed to initialize git repository.'))
    }
  }

  if (needsInstall) {
    const { installDependencies } = await import('./utils')
    console.log(`\nInstalling dependencies...`)
    if (installDependencies(root, process.env.npm_config_user_agent)) {
      console.log(green('Dependencies installed.'))
    } else {
      console.log(red('Failed to install dependencies.'))
    }
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  console.log(`\n${green(`Done. Now run:\n`)}`)
  if (root !== process.cwd()) {
    console.log(`  cd ${path.relative(process.cwd(), root)}`)
  }
  if (!needsInstall) {
    switch (pkgManager) {
      case 'yarn':
        console.log('  yarn')
        break
      default:
        console.log(`  ${pkgManager} install`)
        break
    }
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

init().catch((e) => {
  console.error(e)
})
