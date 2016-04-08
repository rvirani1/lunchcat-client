import React, { Component } from 'react';
import {IndexLink} from 'react-router';

import Map from './Map';

export default class ResultDetails extends Component {
  render() {
    return (<div className="result-details">
      <h2 className="center-text">{this.props.name}</h2>
      <Map place_id={this.props.place_id}></Map>
      <p className="center-text">{this.props.vicinity}</p>
      <IndexLink to="/">
        <button className="center-margin">Back</button>
      </IndexLink>
    </div>)
  }
}
