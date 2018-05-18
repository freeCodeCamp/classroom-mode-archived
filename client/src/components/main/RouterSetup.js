import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../../history'

import App from './App'
import Home from '../home/Home'

const RouterSetup = () => (
  <Router history={history}>
    <App>
      <Route exact path="/" component={Home} />
    </App>
  </Router>
)

export default RouterSetup
