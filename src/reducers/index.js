import {combineReducers} from 'redux-immutable';
import { fromJS } from 'immutable';

import {currentLocation} from './currentLocation';
import {currentRestaurant} from './currentRestaurant';
import {routerReducer} from './routerReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  currentLocation,
  currentRestaurant,
  form: (state, action) => fromJS(formReducer(state, action))
})
