import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import './App.css'
import AddStudentForm from './AddStudentForm'
import EditStudent from '../main/EditStudent'
import NavBar from '../main/NavBar'
import MainContent from './MainContent'
import ClassTable from '../home/ClassTable'

const DEFAULT_STATE = {
  students: [],
  errors: [],
  user_info: {},
}

export default class App extends Component {
  state = DEFAULT_STATE

  componentDidMount() {
    return this.fetchStudentList()
  }

  fetchStudentList = () => {
    axios.get('/students').then(students => {
      this.setState({ students: students.data })
    })
  }

  handleDelete = studentId => {
    try {
      axios.delete(`/students/${studentId}`)
      this.setState(prevState => ({
        students: prevState.students.filter(
          student => student._id !== studentId
        ),
      }))
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  handleEditClick = studentInfo => {
    this.setState({ isEditMode: true, editedStudent: studentInfo })
  }

  handleModalCloseClick = () =>
    this.setState({ isEditMode: false, editedStudent: {} })

  handleSuccessfulStudentEdit = newStudentInfo => {
    const newStudents = this.state.students.map(student => {
      if (newStudentInfo._id === student._id) {
        return { ...student, ...newStudentInfo }
      }
      return student
    })
    this.setState({ students: newStudents }, this.handleModalCloseClick)
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <AddStudentForm
          studentLength={this.state.students.length}
          fetchStudentsFromParent={this.fetchStudentList}
        />
        <EditStudent
          isOpen={this.state.isEditMode}
          onClose={this.handleModalCloseClick}
          onSuccessfulSubmission={this.handleSuccessfulStudentEdit}
          student={this.state.editedStudent}
        />
        <MainContent>
          <BrowserRouter>
            <Route
              to="/"
              render={() => (
                <ClassTable
                  students={this.state.students}
                  errors={this.state.errors}
                  handleDelete={this.handleDelete}
                  handleEditClick={this.handleEditClick}
                />
              )}
            />
          </BrowserRouter>
        </MainContent>
      </div>
    )
  }
}
