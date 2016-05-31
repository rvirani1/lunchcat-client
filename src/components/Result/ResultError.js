import React, {Component, PropTypes} from 'react';

export default class ResultError extends Component {
  render() {
    return (<div className="result-error">
      <h1 className="text-center text-danger">Error retreiving details</h1>
      <p className="text-center text-danger">{this.props.error}</p>
      <a href="/">
        <button className="btn btn-default center">Home</button>
      </a>
    </div>)
  }
}
