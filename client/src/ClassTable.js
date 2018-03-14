import React, { Component } from 'react';
import StudentRow from './StudentRow';
import Errors from './Errors';

class ClassTable extends Component {

  populateStudents() {
    let rows = [];
    this.props.students.forEach((student, index) => {
      rows.push((
        <StudentRow key={index}
            name={student.name}
            username={student.username}
            email={student.email}
            notes={student.notes}
            daysInactive={student.daysInactive}
        />
      ));
    });

    return rows;
  }

  showTable() {
    return (
      <table className="students table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Notes</th>
              <th>Days Inactive</th>
            </tr>
          </thead>
          <tbody>
            {this.populateStudents()}
          </tbody>
        </table>
      );
  }

  render() {
    const isStudentListEmpty = this.props.students.length === 0;
    return (
      <div className="ClassTable">
        {isStudentListEmpty ? <Errors errors={this.props.errors} /> : this.showTable() }
      </div>
    );
  }
}

export default ClassTable;