import React, { Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history'

import App from '../containers/App'

const RouterSetup = () => (
  <Router history={history}>
    <Fragment>
      <Route exact path="/" component={App} />
    </Fragment>
  </Router>
)

export default RouterSetup
