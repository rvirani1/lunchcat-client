import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class GetLocationButton extends Component {
  constructor(props) {
    super(props);
    this.buttonContents = this.buttonContents.bind(this);
    this.navigateToResult = this.navigateToResult.bind(this);
    this.getLocationAndRestaurant = this.getLocationAndRestaurant.bind(this);
  }

  buttonContents() {
    if (this.props.isFetching) {
      return <i className="fa fa-spinner fa-pulse"></i>
    } else {
      return <p>Get Location</p>
    }
  }

  navigateToResult() {
    browserHistory.push('/result/' + this.props.place_id);
  }

  getLocationAndRestaurant() {
    window.athing = this.props.updateLocation()
      .then(this.props.updateRestaurant)
      .then(this.navigateToResult);
  }

  render() {
    return (<div className="get-location-button">
      <button
        className="center-margin"
        onClick={this.getLocationAndRestaurant}
        disabled={this.props.locationFound} >
        {this.buttonContents()}
      </button>
    </div>);
  }
}

GetLocationButton.propTypes = {
  isFetching: PropTypes.bool,
  locationFound: PropTypes.bool,
  place_id: PropTypes.string,
  updateLocation: PropTypes.func.isRequired,
  updateRestaurant: PropTypes.func.isRequired
};
