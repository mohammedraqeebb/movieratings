import React, { useState } from 'react';
import './signin.styles.scss';
import Forminput from '../form-input/form-input.component';
import useRequest from '../../hooks/use-request';
import Button from '../button/button.component';
import { signin } from '../../features/user/user-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const defaultFormFields = {
  email: '',
  password: '',
};

const Signin = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const dispatch = useDispatch();
  const { email, password } = formFields;
  const navigate = useNavigate();
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/signin',
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
    <div className="signin_wrapper">
      <form onSubmit={handleSubmit}>
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

export default Signin;
