import React, { useState } from 'react';
import './signup.styles.scss';
import Forminput from '../form-input/form-input.component';
import useRequest from '../../hooks/use-request';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin } from '../../features/user/user-slice';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
};

const Signup = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, name } = formFields;
  const dispatch = useDispatch();
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/signup',
    body: formFields,
    method: 'post',
    onSuccess: (data) => {
      dispatch(signin(data.user));
      navigate(-1);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await doRequest();
  };
  return (
    <div className="signup_wrapper">
      <form onSubmit={handleSubmit}>
        <Forminput
          type="text"
          required
          label="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Forminput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <Forminput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="errors">{errors}</div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Signup;
