import { useEffect } from 'react';
import './signout.styles.scss';
import useRequest from '../../hooks/use-request';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../features/user/user-slice';
const Signout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/signout',
    method: 'put',
    onSuccess: () => {
      dispatch(signout());
      navigate(-1);
    },
  });
  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div class="signout-container">
      <h2>you are being signed out</h2>
    </div>
  );
};

export default Signout;
