import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './components/main/ErrorBoundary'
import './index.css'
import RouterSetup from './components/main/RouterSetup'
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
