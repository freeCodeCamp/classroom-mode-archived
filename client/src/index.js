import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import RouterSetup from './components/RouterSetup'
import registerServiceWorker from './registerServiceWorker'

class Root extends Component {
  render() {
    return (
      <ErrorBoundary
        render={() => <div className="error">Error has occurred</div>}
      >
        <RouterSetup />
      </ErrorBoundary>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
