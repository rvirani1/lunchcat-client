import React, { Component } from 'react';

export default class DefaultLayout extends Component {
  render() {
    return (
      <div className="default-layout">
        <div className="col-md-3"></div>
        <div className="col-md-6">{this.props.children}</div>
        <div className="col-md-3"></div>
      </div>);
  }
}
