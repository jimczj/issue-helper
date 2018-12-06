import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Index from './pages/index/index.js'

import './index.scss'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route path="/" exact component={Index} />
      </Router>
    )
  }
}

export default App
