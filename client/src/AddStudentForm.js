import React, { Component } from "react";
import {
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import "./AddStudentForm.css";

const DEFAULT_STATE = {
  showModal: false,
  name: "",
  username: "",
  email: "",
  notes: "",
  errors: []
}

export default class AddStudentForm extends Component {
  state = DEFAULT_STATE;

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  submit = () => {
    const { name, username, email, notes } = this.state;

    return fetch("/add_student", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        email,
        notes
      })
    }).then(
      function(res) {
        if (res.status === 200) {
          this.close();
          this._fetchStudentsFromParent();
        } else {
          res.json().then(
            function(data) {
              this.setState({ errors: data.errors });
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  _fetchStudentsFromParent() {
    this.props.fetchStudentsFromParent();
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  renderStudentCount() {
    let message;
    if (this.props.studentLength > 1) {
      message = `${this.props.studentLength} students`;
    } else {
      message = `${this.props.studentLength} student`;
    }
    return <div id="student-count">{message}</div>;
  }

  render() {
    return (
      <div className="AddStudentForm">
        <div className="class-table-button-container">
          <Button
            className="open-modal"
            bsStyle="success"
            bsSize="large"
            active
            onClick={this.open}
          >
            Add Student
          </Button>
          {this.renderStudentCount()}
        </div>
        <Modal
          className="add-student-modal"
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {this.state.errors.map(function(error, index) {
                return <li key={index}>{error}</li>;
              })}
            </ul>
            <form>
              <FormGroup controlId="name">
                <ControlLabel>Name: </ControlLabel>
                <FormControl
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="username">
                <ControlLabel>FCC Username: </ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="email">
                <ControlLabel>Email: </ControlLabel>
                <FormControl
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="Notes">
                <ControlLabel>Notes: </ControlLabel>
                <FormControl
                  type="text"
                  name="notes"
                  value={this.state.notes}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button onClick={this.close}>Close</Button>
              <Button className="submit" onClick={this.submit}>
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

