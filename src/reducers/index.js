import { combineReducers } from 'redux';
import { currentLocation } from './currentLocation';
import { currentRestaurant} from './currentRestaurant';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  currentLocation,
  currentRestaurant,
  routing: routerReducer
})
