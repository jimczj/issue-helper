const enReadme = `The issue list is reserved exclusively for bug reports and feature requests. That means we do not accept usage questions. If you open an issue that does not conform to the requirements, it will be closed immediately. Why are we so strict about this?

For usage questions, please use the following resources:

* Read the docs
* Look for / ask questions on StackOverflow
Also try to search for your issue - it may have already been answered or even fixed in the development branch. However, if you find that an old, closed issue still persists in the latest version, you should open a new issue using the form below instead of commenting on the old issue.
`

const zhReadme = `issue 列表只接受 bug 报告或是新功能请求 (feature requests)。这意味着我们不接受用法问题。如果你开的 issue 不符合规定，它将会被立刻关闭。

对于使用中遇到的问题，请使用以下资源：

仔细阅读 文档
在 StackOverflow (英文) 或是 SegmentFault（中文）搜索和提问
最后，在开 issue 前，可以先搜索一下以往的旧 issue - 你遇到的问题可能已经有人提了，也可能已经在最新版本中被修正。注意：如果你发现一个已经关闭的旧 issue 在最新版本中仍然存在，请不要在旧 issue 下面留言，而应该用下面的表单开一个新的 issue。
`

module.exports = {
  logo: 'https://github.com/fluidicon.png', // 页面 logo
  repo: 'jimczj/issue-helper', // 仓库地址，会根据此项配置跳转到 github issue 页面，同时也会根据仓库名获取版本信息
  title: 'issue helper', // 页面标题
  similarIssueCount: 5, // 用户填写 issue 标题时搜索的相似 issue 数量
  readme: {
    zh: zhReadme, // 填写表单前中文说明，支持 md 格式
    en: enReadme // 填写表单前英文说明，支持 md 格式
  },
  forms: {
    'bug': { // bug issue 表单配置
      title: {
        zh: '错误报告',
        en: 'Bug report'
      },
      formItems: [
        {
          label: {
            zh: '版本信息',
            en: 'version'
          },
          mdTitle: '版本信息',
          type: 'version',
          required: true,
        },
        {
          label: {
            zh: '问题描述',
            en: 'Description'
          },
          type: 'textarea', // 输入框类型，可选 textarea，version，input，其中 version 类型会自动根据 repo 配置项获取版本信息
          required: true, // 是否必填
          mdTitle: '问题描述', // 生成 issue 时的标题
          placeholder: {
            zh: '站在其它人的角度尽可能清晰地、简洁地把问题描述清楚',
            en: 'Describe the problem as clearly and succinctly as possible from the other person’s point of view'
          }, // 占位符，可填写提示语言
        },
        {
          label: {
            zh: '复现步骤',
            en: 'Repetition steps'
          },
          type: 'textarea',
          required: true,
          mdTitle: '复现步骤',
          placeholder: `
            1. Go to '...'
            2. Click on '....'
            3. Scroll down to '....'
            4. See error
          `,
        },
        {
          label: {
            zh: '复现代码',
            en: 'Code to help with debugging'
          },
          type: 'textarea',
          required: true,
          mdTitle: '复现代码',
        },
        {
          label: {
            zh: '报错信息',
            en: 'Error message'
          },
          type: 'textarea',
          required: true,
          mdTitle: '报错信息',
        },
        {
          label: {
            zh: '系统信息',
            en: 'System information'
          },
          type: 'textarea',
          required: true,
          mdTitle: '系统信息',
          placeholder: 'Taro v1.2 及以上版本已添加 `taro info` 命令，方便大家查看系统及依赖信息，运行该命令后将结果贴下面即可'
        },
        {
          label: {
            zh: '补充信息',
            en: 'Additional information'
          },
          type: 'textarea',
          required: false,
          mdTitle: '补充信息',
          placeholder: '可选。根据你的调查研究，出现这个问题的原因可能在哪里？'
        }

      ]
    },
    'feature': { // feature issue 表单配置
      title: {
        zh: '功能请求',
        en: 'Feature Request'
      },
      formItems: [
        {
          label: {
            zh: '这个功能解决了什么问题？',
            en: 'What problem does this feature solve?'
          },
          type: 'textarea',
          required: true,
          mdTitle: '这个功能解决了什么问题？',
        },
        {
          label: {
            zh: '你期望的功能是怎样的？',
            en: 'What functions do you expect?'
          },
          type: 'textarea',
          required: true,
          mdTitle: '你期望的功能是怎样的？',
        },
        {
          label: {
            zh: '补充信息',
            en: 'Additional information'
          },
          type: 'textarea',
          required: false,
          mdTitle: '补充信息',
        }
      ]
    }
  }
}
