import React, {Component, PropTypes} from 'react';

export default class ResultError extends Component {
  render() {
    return (<div className="result-error">
      <h1>Error retreiving details</h1>
      <p>{this.props.error}</p>
    </div>)
  }
}
