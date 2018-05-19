import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import './App.css'
import AddStudentForm from './AddStudentForm'
import NavBar from '../main/NavBar'
import MainContent from './MainContent'
import Home from '../home/Home'

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
        <MainContent>
          <Route
            to="/"
            render={() => (
              <Home
                students={this.state.students}
                errors={this.state.errors}
                handleDelete={this.handleDelete}
              />
            )}
          />
        </MainContent>
      </div>
    )
  }
}
