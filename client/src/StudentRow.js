import React, { Component } from 'react';

export default class StudentRow extends Component {

  render() {
    let { name, username, email, notes, daysInactive, newSubmissionsCount } = this.props;

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
