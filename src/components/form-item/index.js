import React from 'react'
import { Input } from 'antd'
const TextArea = Input.TextArea
import './index.scss'

export default class FormItem extends React.Component {
  render () {
    const { title, type, placeholder, name, errorMsg, onChange } = this.props
    return (
      <div className='form-item'>
        <div className='form-item__label'>{title}</div>
        <div className='form-item__input'>
          {type === 'input' && <Input placeholder={placeholder} onChange={onChange.bind(this, name)} />}
          {type === 'textArea' && <TextArea autosize={{ minRows: 4, maxRows: 10 }} placeholder='站在其它人的角度尽可能清晰地、简洁地把问题描述清楚' onChange={onChange.bind(this, name)} />}
        </div>
        <div className='form-item__error-msg'>{errorMsg}</div>
      </div>
    )
  }
}
