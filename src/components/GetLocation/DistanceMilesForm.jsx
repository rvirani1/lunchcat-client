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
          <div className="col-md-8 col-md-offset-2">
            <label className="margin-right">Maximum Distance</label>
            <input type="number" min="0" className="margin-right" max={max_dist} {...miles} />
            <label className="label label-danger block">{miles.touched && miles.error && <div>{miles.error}</div>}</label>
          </div>
        </div>
      </form>
    )
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
