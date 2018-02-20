import React, { Component } from 'react';

class StudentRow extends Component {
  render() {
    return(
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.username}</td>
        <td>{this.props.email}</td>
        <td>{this.props.notes}</td>
      </tr>
    );
  }
}

export default StudentRow;