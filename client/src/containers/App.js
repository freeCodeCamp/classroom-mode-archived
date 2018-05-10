import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import AddStudentForm from '../components/AddStudentForm'
import ClassTable from '../components/ClassTable'
import NavBar from '../components/NavBar'

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
      axios.delete(`/student/${studentId}`)
      console.log(this.state)
      this.setState(prevState => ({
        students: prevState.students.filter(
          student => student._id !== studentId
        ),
      }))
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <AddStudentForm
          studentLength={this.state.students.length}
          fetchStudentsFromParent={this.fetchStudentList}
        />
        <ClassTable
          handleDelete={this.handleDelete}
          students={this.state.students}
          errors={this.state.errors}
        />
      </div>
    )
  }
}
