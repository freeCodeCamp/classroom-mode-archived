import React, { Component } from 'react';
import StudentRow from './StudentRow';

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
        <StudentRow name={student.name}
             username={student.username}
             email={student.email}
             notes={student.notes}
        />
      ));
    });

    return rows;
  }

  render() {
    return (
      <div className="ClassTable">
        <div className="errors">
          {this.state.errors.map(function(error, i) {
            return <div key={i}>{error}</div>;
          })}
        </div>
        <table className="students table text-center">
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Notes</th>
          </tr>
          {this.populateStudents()}
        </table>
      </div>
    );
  }
}

export default ClassTable;