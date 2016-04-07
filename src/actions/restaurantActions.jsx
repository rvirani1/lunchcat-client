import $ from 'jquery';
import { browserHistory } from 'react-router';

export const REQUEST_RESTAURANT = 'REQUEST_RESTAURANT';
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_RESTAURANT_ERROR = 'RECEIVE_RESTAURANT_ERROR';
export const CLEAR_RESTAURANT = 'CLEAR_RESTAURANT';


export function updateRestaurant(lat, long) {
  return function(dispatch, getState) {
    dispatch(requestRestaurant());

    $script.ready('google_loader', function() {
      var state = getState();
      var user_loc = new google.maps.LatLng(state.currentLocation.latitude, state.currentLocation.longitude);
      var request = {
        location: user_loc,
        radius: '800',
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

export function clearRestaurant() {
  return {
    type: CLEAR_RESTAURANT
  }
}

