import { combineReducers } from 'redux';
import { currentLocation } from './currentLocation';
import { currentRestaurant} from './currentRestaurant';

export default combineReducers({
  currentLocation,
  currentRestaurant
})
