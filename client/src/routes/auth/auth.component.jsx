import { useState } from 'react';
import { FiX } from 'react-icons/fi';

import './auth.styles.scss';
import Signin from '../../components/signin/signin.component';
import Signup from '../../components/signup/signup.component';

import useRequest from '../../hooks/use-request';
import { useNavigate } from 'react-router-dom';

const formFields = {
  email: '',
  password: '',
};

const Auth = ({ currentUser }) => {
  const [signupShow, setSignupShow] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="auth_wrapper">
      <div className="auth_section" onClick={(e) => e.stopPropagation()}>
        <FiX onClick={() => navigate(-1)} className="close_icon" size={20} />

        <div>
          <div className="buttons">
            <button
              className={signupShow === true ? 'active_button' : null}
              onClick={() => setSignupShow(true)}
            >
              Sign up
            </button>
            <button
              className={signupShow === false ? 'active_button' : null}
              onClick={() => setSignupShow(false)}
            >
              Sign in
            </button>
          </div>
          {signupShow ? <Signup /> : <Signin />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
