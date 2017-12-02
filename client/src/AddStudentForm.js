import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AddStudentForm extends Component {
  render() {
    return (
        <div className="AddStudentForm">
            <Button bsSize="large" active>Button</Button>
            <form>
                <input type="text" />
                <input type="submit" />
            </form>
        </div>
    );
  }
}

export default AddStudentForm;