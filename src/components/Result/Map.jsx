import React from 'react';

export default React.createClass({
  mapSrcUrl: function() {
    return "https://www.google.com/maps/embed/v1/place?" +
        "key=" + GOOGLE_API_KEY + "&" +
        "q=place_id:" + this.props.place_id
  },
  render: function() {
    return (<iframe
      width="450"
      height="250"
      frameBorder="0"
      src={this.mapSrcUrl()}
      ></iframe>);
  }
});

