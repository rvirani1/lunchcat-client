import React from 'react';
import $ from 'jquery';

export default React.createClass({
  render: function() {
    if (this.props.error) {
      return <p>Restaurant Error: {this.props.error}</p>;
    } else if (this.props.isFetching) {
      return <p>Finding Restaurants</p>;
    } else {
      return <p></p>
    }
  }
});
