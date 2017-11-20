import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function DisplayUserInfo(props) {
     if (props.user_info.name) {
       return (
         <div> User is defined!!!! </div>
       ); 
     } else {
        return (
          <div> User is not loaded!!! </div>
        ); 
     }
}
  
class App extends Component {
  state = {user_info: {}};
  
  componentDidMount() {
    fetch('/users/utsab')
      .then(res => res.json())
      .then(function(user_info) {
        debugger
        this.setState({ user_info });
      }.bind(this));
  }
  
  

  render() {
    return (
      <div className="App">
        <h1>User Info</h1>
          <DisplayUserInfo user_info={this.state.user_info}/>
      </div>
    );
  }
}

export default App;
