import React, { Component } from 'react'
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

  fetchStudentList() {
    return fetch('/students').then(res => {
      res.json().then(students => {
        if (students.length === 0) {
          this.setState({ errors: ['classroom is empty'] })
        } else {
          this.setState({ students })
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <AddStudentForm
          studentLength={this.state.students.length}
          fetchStudentsFromParent={this.fetchStudentList.bind(this)}
        />
        <ClassTable students={this.state.students} errors={this.state.errors} />
      </div>
    )
  }
}
