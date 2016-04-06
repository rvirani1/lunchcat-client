import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {AppContainer} from './components/App';
import {ResultContainer} from './components/Result';
import {GetLocationContainer} from './components/GetLocation';
import NoMatch from './components/NoMatch';
import { clearCurrent } from './actions';

// Assets
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootswatch/spacelab/bootstrap.min.css');

require("script!../node_modules/jquery/dist/jquery.min");
require("script!../node_modules/bootstrap/dist/js/bootstrap.min");
require("script!../node_modules/scriptjs/dist/script.min.js");
$script(['https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&libraries=places'], 'google_loader');


const store = configureStore({
  rejectedRestaurants: [],
  currentLocation: {
    geolocation_support: null,
    isFetching: null,
    error: null,
    didInvalidate: null,
    longitude: null,
    latitude: null
  },
  currentRestaurant: {
    isFetching: false,
    error: null,
    locationDetails: {}
  }
});

function goToIndex(_nextState, _replace) {
  store.dispatch(clearCurrent())
}

const routes =
  <Route path="/" component={AppContainer}>
    <IndexRoute component={GetLocationContainer} onEnter={goToIndex}/>
    <Route path="/result/:place_id" component={ResultContainer} />
    <Route path="*" component={NoMatch}/>
  </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);