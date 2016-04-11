import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {reset} from 'redux-form';
import {clearCurrent} from '../actions/currentActions';
import {updateLocation, updateGeolocationSupport} from '../actions/locationActions';
import {set_max_distance, updateRestaurant} from '../actions/restaurantActions';

import DefaultLayout from './../components/DefaultLayout';
import NoSupport from './../components/GetLocation/NoSupport';
import LocationStatus from './../components/GetLocation/LocationStatus';
import RestaurantStatus from './../components/GetLocation/RestaurantStatus';
import GetLocationButton from './../components/GetLocation/GetLocationButton';
import GetLocationBanner from './../components/GetLocation/GetLocationBanner';
import DistanceMilesForm from './../components/GetLocation/DistanceMilesForm';

export class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.isFetching = this.isFetching.bind(this);
    this.locationFound = this.locationFound.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.navigateToResult = this.navigateToResult.bind(this);
  }

  componentWillMount() {
    this.props.clearCurrent();
    this.props.updateGeolocationSupport();
  }

  isFetching() {
    return (this.props.isFetchingLocation || this.props.isFetchingRestaurant);
  }

  locationFound() {
    return (this.props.latitude && this.props.longitude) !== null;
  }

  handleSubmit() {
    this.refs.distanceMilesForm.submit();
  }

  onSubmit(data) {
    var meters = Number(data.miles) * 1609.34;
    this.props.set_max_distance(meters);
    this.props.updateLocation()
      .then(this.props.updateRestaurant)
      .then(this.navigateToResult);
  }

  navigateToResult() {
    browserHistory.push('/result/' + this.props.locationDetails.get('place_id'));
  }

  render() {
    if (this.props.geolocation_support) {
      return (<div className="get-location">
          <DefaultLayout>
            <GetLocationBanner />
            <DistanceMilesForm
              ref="distanceMilesForm"
              onSubmit={this.onSubmit}
              initialValues={{ miles: 1 }}
            />
            <GetLocationButton
              isFetching={this.isFetching()}
              locationFound={this.locationFound()}
              handleSubmit={this.handleSubmit}
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
      return <NoSupport />
    }
  }
}

function mapStateToProps(state) {
  return {
    geolocation_support: state.getIn(['currentLocation', 'geolocation_support']),
    isFetchingLocation: state.getIn(['currentLocation', 'isFetching']),
    latitude: state.getIn(['currentLocation', 'latitude']),
    longitude: state.getIn(['currentLocation', 'longitude']),
    locationError: state.getIn(['currentLocation', 'error']),
    isFetchingRestaurant: state.getIn(['currentRestaurant', 'isFetching']),
    locationDetails: state.getIn(['currentRestaurant', 'locationDetails']),
    restaurantError: state.getIn(['currentRestaurant', 'error'])
  };
}

function mapDispatchToProps() {
  return {
    clearCurrent: clearCurrent,
    set_max_distance: set_max_distance,
    updateLocation: updateLocation,
    updateRestaurant: updateRestaurant,
    updateGeolocationSupport: updateGeolocationSupport
  }
}

export const GetLocationContainer = connect(mapStateToProps, mapDispatchToProps())(GetLocation);
