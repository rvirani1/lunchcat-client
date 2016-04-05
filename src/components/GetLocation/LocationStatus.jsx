import React from 'react';

export default React.createClass({
  render: function() {
    if (this.props.isFetching) {
      return <p>Acquiring Location</p>;
    } else if (this.props.latitude && this.props.longitude) {
      return <p>Found Location</p>;
    } else if (this.props.error) {
      return <p>Location Error: {this.props.error}</p>;
    } else {
      return <p></p>
    }
  }
});