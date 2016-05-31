import React, {Component, PropTypes} from 'react';

export default class RestaurantStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="restaurant-status">
      {(() => {
        if (this.props.error) {
          return <div className="alert alert-danger">
            <h4 className="text-center">
              Error:
              {this.props.error}
            </h4>
          </div>
        } else if (this.props.isFetching) {
          return <div className="alert alert-info">
            <h4 className="text-center">Finding Restaurants</h4>
          </div>;
        } else {
          return "";
        }
      })()}
    </div>)
  }
}

RestaurantStatus.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string
};
