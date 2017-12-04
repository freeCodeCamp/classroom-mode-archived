import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


class AddStudentForm extends Component {
  constructor(props){
    super(props); 
    this.state = { showModal: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  submit() {
    console.log(this)
    console.log('submit');
  }

  render() {
    return (
        <div className="AddStudentForm">
            <Button bsSize="large" active onClick={this.open}>Button</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                    <label for="name">Name: </label>
                    <input id="name" type="text" />   
                    <br/>
                    <label for="user-name">FCC username: </label>
                    <input id="user-name" type="text" />
                    <br/>
                    <label for="email">Email: </label>
                    <input id="email" type="email" />
                    <br/>
                    <label for="notes">Notes: </label>
                    <input id="notes" type="text" /> 
                    <br/>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.submit}>Submit</Button>
                </form>
              </Modal.Body>
            </Modal>
        </div>
    );
  }
}

export default AddStudentForm;