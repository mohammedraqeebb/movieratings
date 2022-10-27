import { useSelector } from 'react-redux';
import './navbar.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import './navbar.styles.scss';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const isSignedIn = user.isSignedIn;

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
