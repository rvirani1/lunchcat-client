const initialState = {
  isFetching: null,
  error: null,
  didInvalidate: null,
  longitude: null,
  latitude: null
};

export function currentLocation(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_GEOLOCATION_SUPPORT':
      return Object.assign({}, state, {geolocation_support: action.support});
    case 'REQUEST_LOCATION':
      // TODO: Fix this with immutable library eventually or combined reducers
      var newState = Object.assign({}, state);
      newState.latitude = null;
      newState.longitude = null;
      newState.error = null;
      newState.isFetching = true;
      return Object.assign({}, state, newState);
    case 'RECEIVE_LOCATION':
      // TODO: Fix this with immutable library eventually or combined reducers
      var newState = Object.assign({}, state);
      newState.isFetching = null;
      newState.latitude = action.lat;
      newState.longitude = action.long;
      return Object.assign({}, state, newState);
    case 'RECEIVE_LOCATION_ERROR':
      // TODO: Fix this with immutable library eventually or combined reducers
      var newState = Object.assign({}, state);
      newState.isFetching = null;
      newState.latitude = null;
      newState.longitude = null;
      newState.error = action.msg;
      return Object.assign({}, state, newState);
  }
  return state;
}
