import React, { Component, PropTypes } from 'react';

export default class GetLocationButton extends Component {
  constructor(props) {
    super(props);

    this.buttonContents = this.buttonContents.bind(this);
  }

  buttonContents() {
    if (this.props.isFetching) {
      return <i className="fa fa-spinner fa-pulse"></i>
    } else {
      return <p>Get Location</p>
    }
  }


  render() {
    return (<div className="get-location-button">
      <button
        className="center-margin"
        onClick={this.props.handleSubmit}
        disabled={this.props.locationFound} >
        {this.buttonContents()}
      </button>
    </div>);
  }
}

GetLocationButton.propTypes = {
  isFetching: PropTypes.bool,
  locationFound: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
};
