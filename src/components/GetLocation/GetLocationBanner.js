import React, { Component } from 'react';
import Logo from '../Logo';

export default class GetLocationBanner extends Component {
  render() {
    return (<div className="get-location-banner">
      <div className="row">
        <div className="col-xs-4 col-xs-offset-4">
          <Logo />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="text-center logo-font text-4em">LunchCat</h1>
          </div>
        </div>
      </div>
      <p className="center-text">Can't pick a place to eat?</p>
      <p className="center-text">Want to try out a new restaurant?</p>
    </div>);
  }
}
