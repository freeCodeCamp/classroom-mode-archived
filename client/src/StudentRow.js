import React from 'react';

const StudentRow = (props) => {
  let { name, username, email, notes, daysInactive, newSubmissionsCount } = props;
  
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

export default StudentRow;