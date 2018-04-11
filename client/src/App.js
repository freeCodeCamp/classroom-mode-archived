import React, { Component } from 'react';
import './App.css';
import AddStudentForm from './AddStudentForm';
import ClassTable from './ClassTable';
import NavBar from './NavBar';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      errors: [],
      user_info: {}
    };
  }

  componentDidMount() {
    return this.fetchStudentList();
  }

  fetchStudentList() {
    return fetch('/students')
      .then((res) => {
        res.json().then((data) => {
          if(data.length === 0){
            this.setState({ errors: ["classroom is empty"] });
          } else {
            this.setState({ students: data });
          }
        });
      });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <AddStudentForm fetchStudentsFromParent={this.fetchStudentList.bind(this)}/>
        <ClassTable students={this.state.students} errors={this.state.errors}/>
      </div>
    );
  }
}
export default App;
