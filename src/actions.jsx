import $ from 'jquery';
import { browserHistory } from 'react-router';

// action types

export const UPDATE_GEOLOCATION_SUPPORT = 'UPDATE_GEOLOCATION_SUPPORT';
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const RECEIVE_LOCATION_ERROR = 'RECEIVE_LOCATION_ERROR';
export const REQUEST_RESTAURANT = 'REQUEST_RESTAURANT';
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_RESTAURANT_ERROR = 'RECEIVE_RESTAURANT_ERROR';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';

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
        dispatch(receiveLocation(position.coords.latitude, position.coords.longitude));
        dispatch(updateRestaurant(position.coords.latitude, position.coords.longitude));
      },
      function(msg) {
        // Error Callback
        dispatch(receiveLocationError(msg.message));
      }
    );
  };
}

// Restaurant Related
export function updateRestaurant(lat, long) {
  return function(dispatch) {
    dispatch(requestRestaurant());

    $script.ready('google_loader', function() {
      var user_loc = new google.maps.LatLng(lat, long);
      var request = {
        location: user_loc,
        radius: '2000',
        types: ['restaurant']
      };
      var map = new google.maps.Map(document.getElementById('hidden'), {});
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var result = results[Math.floor(Math.random() * results.length)];
          dispatch(receiveRestaurant(result));
          browserHistory.push('/result/' + result.place_id)
        } else {
          dispatch(receiveRestaurantError(status))
        }
      });
    });
  }
}

export function requestRestaurant() {
  return {
    type: REQUEST_RESTAURANT
  }
}

export function receiveRestaurant(result) {
  return {
    type: RECEIVE_RESTAURANT,
    place_id: result.place_id,
    name: result.name,
    photos: result.photos,
    rating: result.rating,
    vicinity: result.vicinity
  }
}

export function receiveRestaurantError(status) {
  return {
    type: RECEIVE_RESTAURANT_ERROR,
    status: status
  }
}

export function updateRestaurantDetails(place_id) {
  return function(dispatch) {
    dispatch(requestRestaurant());

    var request = {
      placeId: place_id
    };

    $script.ready('google_loader', function() {
      var map = new google.maps.Map(document.getElementById('hidden'), {});
      var service = new google.maps.places.PlacesService(map);
      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          dispatch(receiveRestaurant(place));
        } else {
          dispatch(receiveRestaurantError(status))
        }
      })
    });
  }
}

export function clearCurrent() {
  return {
    type: CLEAR_CURRENT
  }
}

