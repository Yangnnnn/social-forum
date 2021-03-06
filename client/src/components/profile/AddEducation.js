import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addEducation } from '../../actions/profile';
import setAlert from '../../actions/alert';
import { useDispatch } from 'react-redux';
import { removeAlert } from '../../actions/alert';
const AddEducation = ({ history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toToggle, setToToggle] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <h1 className='large text-primary'>Add An education history</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={async (e) => {
          e.preventDefault();
          const a = await addEducation(formData, history);
          if (a.errors) {
            a.errors.forEach((error) => {
              const alert = setAlert(error.msg, 'danger');
              dispatch(alert);
              setTimeout(() => {
                dispatch(removeAlert(alert.payload.id));
              }, 5000);
            });
            dispatch(a);
          } else {
            dispatch(a);
            const alert = setAlert('Experience added', 'success');
            dispatch(alert);
            setTimeout(() => {
              dispatch(removeAlert(alert.payload.id));
            }, 5000);
          }
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School'
            name='school'
            value={school}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            value={degree}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                setToToggle(!toToggle);
              }}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => {
              onChange(e);
            }}
            disabled={toToggle ? true : false}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Description'
            value={description}
            onChange={(e) => {
              onChange(e);
            }}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='/dashboard'>
          Go Back
        </a>
      </form>
    </>
  );
};

export default AddEducation;
