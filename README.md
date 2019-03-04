# issue-helper

## 简介

根据配置文件生成 github issue 提交表单

## 例子

https://nervjs.github.io/taro-ui-issue-helper/ 

## 下载安装

```shell
npm i -g issue-helper
```

## 生成默认配置 config.js

执行以下命令，会在当前文件夹生成 config.js 配置文件

```shell
issue-helper init
```

## 根据需求配置 config.js

```js
module.exports = {
  logo: 'https://github.com/fluidicon.png', // 页面 logo
  repo: 'NervJS/taro-ui', // 仓库地址，会根据此项配置跳转到 github issue 页面，同时也会根据仓库名获取版本信息
  title: 'Taro UI issue helper',// 页面标题
  similarIssueCount: 5,// 用户填写 issue 标题时搜索的相似 issue 数量
  readme: {
    zh: 'zhReadme',// 填写表单前中文说明，支持 md 格式
    en: 'enReadme' // 填写表单前英文说明，支持 md 格式
  },
  forms: {
    'bug': { // bug issue 表单配置
      title: {
        zh: '错误报告',
        en: 'Bug report'
      },
      formItems: [{
        label: {
          zh: '复现代码',
          en: 'Code to help with debugging'
        }, // 表单选项标题，如不需要多语言可以直接填写字符串
        type: 'textarea',// 输入框类型，可选 textarea，version，input，其中 version 类型会自动根据 repo 配置项获取版本信息
        required: true,// 是否必填
        mdTitle: '', // 生成 issue 时的标题
        placeholder: {
          zh: '请粘贴代码',
          en: 'Code to help with debugging'
        }, // 占位符，可填写提示语言，如不需要多语言可以直接填写字符串
      }]
    },
    'feature': {
      title: {
        zh: '功能请求',
        en: 'Feature Request'
      },
      formItems: [
        {
          label: {
            zh: '复现代码',
            en: 'code'
          },
          mdTitle: 'code',
          type: 'textarea',
          required: true,
        },
        {
          label: {
            zh: '版本',
            en: 'version'
          },
          type: 'version',
          required: true,
        }
      ]
    }
  }
}

```

## 检验配置是否正确

在 config.js 同级目录下执行如下命令，如果没有 warning,则配置无误

```shell
issue-helper validate
```

## 预览页面

在 config.js 同级目录下执行如下命令，会开启 http 服务帮助预览。当 config.js 改变时，需要重新执行命令，不会热更新。

```shell
issue-helper preview
```

## 编译生成 issue helper 静态页面

在 config.js 同级目录下执行命令

```shell
issue-helper build

```

## 创意来源

Inspired by <https://github.com/vuejs/vue-issue-helper>

Inspired by <https://github.com/ant-design/antd-issue-helper>
