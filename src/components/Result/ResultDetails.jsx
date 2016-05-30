import React, {Component, PropTypes} from 'react';
import {IndexLink} from 'react-router';
import Logo from '../Logo';

import Map from './Map';

export default class ResultDetails extends Component {
  render() {
    return (<div className="result-details">
      <h2 className="center-text">{this.props.name}</h2>
      <Map place_id={this.props.place_id}></Map>
      <p className="center-text">{this.props.vicinity}</p>
      <p className="center-text">{this.props.rating}</p>
      <IndexLink to="/">
        <button className="center-margin">Back</button>
      </IndexLink>
    </div>)
  }
}

ResultDetails.propTypes = {
  name: PropTypes.string.isRequired,
  place_id: PropTypes.string.isRequired,
  vicinity: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};
