import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import ErrorBoundary from './components/main/ErrorBoundary'
import './index.css'
import RouterSetup from './components/main/RouterSetup'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
  }),
  connectToDevTools: true,
})

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ErrorBoundary
          render={() => <div className="error">Error has occurred</div>}
        >
          <RouterSetup />
        </ErrorBoundary>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
