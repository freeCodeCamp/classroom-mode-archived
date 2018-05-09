import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

class Root extends Component {
  render() {
    return (
      <ErrorBoundary
        render={() => <div className="error">Error has occurred</div>}
      >
        <App />
      </ErrorBoundary>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
