import React, { Component } from 'react';

class AddStudentForm extends Component {
  render() {
    return (
        <div className="AddStudentForm">
            <form>
                <input type="text" />
                <input type="submit" />
            </form>
        </div>
    );
  }
}

export default AddStudentForm;