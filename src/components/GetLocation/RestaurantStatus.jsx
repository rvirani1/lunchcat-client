import React, {Component, PropTypes} from 'react';

export default class RestaurantStatus extends Component {
  constructor(props) {
    super(props);

    this.status = this.status.bind(this);
  }

  status() {
    if (this.props.error) {
      return "Restaurant Error: " + this.props.error;
    } else if (this.props.isFetching) {
      return "Finding Restaurants";
    } else {
      return "";
    }
  }

  render() {
    return (<div className="restaurant-status">
      <p className="center-text">{this.status()}</p>
    </div>)
  }
}

RestaurantStatus.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string
};
