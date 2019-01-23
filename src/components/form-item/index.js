import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Input, AutoComplete } from 'antd'

import { fetchIssues } from '../../utils'
import './index.scss'

const Option = AutoComplete.Option
const TextArea = Input.TextArea

export default class FormItem extends React.Component {
  state = {
    items: []
  }

  handleChange = value => {
    if (!this._throttle) {
      this._throttle = _.throttle(title => {
        if (!title || title.length < 5) return
        fetchIssues(title).then(items => {
          this.setState({ items })
        })
      }, 1500)
    }
    this._throttle(value)
    this.props.onChange({ target: { value } })
  }

  handleSelect = value => {
    window.open(value)
  }

  renderInput () {
    const {
      type,
      placeholder,
      value,
      onBlur,
      onChange,
    } = this.props

    switch (type) {
      case 'title': {
        const children = this.state.items.map(item => <Option key={item.title} value={item.html_url}>{item.title}</Option>)
        return <AutoComplete
          allowClear
          value={value}
          placeholder={placeholder}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
          onBlur={onBlur}
        >
          {children}
        </AutoComplete>
      }


      case 'input':
        return <Input
          allowClear
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />

      case 'textarea':
        return <TextArea
          value={value}
          autosize={{ minRows: 2 }}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />

      default:
        return null
    }
  }

  render () {
    const { label, required, error, errorMsg } = this.props
    const rootCls = classNames('form-item', {
      'form-item--error': error,
      'form-item--required': required
    })

    return <div className={rootCls}>
      <div className='form-item__label'>{label}:</div>
      <div className='form-item__input'>{this.renderInput()}</div>
      <div className='form-item__error-msg'>{errorMsg}</div>
    </div>
  }
}
