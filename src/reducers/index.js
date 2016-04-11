import { combineReducers } from 'redux';
import { currentLocation } from './currentLocation';
import { currentRestaurant} from './currentRestaurant';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  currentLocation,
  currentRestaurant,
  routing: routerReducer,
  form: formReducer
})
