import './App.scss';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Auth from './routes/auth/auth.component';
import { useSelector } from 'react-redux';
import Home from './routes/home/home.component';
import Navbar from './components/navbar/navbar.component';
import Signout from './routes/signout/signout.component';
import MovieCreate from './routes/movie-create/movie-create.component';
import MovieDetails from './routes/movie-details/movie-details.component';
import MovieEdit from './routes/movie-edit/movie-edit.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/signout' element={<Signout />} />
        <Route path='/movie' element={<MovieCreate />} />
        <Route path='/movie/:movieId' element={<MovieDetails />} />
        <Route path='/movie/edit/:movieId' element={<MovieEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
