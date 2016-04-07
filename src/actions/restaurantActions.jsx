import $ from 'jquery';

export const REQUEST_RESTAURANT = 'REQUEST_RESTAURANT';
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_RESTAURANT_ERROR = 'RECEIVE_RESTAURANT_ERROR';
export const CLEAR_RESTAURANT = 'CLEAR_RESTAURANT';

function google_random_restaurant(lat, long) {
  return new Promise(function(resolve, reject) {
    $script.ready('google_loader', function() {
      var user_loc = new google.maps.LatLng(lat, long);
      var request = {
        location: user_loc,
        radius: '800',
        types: ['restaurant']
      };
      var map = new google.maps.Map(document.getElementById('hidden'), {}); // Required by Google JS Library
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var result = results[Math.floor(Math.random() * results.length)];
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  });
}

export function updateRestaurant() {
  return function(dispatch, getState) {
    dispatch(requestRestaurant());
    var lat = getState().currentLocation.latitude;
    var long = getState().currentLocation.longitude;
    return google_random_restaurant(lat, long)
      .then(function(result) {
        dispatch(receiveRestaurant(result));
      }, function(error) {
        dispatch(receiveRestaurantError(error));
      })
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

function google_specific_restaurant(place_id) {
  return new Promise(function(resolve, reject) {
    $script.ready('google_loader', function() {
      var request = {
        placeId: place_id
      };
      var map = new google.maps.Map(document.getElementById('hidden'), {}); // Quirk in Google JS Library
      var service = new google.maps.places.PlacesService(map);
      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(status);
        }
      })
    });

  });
}

export function updateRestaurantDetails(place_id) {
  return function(dispatch) {
    dispatch(requestRestaurant());
    return google_specific_restaurant(place_id).then(
      result => { dispatch(receiveRestaurant(result)) },
      error => { dispatch(receiveRestaurantError(error)) }
    );
  }
}

export function clearRestaurant() {
  return {
    type: CLEAR_RESTAURANT
  }
}

