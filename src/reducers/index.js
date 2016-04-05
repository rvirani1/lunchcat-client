import { combineReducers } from 'redux';
import { currentLocation } from './currentLocation';
import { currentRestaurant} from './currentRestaurant';
import { rejectedRestaurants } from './rejectedRestaurants';

export default combineReducers({
  currentLocation,
  currentRestaurant,
  rejectedRestaurants
})
