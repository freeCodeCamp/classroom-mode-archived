import React, { Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history'

import App from '../containers/App'

const RouterSetup = () => (
  <Router history={history}>
    <Fragment>
      <App>
        <Route exact path="/" component={App} />
      </App>
    </Fragment>
  </Router>
)

export default RouterSetup
