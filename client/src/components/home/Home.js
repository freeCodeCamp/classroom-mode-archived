import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, Button } from 'react-bootstrap'

import './Home.css'

const uuidv4 = require('uuid/v4')

export default class Home extends Component {
  static propTypes = {
    students: PropTypes.array,
    handleDelete: PropTypes.func.isRequired,
  }

  static defaultProps = {
    handleDelete: () => {},
  }

  populateStudents = () =>
    this.props.students.map(student => (
      <tr key={uuidv4()}>
        <td>{student.name}</td>
        <td>{student.username}</td>
        <td>{student.email}</td>
        <td>{student.notes}</td>
        <td>{student.daysInactive}</td>
        <td>{student.newSubmissionsCount}</td>
        <td>
          <ButtonToolbar>
            <form method="POST">
              <Button
                bsStyle="danger"
                onClick={() => this.props.handleDelete(student._id)}
              >
                Delete
              </Button>
            </form>
          </ButtonToolbar>
        </td>
      </tr>
    ))

  showTable() {
    return (
      <table className="students table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Notes</th>
            <th>Days Inactive</th>
            <th>New Submissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{this.populateStudents()}</tbody>
      </table>
    )
  }

  render() {
    const isStudentListEmpty = !this.props.studentLength
    return (
      <div className="ClassTable">
        {isStudentListEmpty ? (
          <div className="container has-no-students">
            <h1>This classroom is empty</h1>
          </div>
        ) : (
          this.showTable()
        )}
      </div>
    )
  }
}
