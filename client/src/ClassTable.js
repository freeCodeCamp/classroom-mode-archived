import React, { Component } from 'react';
import StudentRow from './StudentRow';
import Errors from './Errors';

class ClassTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: [],
      students: []
    }
  }

  componentDidMount() {
    return fetch('/students')
      .then(function(res) {
        res.json().then(function(data){
          if(data.length === 0){
            this.setState({ errors: ["classroom is empty"] });
          } else {
            this.setState({ students: data });
          }
        }.bind(this));
      }.bind(this));
  }

  populateStudents() {
    let rows = [];
    this.state.students.forEach((student, index) => {
      rows.push((
        <StudentRow key={index}
            name={student.name}
            username={student.username}
            email={student.email}
            notes={student.notes}
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
            </tr>
          </thead>
          <tbody>
            {this.populateStudents()}
          </tbody>
        </table>
      );
  }

  render() {
    const isStudentListEmpty = this.state.students.length === 0;
    return (
      <div className="ClassTable">
        {isStudentListEmpty ? <Errors errors={this.state.errors} /> : this.showTable() }
      </div>
    );
  }
}

export default ClassTable;