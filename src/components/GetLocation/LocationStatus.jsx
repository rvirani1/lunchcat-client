import React from 'react';

export default React.createClass({
  status: function() {
    if (this.props.isFetching) {
      return "Acquiring Location";
    } else if (this.props.latitude && this.props.longitude) {
      return "Found Location";
    } else if (this.props.error) {
      return "Location Error: " + this.props.error;
    } else {
      return "";
    }
  },
render: function() {
    return (<div className="location-status">
      <p className="center-text">{this.status()}</p>
    </div>)
  }
});
