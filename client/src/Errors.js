import React, { Component } from "react";

class Errors extends Component {
  render() {
    return (
      <div className="errors">
        {this.props.errors.map(function(error, i) {
          return <div key={i}>{error}</div>;
        })}
      </div>
    );
  }
}

export default Errors;
