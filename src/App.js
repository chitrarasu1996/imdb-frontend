
import { Routes ,Route, Router} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Addmovies from './components/pages/Addmovies';
import Movieslists from './components/pages/Movieslists';
import Editmovies from './components/pages/Editmovies';
import { createContext, useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import SingleMovie from './components/pages/SingleMovie';

export const mycontext=createContext()


function App() {
  const  [token,setToken]=useState(localStorage.getItem("token"))
const [searchMovies,setSearchMovies]=useState("")
  return (
    <div className="App">
      <mycontext.Provider value={{token,setToken,searchMovies,setSearchMovies}}>
      <Routes>
  <Route path='/' element={<Movieslists/>}/>
    <Route path='/register' element={<Register/>}/>
 <Route path='/singleMovieDetails/:movieId' element={<SingleMovie/>}/>
    <Route path='/sidebar' element={<Sidebar/>}/>
    <Route path='/addmovies' element={<Addmovies/>}/>
  
    <Route path='/login' element={<Login/>}/>

<Route path='/editmovie-details/:movieid' element={<Editmovies/>}/>
    </Routes>
    </mycontext.Provider>
    </div>
  );
}

export default App;
