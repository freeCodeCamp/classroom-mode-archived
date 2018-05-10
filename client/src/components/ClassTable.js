import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StudentRow from './StudentRow'

import './ClassTable.css'

const uuidv4 = require('uuid/v4')

export default class ClassTable extends Component {
  static propTypes = {
    students: PropTypes.array,
    handleDelete: PropTypes.func.isRequired,
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
    const isStudentListEmpty = !this.props.students.length
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
