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
      notes: '',
      errors: []
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.isAlreadyAdded = this.isAlreadyAdded.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  isAlreadyAdded() {
    return fetch('/add_student/check', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
      })
    })
    .then(function(res) {
      if (res.status === 200) {
        this.close();
        this._fetchStudentsFromParent();
      } else {
        res.json().then(function(data) {
          this.setState({ errors: data.errors });

        }.bind(this));
      }
    }.bind(this));
  }

  submit() {
    return fetch('/add_student', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        notes: this.state.notes
      })
    })
    .then(function(res){
      if (res.status === 200) {
        this.close();
        this._fetchStudentsFromParent();
      } else {
        res.json().then(function(data){
          this.setState({ errors: data.errors });
        }.bind(this));
      }
    }.bind(this));
  }

  _fetchStudentsFromParent() {
    this.props.fetchStudentsFromParent();
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
            <Button className='open-modal'  bsSize="large" active onClick={this.open}>Add Student</Button>
            <Modal className='add-student-modal' show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  { this.state.errors.map(function(error, index){
                    return <li key={index}>{error}</li>;
                  })}
                </ul>
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
                                 onChange={this.handleChange}
                                 onBlur={this.isAlreadyAdded}/>
                  </FormGroup>
                  <FormGroup controlId="email">
                    <ControlLabel>Email: </ControlLabel>
                    <FormControl type="text"
                                 name="email"
                                 value={this.state.email}
                                 onChange={this.handleChange}
                                 onBlur={this.isAlreadyAdded}/>
                  </FormGroup>
                  <FormGroup controlId="Notes">
                    <ControlLabel>Notes: </ControlLabel>
                    <FormControl type="text"
                                 name="notes"
                                 value={this.state.notes}
                                 onChange={this.handleChange}/>
                  </FormGroup>
                  <Button onClick={this.close}>Close</Button>
                  <Button className="submit" onClick={this.submit}>Submit</Button>
                </form>
              </Modal.Body>
            </Modal>
        </div>
    );
  }
}

export default AddStudentForm;
