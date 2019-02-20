#! /usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { exec } = require('child_process')

function copyFile (src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src))
}

program
  .command('version')
  .description('Display issue-helper version')
  .action(() => console.log(require('../package.json').version))

program
  .command('init')
  .description('Output a config.sample.js help you to config')
  .action(function () {
    const srcPath = path.resolve(__dirname, '../config.js')
    const outputPath = path.resolve(process.cwd(), './config.js')
    copyFile(srcPath, outputPath)
    console.log(chalk.green('成功生成配置样例 config.js'))
  })

program
  .command('build')
  .description('Build project with config.js')
  .action(function () {
    const webpackPath = path.resolve(__dirname, '../node_modules/webpack/bin/webpack.js')
    const webpackConfigPath = path.resolve(__dirname, '../webpack.config.js')
    console.log(chalk.green(`
      正在编译中...
      Compiling...
    `
    ))
    const cmd = exec(`node ${webpackPath} --config ${webpackConfigPath}`, { timeout: 1000000 })
    cmd.stdout.on('data', function (data) {
      console.log(`${data}`)
      console.log(chalk.green(`
        编译成功!!!
        Compiled successfully!!!
      `
      ))
    })

    cmd.stderr.on('data', function (data) {
      console.log(`${data}`)
      console.log(chalk.red(`
       编译失败!!!
       Compiled Failed !!!
       `
      ))
      // process.exit(-1)
    })
  })

program
  .command('preview')
  .description('Preview page with config.js')
  .action(function () {
    const webpackServePath = path.resolve(__dirname, '../node_modules/.bin/webpack-dev-server')
    const webpackConfigPath = path.resolve(__dirname, '../webpack.config.dev.js')
    console.log(chalk.green('监听 config.js 变化中.....'))
    const cmd = exec(`node ${webpackServePath} --inline --config ${webpackConfigPath} --open`)
    cmd.stdout.on('data', data => {
      console.log(`${data}`)
    })

    cmd.stderr.on('data', data => {
      console.log(`${data}`)
      process.exit(-1)
    })
  })

program.parse(process.argv)
