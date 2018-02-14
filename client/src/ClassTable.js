import React, { Component } from 'react';

class ClassTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    fetch('/students')
      .then(function(res) {
        res.json().then(function(data){
          if(data.length === 0){
            this.setState({ errors: ["classroom is empty"] });
          }
        }.bind(this));
      }.bind(this));
  }

  render() {
    return (
      <div className="ClassTable">
        <div className="error-class">

        </div>
      </div>
    );
  }
}

export default ClassTable;