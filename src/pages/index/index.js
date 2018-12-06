import React from 'react'
import { Button } from 'antd'

import HelloWorld from '../../components/hello-world'
import './index.scss'

export default class Index extends React.Component {
  render () {
    return (
      <div className='index-page'>
        <div className='container'>
          <HelloWorld />
          <Button> hello world</Button>
        </div>
      </div>
    )
  }
}
