const initialState = {};

export function rejectedRestaurants(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REJECTED_RESTAURANT':
      return state;
  }
  return state
}
