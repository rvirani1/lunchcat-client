import React, {Component, PropTypes} from 'react';

export default class LocationStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="location-status">{(() => {
      if (this.props.isFetching) {
        return <div className="alert alert-info">
          <h4 className="center-text">Acquiring Location</h4>
        </div>;
      } else if (this.props.latitude && this.props.longitude) {
        return <div className="alert alert-success">
          <h4 className="center-text">Found Location</h4>
        </div>;
      } else if (this.props.error) {
        return <div className="alert alert-danger">
          <h4 className="center-text">Location Error</h4>
        </div>
      } else {
        return "";
      }
    })()}</div>)
  }
}

LocationStatus.propTypes = {
  isFetching: PropTypes.bool,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  error: PropTypes.string
};
