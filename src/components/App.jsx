import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';

export const App = React.createClass({
  render: function() {
    return this.props.children;
  }
});

function mapStateToProps(state) {
  return state;
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);