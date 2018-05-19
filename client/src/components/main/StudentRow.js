import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, Button } from 'react-bootstrap'

export default class StudentRow extends Component {
  static propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    notes: PropTypes.string,
    daysInactive: PropTypes.number,
    newSubmissionsCount: PropTypes.number,
    studentId: PropTypes.string,
    handleDelete: PropTypes.func.isRequired,
  }

  render() {
    const {
      name,
      username,
      email,
      notes,
      daysInactive,
      newSubmissionsCount,
      studentId,
    } = this.props

    return (
      <tr>
        <td>{name}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{notes}</td>
        <td>{daysInactive}</td>
        <td>{newSubmissionsCount}</td>
        <td>
          <ButtonToolbar>
            <form method="POST">
              <Button
                bsStyle="danger"
                onClick={() => this.props.handleDelete(studentId)}
              >
                Delete
              </Button>
            </form>
          </ButtonToolbar>
        </td>
      </tr>
    )
  }
}
