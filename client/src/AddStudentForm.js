import React, { Component } from 'react';
import { Button,
         Modal,
         FormGroup,
         FromControl,
         ControlLabel,
         FormControl } from 'react-bootstrap';


class AddStudentForm extends Component {
  constructor(props){
    super(props); 
    this.state = { showModal: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  submit() {
    fetch('/add_student', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: this.state.name
      })
    })
  }
  
  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
        <div className="AddStudentForm">
            <Button bsSize="large" active onClick={this.open}>Add Student</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                <FormGroup controlId="name">
                  <ControlLabel>Name: </ControlLabel>
                  <FormControl type="text"
                               value={this.state.value}
                               onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="user-name">
                  <ControlLabel>FCC Username: </ControlLabel>
                  <FormControl type="text"/>
                </FormGroup>
                <FormGroup controlId="email">
                  <ControlLabel>Email: </ControlLabel>
                  <FormControl type="email"/>
                </FormGroup>
                <FormGroup controlId="notes">
                  <ControlLabel>Notes: </ControlLabel>
                  <FormControl type="text"/>
                </FormGroup>
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