const enReadme = `The issue list is reserved exclusively for bug reports and feature requests. That means we do not accept usage questions. If you open an issue that does not conform to the requirements, it will be closed immediately. Why are we so strict about this?

For usage questions, please use the following resources:

* Read the docs
* Look for / ask questions on StackOverflow
Also try to search for your issue - it may have already been answered or even fixed in the development branch. However, if you find that an old, closed issue still persists in the latest version, you should open a new issue using the form below instead of commenting on the old issue.
`

const zhReadme = `如果是提交 bug，请搜索文档和 issue，确认以下事项：

* 该问题没有在其他 issue 和文档讨论到，不属于重复内容

* 分割线以下的模板除了「 补充信息」每一样都必填

如果不满足以上两点要求的 bug 报告，issue 会被直接关掉。

请多多理解，您现在的不便将会使 Taro 开发者更高效地定位你的问题，修复你的问题。像你一样的 Taro 的使用者也可以通过搜索找到你提供的 bug，对各方都有很大好处。
`

module.exports = {
  logo: 'https://github.com/fluidicon.png',
  repo: 'NervJS/taro-ui',
  title: 'Taro UI issue helper',
  similarIssueCount: 5,
  readme: {
    zh: zhReadme,
    en: enReadme
  },
  forms: {
    'bug': {
      title: {
        zh: '错误报告',
        en: 'Bug report'
      },
      formItems: [{
        label: '复现代码',
        type: 'textarea',
        required: true,
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
