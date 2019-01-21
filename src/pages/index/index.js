import React from 'react'
import { Button, Avatar, Select } from 'antd'

import FormItem from '../../components/form-item'
import config from '../../../config'
import './index.scss'

const Option = Select.Option

export default class Index extends React.Component {
  state = {

  }

  onChange = (stateName, value) => {
    console.log(stateName, value)
  }

  render () {
    return (
      <div className='page'>
        <div className='issue-header'>
          <div className='issue-header-main'>
            <Avatar size='large' src={config.logo}/>
            <h1 className='issue-header-title'>{config.title}</h1>
            <Button className='issue-header-btn' size='small'>EN</Button>
          </div>
        </div>
        <div className='issue-main'>
          <h2>在开始之前</h2>
          <div className='issue-readme'>
The issue list is reserved exclusively for bug reports and feature requests. That means we do not accept usage questions. If you open an issue that does not conform to the requirements, it will be closed immediately. Why are we so strict about this?

For usage questions, please use the following resources:

Read the docs
Look for / ask questions on StackOverflow
Also try to search for your issue - it may have already been answered or even fixed in the 2.0 branch. However, if you find that an old, closed issue still persists in the latest version, you should open a new issue using the form below instead of commenting on the old issue.
          </div>
          <div ></div>
          <h2>填写表单</h2>
          <div className='issue-form'>
            <div className='issue-form-item'>
              <div className='issue-form-item-label'>issue 类型:</div>
              <div className='issue-form-input'>
                <Select value='bug'>
                  <Option value="feat">功能请求</Option>
                  <Option value="bug">错误报告</Option>
                </Select >
              </div>
            </div>
            <FormItem type='input' name='title' title='Issue 标题：' placehoder='' onChange={this.onChange}/>
            <FormItem type='textArea' name='desc' title='问题描述：' placehoder='站在其它人的角度尽可能清晰地、简洁地把问题描述清楚' onChange={this.onChange} />
            <FormItem type='textArea' name='step' title='复现步骤：' placehoder={`1. Go to \n2. Click on \n3. Scroll down to\n4. See error`} onChange={this.onChange} />
            <div className='issue-preview'><Button type='primary'>预览</Button></div>
          </div>
        </div>
      </div>
    )
  }
}
