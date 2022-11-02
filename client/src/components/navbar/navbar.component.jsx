import { useSelector, useDispatch } from 'react-redux';
import './navbar.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import './navbar.styles.scss';
import useRequest from '../../hooks/use-request';
import { useEffect, memo } from 'react';
import { signin } from '../../features/user/user-slice';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isSignedIn = user.isSignedIn;
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/currentuser',
    method: 'post',
    body: {},
    onSuccess: (data) => {
      if (data.currentUser) {
        dispatch(signin(data.currentUser));
      }
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <>
      <div className="links_container">
        <Link to="/">
          <h2>IMDB</h2>
        </Link>
        {isSignedIn && (
          <ul className="signed_in_links_container">
            <Link to="/signout">
              <h2>Sign out</h2>
            </Link>
            <Link to="/movie">
              <h2>create movie</h2>
            </Link>
          </ul>
        )}
        {!isSignedIn && (
          <ul>
            <Link to="/auth">
              <h2>sign in</h2>
            </Link>
          </ul>
        )}
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
