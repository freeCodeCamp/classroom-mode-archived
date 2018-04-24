import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StudentRow extends Component {
  static propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    notes: PropTypes.string,
    daysInactive: PropTypes.number,
    newSubmissionsCount: PropTypes.number,
  }

  render() {
    const {
      name,
      username,
      email,
      notes,
      daysInactive,
      newSubmissionsCount,
    } = this.props

    return (
      <tr>
        <td>{name}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{notes}</td>
        <td>{daysInactive}</td>
        <td>{newSubmissionsCount}</td>
      </tr>
    )
  }
}
