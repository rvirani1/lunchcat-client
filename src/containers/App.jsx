import React, {Component} from 'react';
import {connect} from 'react-redux';

export class App extends Component {
  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return state;
}

export const AppContainer = connect(mapStateToProps)(App);
