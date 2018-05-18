import React, { Component, Fragment } from 'react'
import Body from './Body'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Body>{this.props.children}</Body>
      </Fragment>
    )
  }
}
