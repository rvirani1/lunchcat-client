import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {currentLocation} from '../../src/reducers/currentLocation';

describe('currentLocation reducer', function() {
  it('should return an initial state when not given one', function() {
    const action = {};
    const nextState = currentLocation(undefined, action);

    expect(nextState).to.equal(fromJS({
      didInvalidate: null,
      error: null,
      geolocation_support: null,
      isFetching: null,
      latitude: null,
      longitude: null
    }))
  });
});
