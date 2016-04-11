import Immutable, {Map} from 'immutable';

const initialState = Immutable.fromJS({
  isFetching: false,
  error: null,
  locationDetails: {}
});

export function currentRestaurant(state = initialState, action) {
  switch (action.type) {
    case 'SET_MAX_DISTANCE':
      return state.merge({
        max_distance: action.max_distance
      });
    case 'REQUEST_RESTAURANT':
      return state.merge({
        isFetching: true,
        error: null,
        locationDetails: Map()
      });
    case 'RECEIVE_RESTAURANT':
      return state.mergeDeep({
        isFetching: null,
        error: null,
        locationDetails: Map({
          place_id: action.place_id,
          name: action.name,
          photos: action.photos,
          rating: action.rating,
          vicinity: action.vicinity
        })
      });
    case 'RECEIVE_RESTAURANT_ERROR':
      return state.merge({
        isFetching: null,
        error: action.status,
        locationDetails: Map()
      });
    case 'CLEAR_RESTAURANT':
    case 'CLEAR_CURRENT':
      return state.merge(initialState);
  }
  return state;
}

