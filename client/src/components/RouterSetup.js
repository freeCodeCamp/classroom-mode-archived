import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history'

import App from '../containers/App'

const RouterSetup = () => (
  <Router history={history}>
    <Route exact path="/" component={App} />
  </Router>
)

export default RouterSetup
