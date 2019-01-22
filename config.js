module.exports = {
  logo: 'https://taro.aotu.io/favicon.ico',
  title: 'Taro UI issue helper',
  readme: `如果是提交 bug，请搜索文档和 issue，确认以下事项：

* 该问题没有在其他 issue 和文档讨论到，不属于重复内容

* 分割线以下的模板除了「 补充信息」每一样都必填

如果不满足以上两点要求的 bug 报告，issue 会被直接关掉。

请多多理解，您现在的不便将会使 Taro 开发者更高效地定位你的问题，修复你的问题。像你一样的 Taro 的使用者也可以通过搜索找到你提供的 bug，对各方都有很大好处。`,
  options: [{
    title: '功能请求',
    formItems: [
      {
        title: 'Issue 标题：',
        type: 'input',
        placeholder: '填写前请先搜索是否已有issue',
        required: true,
      },
      {
        title: '重现链接：',
        type: 'input',
        required: true,
      },
      {
        title: '环境（操作系统版本 / 浏览器版本 / Vue 版本等等信息）：',
        type: 'input',
        required: true,
      },
      {
        title: '复现代码：',
        type: 'textarea',
        required: true,
      }
    ]
  }, {
    title: '错误报告',
    formItems: [{
      title: '复现代码：',
      type: 'textarea',
      required: true,
    }]
  }]
}
