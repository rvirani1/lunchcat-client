import {updateRestaurant} from './restaurantActions.jsx';

export const UPDATE_GEOLOCATION_SUPPORT = 'UPDATE_GEOLOCATION_SUPPORT';
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const RECEIVE_LOCATION_ERROR = 'RECEIVE_LOCATION_ERROR';


export function updateGeolocationSupport() {
  // TODO: Refactor logic below
  var support;
  if (navigator.geolocation) {
    support = true;
  } else {
    support = false;
  }

  return {
    type: UPDATE_GEOLOCATION_SUPPORT,
    support
  }
}

// Related to Location

export function requestLocation() {
  return { type: REQUEST_LOCATION }
}

export function receiveLocation(lat, long) {
  return {
    type: RECEIVE_LOCATION,
    lat: lat,
    long: long
  }
}

export function receiveLocationError(msg) {
  return {
    type: RECEIVE_LOCATION_ERROR,
    msg: msg
  }
}

export function updateLocation() {
  return function(dispatch) {
    dispatch(requestLocation());
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // Success callback
        // update this to use promises instead
        dispatch(receiveLocation(position.coords.latitude, position.coords.longitude));
        dispatch(updateRestaurant());
      },
      function(msg) {
        // Error Callback
        dispatch(receiveLocationError(msg.message));
      }
    );
  };
}
