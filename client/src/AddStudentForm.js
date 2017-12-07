import React, { Component } from 'react';
import { Button,
         Modal,
         FormGroup,
         ControlLabel,
         FormControl } from 'react-bootstrap';


class AddStudentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      name: '',
      username: '',
      email: '',
      notes: ''
    };
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
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        notes: this.state.notes
      })
    })
    .then(res => res.json())
    .then(function(data) {
        console.log(data); 
      });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
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
                                 name="name"
                                 value={this.state.name}
                                 onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup controlId="username">
                    <ControlLabel>FCC Username: </ControlLabel>
                    <FormControl type="text"
                                 name="username"
                                 value={this.state.username}
                                 onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup controlId="email">
                    <ControlLabel>Email: </ControlLabel>
                    <FormControl type="text"
                                 name="email"
                                 value={this.state.email}
                                 onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup controlId="Notes">
                    <ControlLabel>Notes: </ControlLabel>
                    <FormControl type="text"
                                 name="notes"
                                 value={this.state.notes}
                                 onChange={this.handleChange}/>
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