import React, { Component } from 'react'
import './ClassTable.css'
import StudentRow from './StudentRow'
import Errors from './Errors'

const uuid = require('uuid/v1')

export default class ClassTable extends Component {
  populateStudents = () =>
    this.props.students.map(student => (
      <StudentRow
        key={uuid()}
        name={student.name}
        username={student.username}
        email={student.email}
        notes={student.notes}
        daysInactive={student.daysInactive}
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
          </tr>
        </thead>
        <tbody>{this.populateStudents()}</tbody>
      </table>
    )
  }

  render() {
    const isStudentListEmpty = this.props.students.length === 0
    return (
      <div className="ClassTable">
        {isStudentListEmpty ? (
          <Errors errors={this.props.errors} />
        ) : (
          this.showTable()
        )}
      </div>
    )
  }
}
