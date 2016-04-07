import React from 'react';

export default React.createClass({
  status: function() {
    if (this.props.error) {
      return "Restaurant Error: " + this.props.error;
    } else if (this.props.isFetching) {
      return "Finding Restaurants";
    } else {
      return "";
    }
  },
  render: function() {
    return (<div className="restaurant-status">
      <p className="center-text">{this.status()}</p>
    </div>)
  }
});
