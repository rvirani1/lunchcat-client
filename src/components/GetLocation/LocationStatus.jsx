import React, {Component, PropTypes} from 'react';

export default class LocationStatus extends Component {
  constructor(props) {
    super(props);

    this.status = this.status.bind(this);
  }

  status() {
    if (this.props.isFetching) {
      return "Acquiring Location";
    } else if (this.props.latitude && this.props.longitude) {
      return "Found Location";
    } else if (this.props.error) {
      return "Location Error: " + this.props.error;
    } else {
      return "";
    }
  }

  render() {
    return (<div className="location-status">
      <p className="center-text">{this.status()}</p>
    </div>)
  }
}

LocationStatus.propTypes = {
  isFetching: PropTypes.bool,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  error: PropTypes.string
};
