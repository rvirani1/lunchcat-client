import Immutable, {Map} from 'immutable';
const initialState = Immutable.fromJS({
  geolocation_support: null,
  isFetching: null,
  error: null,
  didInvalidate: null,
  longitude: null,
  latitude: null
});

export function currentLocation(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_GEOLOCATION_SUPPORT':
      return state.set('geolocation_support', action.support);
    case 'REQUEST_LOCATION':
      return state.merge({
        latitude: null,
        longitude: null,
        error: null,
        isFetching: true
      });
    case 'RECEIVE_LOCATION':
      return state.merge({
        isFetching: null,
        error: null,
        latitude: action.lat,
        longitude: action.long
      });
    case 'RECEIVE_LOCATION_ERROR':
      return state.merge({
        isFetching: null,
        latitude: null,
        longtidue: null,
        error: null
      });
    case 'CLEAR_CURRENT':
      return state.merge(initialState);
  }
  return state;
}
