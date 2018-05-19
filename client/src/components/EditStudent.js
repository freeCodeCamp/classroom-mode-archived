import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
  ButtonGroup,
  Alert,
} from 'react-bootstrap'
import axios from 'axios'

export default class EditStudent extends Component {
  static propTypes = {
    onSuccessfulSubmission: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object,
  }

  static defaultProps = {
    isOpen: false,
    student: {},
  }

  state = { isSubmitting: false, student: {} }

  static getDerivedStateFromProps = nextProps =>
    nextProps.student ? { student: nextProps.student } : null

  clearErrors = () => this.setState({ errors: [] })

  submit = () => {
    const { onSuccessfulSubmission } = this.props

    this.setState({ isSubmitting: true })
    axios
      .put('/students', this.state.student)
      .then(res => onSuccessfulSubmission(res.data))
      .catch(e => {
        const { errors } = e.response.data
        this.setState({ errors })
      })
      .then(() => this.setState({ isSubmitting: false }))
  }

  handleInputChange = event => {
    const {
      target: { name, value },
    } = event

    this.setState({
      student: { ...this.state.student, [name]: value },
    })
  }

  render() {
    const { isOpen, onClose, student = {} } = this.props
    return (
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="PUT">
            <FormGroup controlId="name">
              <ControlLabel>Name: </ControlLabel>
              <FormControl
                type="text"
                name="name"
                defaultValue={student.name}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="username">
              <ControlLabel>FCC Username: </ControlLabel>
              <FormControl
                type="text"
                name="username"
                defaultValue={student.username}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="email">
              <ControlLabel>Email: </ControlLabel>
              <FormControl
                type="email"
                name="email"
                defaultValue={student.email}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="Notes">
              <ControlLabel>Notes: </ControlLabel>
              <FormControl
                type="text"
                name="notes"
                defaultValue={student.notes}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <ButtonGroup>
              <Button disabled={this.state.isSubmitting} onClick={onClose}>
                Close
              </Button>
              <Button
                className="submit"
                disabled={this.state.isSubmitting}
                onClick={this.submit}
              >
                Submit
              </Button>
            </ButtonGroup>
          </form>
          {this.state.errors &&
            this.state.errors.map(error => (
              <Alert bsStyle="danger" key={error} onDismiss={this.clearErrors}>
                {error}
              </Alert>
            ))}
        </Modal.Body>
      </Modal>
    )
  }
}
