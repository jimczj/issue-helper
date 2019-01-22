import React from 'react'
import classNames from 'classnames'
import { Input } from 'antd'
import './index.scss'

const TextArea = Input.TextArea

export default class FormItem extends React.Component {
  render () {
    const {
      title,
      type,
      required,
      placeholder,
      errorMsg,
      error,
      onBlur,
      onChange,
    } = this.props
    const rootCls = classNames('form-item', {
      'form-item--error': error,
      'form-item--required': required
    })

    return <div className={rootCls}>
      <div className='form-item__label'>{title}:</div>
      <div className='form-item__input'>
        {type === 'input' && <Input allowClear placeholder={placeholder} onChange={onChange} onBlur={onBlur}/>}
        {type === 'textarea' && <TextArea autosize={{ minRows: 2 }} placeholder={placeholder} onChange={onChange} onBlur={onBlur} />}
      </div>
      <div className='form-item__error-msg'>{errorMsg}</div>
    </div>
  }
}
