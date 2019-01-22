import React from 'react'
import { Button, Avatar, Select, Modal, message } from 'antd'
import { markdown } from 'markdown'

import FormItem from '../../components/form-item'
import config from '../../../config'
import './index.scss'

markdown.toHTML('Hello *World*!')
const Option = Select.Option
config.forms.forEach(form => {
  form.formItems.forEach(inputItem => {
    inputItem.error = ''
    inputItem.errorMsg = ''
    inputItem.value = ''
  })
})

export default class Index extends React.Component {
  state = {
    issueMd: '',
    visible: false,
    cateIdx: 0,
    forms: config.forms
  }

  handleChangeValue (idx, event) {
    const { forms, cateIdx } = this.state
    forms[cateIdx].formItems[idx].value = event.target.value
    this.setState({ forms })
  }

  onChange (stateName, value) {
    this.setState({ [stateName]: value })
  }

  handleBlur (idx) {
    const { forms, cateIdx } = this.state
    const item = forms[cateIdx].formItems[idx]
    if (item.required && !item.value.trim()) {
      item.error = true
      item.errorMsg = '该项必填'
    } else {
      item.error = false
      item.errorMsg = ''
    }
    this.setState({ forms })
  }

  preview = () => {
    const { forms, cateIdx } = this.state
    const inputItems = forms[cateIdx].formItems
    //  检测是否符合
    let hasError = false
    inputItems.forEach(item => {
      if (item.required && !item.value.trim()) {
        item.error = true
        item.errorMsg = '该项必填'
        hasError = true
      } else {
        item.error = false
        item.errorMsg = ''
      }
    })
    if (hasError) {
      message.error('表单不符合要求，请重新填写')
      this.setState({ forms })
      return
    }
    const issueMd = inputItems.reduce((a, b) => `${a}### ${b.title}\n${b.value}\n`, '')
    this.setState({
      issueMd,
      visible: true
    })
  }

  render () {
    const { cateIdx, forms, issueMd } = this.state

    return (
      <div className='page'>
        <Modal
          title="issue 预览"
          width='1000px'
          visible={this.state.visible}
          onOk={this.onChange.bind(this, 'visible', false)}
          onCancel={this.onChange.bind(this, 'visible', false)}
        >
          <div className='markdown' dangerouslySetInnerHTML={{ __html: markdown.toHTML(issueMd) }}></div>
        </Modal>
        <div className='issue-header'>
          <div className='issue-header-main'>
            <Avatar size='large' src={config.logo}/>
            <h1 className='issue-header-title'>{config.title}</h1>
            <Button className='issue-header-btn' size='small'>EN</Button>
          </div>
        </div>
        <div className='issue-main'>
          <h2>在开始之前</h2>
          <div className='issue-readme markdown' dangerouslySetInnerHTML={{ __html: markdown.toHTML(config.readme) }}></div>
          <div ></div>
          <h2>填写表单</h2>
          <div className='issue-form'>
            <div className='form-item'>
              <div className='form-item__label'>issue 类型:</div>
              <div className='form-item__input'>
                <Select value={cateIdx} onChange={this.onChange.bind(this, 'cateIdx')}>
                  {forms.map((item, i) => <Option key={item.title} value={i}>{item.title}</Option>)}
                </Select >
              </div>
            </div>
            {forms[cateIdx].formItems.map((item, i) => (
              <FormItem
                key={item.title}
                {...item}
                onBlur={this.handleBlur.bind(this, i)}
                onChange={this.handleChangeValue.bind(this, i)}
              />
            ))}
            <div className='issue-preview'>
              <Button onClick={this.preview} type='primary'>预览</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
