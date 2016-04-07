import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {updateLocation, updateGeolocationSupport} from '../actions/locationActions';
import {updateRestaurant} from '../actions/restaurantActions';

import DefaultLayout from './../components/default_layout';
import NoSupport from './../components/GetLocation/NoSupport';
import LocationStatus from './../components/GetLocation/LocationStatus';
import RestaurantStatus from './../components/GetLocation/RestaurantStatus';
import GetLocationButton from './../components/GetLocation/GetLocationButton';
import GetLocationBanner from './../components/GetLocation/GetLocationBanner';

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
          <DefaultLayout>
            <GetLocationBanner />
            <GetLocationButton
              isFetching={this.isFetching()}
              locationFound={this.locationFound()}
              updateLocation={this.props.updateLocation}
              updateRestaurant={this.props.updateRestaurant}
              place_id={this.props.locationDetails.place_id}
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
          </DefaultLayout>
        </div>)
    } else {
      return <NoSupport></NoSupport>
    }
  }
});

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

function mapDispatchToProps() {
  return {
    updateLocation: updateLocation,
    updateRestaurant: updateRestaurant,
    updateGeolocationSupport: updateGeolocationSupport
  }
}

export const GetLocationContainer = connect(mapStateToProps, mapDispatchToProps())(GetLocation);
