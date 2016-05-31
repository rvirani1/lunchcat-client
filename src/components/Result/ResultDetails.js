import React, {Component, PropTypes} from 'react';
import {IndexLink} from 'react-router';
import Logo from '../Logo';

import Map from './Map';

export default class ResultDetails extends Component {
  render() {
    return (<div className="result-details">
      <div className="row">
        <div className="col-xs-2 col-xs-offset-5">
          <Logo />
        </div>
      </div>
      <h1 className="logo-font text-center text-3em bottom-spacing">LunchCat picks</h1>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title center-text text-2em">{this.props.name}</h1>
        </div>
        <Map place_id={this.props.place_id}></Map>
      </div>
      <IndexLink to="/">
        <button className="btn btn-default center">Back</button>
      </IndexLink>
    </div>)
  }
}

ResultDetails.propTypes = {
  name: PropTypes.string.isRequired,
  place_id: PropTypes.string.isRequired,
};
