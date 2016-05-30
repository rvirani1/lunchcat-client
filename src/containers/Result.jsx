import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateRestaurantDetails} from '../actions/restaurantActions';

import DefaultLayout from './../components/DefaultLayout'
import ResultDetails from './../components/Result/ResultDetails';
import ResultSpinner from './../components/Result/ResultSpinner';
import ResultError from './../components/Result/ResultError';

export class Result extends Component {
  constructor(props) {
    super(props);

    this.haveMatchingLocation = this.haveMatchingLocation.bind(this);
  }

  haveMatchingLocation() {
    if (!this.props.place_id) {
      return false;
    }
    return this.props.place_id === this.props.params.place_id;
  }

  componentDidMount() {
    if (!this.haveMatchingLocation()) {
      this.props.updateRestaurantDetails(this.props.params.place_id);
    }
  }

  render() {
    return (<div className="result">
      <DefaultLayout>
        {(() => {
          if (this.haveMatchingLocation()) {
            return (<ResultDetails
              place_id={this.props.place_id}
              name={this.props.name}
              rating={this.props.rating}
            />);
          } else if (this.props.error) {
            return (<ResultError error={this.props.error}/>);
          } else {
            return (<ResultSpinner />);
          }
        })()}
      </DefaultLayout>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.getIn(['currentRestaurant', 'isFetching']),
    error: state.getIn(['currentRestaurant', 'error']),
    place_id: state.getIn(['currentRestaurant', 'locationDetails', 'place_id']),
    name: state.getIn(['currentRestaurant', 'locationDetails', 'name']),
    rating: state.getIn(['currentRestaurant', 'locationDetails', 'rating']),
  };
}

function mapDispatchToProps() {
  return {
    updateRestaurantDetails: updateRestaurantDetails
  }
}

export const ResultContainer = connect(mapStateToProps, mapDispatchToProps())(Result);
