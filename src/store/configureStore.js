import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers/index';

const logger = createLogger();

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store
}

// var storeStructure = {
//   currentLocation: {
//      geolocation_support: null
//      isFetching: null,
//      error: null
//      didInvalidate: null,
//      longitude: null,
//      latitude: null
//   },
//   currentRestaurant: {
//     isFetching: false, // boolean
//     max_distance: null //number in miles
//     error: "", // string, only populated if there is an error
//     locationDetails: {
//       // details only populated on success
//     }
// };
