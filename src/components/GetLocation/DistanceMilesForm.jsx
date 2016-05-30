import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['miles'];
const max_dist = 10;

const validate = function(values) {
  const errors = {};
  if (values.miles > max_dist) {
    errors.miles = "Distance must be less than 10 miles"
  } else if (values.miles < 0) {
    errors.miles = "Distance cannot be less than 0"
  }
  return errors;
};

class DistanceMilesForm extends Component {
  render() {
    const { fields: { miles }} = this.props;
    return (
      <form>
        <div className="row text-center">
          <label className="label label-default">Maximum Distance</label>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            <div className="radio">
              <label className="block">
                <input type="radio" {...miles} value="1" checked={miles.value === '1'} />
                1 Mile
              </label>
              <label className="block">
                <input type="radio" {...miles} value="3" checked={miles.value === '3'} />
                3 Miles
              </label>
              <label className="block">
                <input type="radio" {...miles} value="5" checked={miles.value === '5'} />
                5 Miles
              </label>
            </div>
            <label className="label label-danger block">
              {miles.touched && miles.error && <div>{miles.error}</div>}
            </label>
          </div>
        </div>
      </form>)
  }
}

DistanceMilesForm.propTypes = {
  fields: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'distance_miles',
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
  validate
}, state => ({
  initialValues: {
    miles: 2
  }
}))(DistanceMilesForm)
