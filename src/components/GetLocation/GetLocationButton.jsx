import React from 'react';

export default React.createClass({
  buttonContents: function() {
    if (this.props.isFetching) {
      return <i className="fa fa-spinner fa-pulse"></i>
    } else {
      return <p>Get Location</p>
    }
  },
  render: function() {
    return (<button
      className="get-location-button"
      onClick={this.props.updateLocation}
      disabled={this.props.locationFound}
    >
      {this.buttonContents()}
    </button>);
  }
});