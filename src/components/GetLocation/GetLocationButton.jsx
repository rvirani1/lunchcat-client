import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
  buttonContents: function() {
    if (this.props.isFetching) {
      return <i className="fa fa-spinner fa-pulse"></i>
    } else {
      return <p>Get Location</p>
    }
  },
  navigateToResult: function() {
    browserHistory.push('/result/' + this.props.place_id);
  },
  getLocationAndRestaurant: function() {
    window.athing = this.props.updateLocation()
      .then(this.props.updateRestaurant)
      .then(this.navigateToResult);
  },
  render: function() {
    return (<div className="get-location-button">
      <button
        className="center-margin"
        onClick={this.getLocationAndRestaurant}
        disabled={this.props.locationFound} >
        {this.buttonContents()}
      </button>
    </div>);
  }
});
