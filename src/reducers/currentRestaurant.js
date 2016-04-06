const initialState = {
  isFetching: false,
  error: null,
  locationDetails: {}
};

export function currentRestaurant(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_RESTAURANT':
      var newState = Object.assign({}, state);
      newState.isFetching = true;
      newState.error = null;
      newState.locationDetails = {};
      return Object.assign({}, state, newState);
    case 'RECEIVE_RESTAURANT':
      var newState = Object.assign({}, state);
      newState.isFetching = null;
      newState.error = null;
      newState.locationDetails = {
        place_id: action.place_id,
        name: action.name,
        photos: action.photos,
        rating: action.rating,
        vicinity: action.vicinity
      };
      return Object.assign({}, state, newState);
    case 'RECEIVE_RESTAURANT_ERROR':
      var newState = Object.assign({}, state);
      newState.isFetching = null;
      newState.error = action.status;
      newState.locationDetails = {};
      return Object.assign({}, state, newState);
    case 'CLEAR_CURRENT':
      return Object.assign({}, state, initialState);
  }
  return state;
}

