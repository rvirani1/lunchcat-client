import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
      applyMiddleware(thunk),
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
//     error: "", // string, only populated if there is an error
//     locationDetails: {
//       // details only populated on success
//     }
// };
