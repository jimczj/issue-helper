import React from 'react'
import { Button, Avatar, Select, Modal } from 'antd'
import { markdown } from 'markdown'

import FormItem from '../../components/form-item'
import config from '../../../config'
import './index.scss'

markdown.toHTML('Hello *World*!')
const Option = Select.Option
const options = config.options

export default class Index extends React.Component {
  state = {
    visible: false,
    cateIdx: 0
  }

  onChange = (stateName, value) => {
    this.setState({ [stateName]: value })
  }

  render () {
    const { cateIdx } = this.state
    console.log(options)
    return (
      <div className='page'>
        <Modal
          title="issue 预览"
          width="700"
          visible={this.state.visible}
          onOk={this.onChange.bind(this, 'visible', false)}
          onCancel={this.onChange.bind(this, 'visible', false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
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
                  {options.map((item, i) => <Option key={item.title} value={i}>{item.title}</Option>)}
                </Select >
              </div>
            </div>
            {options[cateIdx].formItems.map(item => (
              <FormItem
                key={item.title}
                type={item.type}
                name='title'
                title={item.title}
                placehoder={item.placehoder}
                onChange={this.onChange}
              />
            ))}
            <div className='issue-preview'>
              <Button onClick={this.onChange.bind(this, 'visible', true)} type='primary'>预览</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
