import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    render: PropTypes.func.isRequired,
  }

  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo })
  }

  render() {
    const { error, errorInfo, hasError } = this.state

    if (hasError) {
      return this.props.render(error, errorInfo)
    }

    return this.props.children
  }
}
