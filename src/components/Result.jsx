import React from 'react';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import * as actionCreators from '../actions';

import Map from './Result/Map';

export const Result = React.createClass({
  haveMatchingLocation: function() {
    if (!this.props.place_id) {
      return false;
    };
    return this.props.place_id === this.props.params.place_id;
  },
  componentDidMount: function() {
    if (!this.haveMatchingLocation()) {
      this.props.updateRestaurantDetails(this.props.params.place_id);
    }
  },
  render: function() {
    if (this.haveMatchingLocation()) {
      return (
        <div className="result">
          <Map place_id={this.props.place_id}></Map>
          <IndexLink to="/" onClick={this.props.clearRestaurant}>Back</IndexLink>
        </div>);
    } else {
      return (<div>Retreiving Data</div>);
    }
  }
});

function mapStateToProps(state) {
  return {
    isFetching: state.currentRestaurant.isFetching,
    error: state.currentRestaurant.error,
    place_id: state.currentRestaurant.locationDetails.place_id,
    name: state.currentRestaurant.locationDetails.name,
    rating: state.currentRestaurant.locationDetails.rating,
    vicinity: state.currentRestaurant.locationDetails.vicinity
  };
}

export const ResultContainer = connect(mapStateToProps, actionCreators)(Result);
