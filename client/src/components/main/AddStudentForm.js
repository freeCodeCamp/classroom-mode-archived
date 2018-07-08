import React, { Component } from 'react'
import {
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert
} from 'react-bootstrap'
import axios from 'axios'
import './AddStudentForm.css'

const uuidv4 = require('uuid/v4')

const DEFAULT_STATE = {
  showModal: false,
  name: '',
  username: '',
  email: '',
  notes: '',
  errors: [],
}

export default class AddStudentForm extends Component {
  state = DEFAULT_STATE

  close = () => {
    this.setState({ showModal: false })
  }

  open = () => {
    this.setState({ showModal: true })
  }

  submit = () => {
    console.log('submit')
    const { email, notes } = this.state
    return axios
      .post('/students', {
        email,
        notes,
      })
      .then(res => {
        this._fetchStudentsFromParent()
        this.setState({ showModal: !this.state.showModal })
      })
      .catch(e => {
        const { errors } = e.response.data
        this.setState({ errors })
      })
  }

  _fetchStudentsFromParent() {
    this.props.fetchStudentsFromParent()
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  clearErrors = () => this.setState({ errors: [] })

  renderStudentCount() {
    let message
    if (this.props.studentLength > 1) {
      message = `${this.props.studentLength} students`
    } else {
      message = `${this.props.studentLength} student`
    }
    return <div id="student-count">{message}</div>
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
          {this.state.errors &&
            this.state.errors.map(error => (
              <Alert bsStyle="danger" key={error} onDismiss={this.clearErrors}>
                {error}
              </Alert>
            ))
          }
            <form>
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
    )
  }
}
