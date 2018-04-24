import React from 'react'

const uuidv4 = require('uuid/v4')

const Errors = props => (
  <div className="errors">
    {props.errors.map(error => <div key={uuidv4()}>{error}</div>)}
  </div>
)

export default Errors
