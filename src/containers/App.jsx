import React from 'react';
import {connect} from 'react-redux';

export const App = React.createClass({
  render: function() {
    return this.props.children;
  }
});

function mapStateToProps(state) {
  return state;
}

export const AppContainer = connect(mapStateToProps)(App);
