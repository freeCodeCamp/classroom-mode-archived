import React, { Component } from 'react';

class ClassTable extends Component {
  componentDidMount() {
    fetch('/students');
  }

  render() {
    return (
      <div className="ClassTable">
      </div>
    );
  }
}

export default ClassTable;