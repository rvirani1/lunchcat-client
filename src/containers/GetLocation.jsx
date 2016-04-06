import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actionCreators from '../actions';

import NoSupport from './../components/GetLocation/NoSupport';
import LocationStatus from './../components/GetLocation/LocationStatus';
import RestaurantStatus from './../components/GetLocation/RestaurantStatus';
import GetLocationButton from './../components/GetLocation/GetLocationButton';

export const GetLocation = React.createClass({
  componentWillMount: function() {
    this.props.updateGeolocationSupport();
  },
  isFetching: function() {
    return (this.props.isFetchingLocation || this.props.isFetchingRestaurant);
  },
  locationFound: function() {
    return (this.props.latitude && this.props.longitude) !== null;
  },
  render: function() {
    if (this.props.geolocation_support) {
      return (<div className="get-location">
          <GetLocationButton
            isFetching={this.isFetching()}
            locationFound={this.locationFound()}
            updateLocation={this.props.updateLocation}
          />
          <LocationStatus
            isFetching={this.props.isFetchingLocation}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            error={this.props.locationError}
          />
          <RestaurantStatus
            isFetching={this.props.isFetchingRestaurant}
            error={this.props.restaurantError}
          />
        </div>)
    } else {
      return <NoSupport></NoSupport>
    }
  }
});

// if (this.props.isFetchingLocation) {
//   return <p>Acquiring Location</p>
// } else if (this.props.latitude && this.props.longitude) {
//   if (this.props.locationDetails) {
//     return <p>Found Restaurant</p>;
//   } else if (this.props.restaurantError) {
//     return <p>Restaurant Error</p>;
//   } else {
//     return <p>Finding Restaurants</p>;
//   }
// } else if (this.props.locationError) {
//   return <p>Error: {this.props.locationError}</p>

function mapStateToProps(state) {
  return {
    geolocation_support: state.currentLocation.geolocation_support,
    isFetchingLocation: state.currentLocation.isFetching,
    latitude: state.currentLocation.latitude,
    longitude: state.currentLocation.longitude,
    locationError: state.currentLocation.error,
    isFetchingRestaurant: state.currentRestaurant.isFetching,
    locationDetails: state.currentRestaurant.locationDetails,
    restaurantError: state.currentRestaurant.error
  };
}

export const GetLocationContainer = connect(mapStateToProps, actionCreators)(GetLocation);
