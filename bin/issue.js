#! /usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const PropTypes = require('prop-types')
const { exec } = require('child_process')

function copyFile (src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src))
}

function compile (cb) {
  const distPath = path.resolve(__dirname, '../dist')
  const indexHtml = `${process.cwd()}/dist/index.html`
  exec(`cp -Rf ${distPath}/* ${process.cwd()}`, function () {
    const config = require(`${process.cwd()}/config.js`)
    const html = fs.readFileSync(indexHtml, 'utf-8')
    const content = html
      .replace('$_logo_$', config.logo)
      .replace('$_title_$', config.title)
      .replace('$_config_$', JSON.stringify(config))
    fs.outputFileSync(indexHtml, content)
    console.log(chalk.green(`
      编译成功!!!
      生成的文件路径为：${process.cwd()}
      Compiled successfully!!!
      The generated file path is： ${process.cwd()}
    `
    ))
    cb && cb()
  })
}

const stringType = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.shape({
    zh: PropTypes.string.isRequired,
    en: PropTypes.string.isRequired
  })
])

const formType = PropTypes.shape({
  title: stringType,
  formItems: PropTypes.arrayOf(PropTypes.shape({
    label: stringType,
    mdTitle: PropTypes.string,
    type: PropTypes.oneOf(['textarea', 'version', 'code', 'input']).isRequired,
    required: PropTypes.bool
  }))
})

const configPropTypes = {
  logo: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  similarIssueCount: PropTypes.number,
  readme: stringType,
  forms: PropTypes.shape({
    'bug': formType,
    'feature': formType
  })
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
    compile()
  })

program
  .command('preview')
  .description('Preview page with config.js')
  .action(function () {
    compile(function () {
      const cmd = exec(`npx http-server ${process.cwd()}`)
      cmd.stdout.on('data', data => {
        console.log(`${data}`)
      })

      cmd.stderr.on('data', data => {
        console.log(`${data}`)
        process.exit(-1)
      })
    })
  })

program
  .command('validate')
  .description('Validate  the config.js conforms to the specification')
  .action(function () {
    const config = require(path.join(process.cwd(), 'config.js'))
    PropTypes.checkPropTypes(configPropTypes, config)
  })

program.parse(process.argv)
