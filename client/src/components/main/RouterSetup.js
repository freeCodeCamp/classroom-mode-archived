import React from 'react'
import { Router } from 'react-router-dom'
import history from '../../history'

import App from './App'

const RouterSetup = () => (
  <Router history={history}>
    <App />
  </Router>
)

export default RouterSetup
