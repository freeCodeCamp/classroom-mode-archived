import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StudentRow from '../main/StudentRow'

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
      <StudentRow
        studentId={student._id}
        key={uuidv4()}
        name={student.name}
        username={student.username}
        email={student.email}
        notes={student.notes}
        daysInactive={student.daysInactive}
        handleDelete={this.props.handleDelete}
        newSubmissionsCount={student.newSubmissionsCount}
      />
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
    const isStudentListEmpty = this.props.students && this.props.students.length === 0
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
