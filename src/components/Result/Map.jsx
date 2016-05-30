import React, {Component, PropTypes} from 'react';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.mapSrcUrl = this.mapSrcUrl.bind(this);
  }

  mapSrcUrl() {
    return "https://www.google.com/maps/embed/v1/place?" +
        "key=" + GOOGLE_API_KEY + "&" +
        "q=place_id:" + this.props.place_id
  }

  render() {
    return (<iframe
      className="center-margin"
      width="100%"
      height="300px"
      frameBorder="0"
      src={this.mapSrcUrl()}
      ></iframe>);
  }
}

Map.propTypes = {
  place_id: PropTypes.string.isRequired
};
