import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { getAllMoviesLists } from '../../service/APIcalls'

import toast from 'react-hot-toast'
import { mycontext } from '../../App'


const Movieslists = () => {
  const { searchMovies } = useContext(mycontext)
  const navigate = useNavigate()
  const [allMovies, setAllMovies] = useState([])
  const [token, setToken] = useState("")

  useEffect(() => {
    if (searchMovies.length > 0) {
      findMovieBaesdOnSearch()
    } else {
      getAllMovies()
    }
  }, [searchMovies])


  const findMovieBaesdOnSearch = () => {
    const copyOfMovies = [...allMovies];
    let filteredMovies;

    if (searchMovies.length > 0) {
      filteredMovies = copyOfMovies.filter((movie) =>
        movie.movieName.toLowerCase().startsWith(searchMovies.toLowerCase())
      );
    } else {
      filteredMovies = copyOfMovies;
    }

    setAllMovies(filteredMovies);
  };
  useEffect(() => {
    // Clear all toasts when the component unmounts

    toast.dismiss();

  }, []);

  useEffect(() => {
    const data = localStorage.getItem("token")
    setToken(data)

    getAllMovies()
  }, [])

  const getAllMovies = async () => {
    try {

      const res = await getAllMoviesLists()
      setAllMovies(res.data.allMovies)
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <Layout>
      <div className='all-movies-list ps-5 p-2 text-white'>
        <div>
          {allMovies.length > 0 ? (
            <div className='movie-container ps-4'>
              {allMovies.map((movie, i) => (

                <div key={i}>
                  <div>

                    <div className="card m-2" style={{ maxHeight: "300px", width: "10rem" }}>
                      <Link to={`singleMovieDetails/${movie._id}`} style={{ textDecoration: "none", color: "white" }}>
                        <img style={{ height: "200px" }} className="card-img-top" src={movie.image || ""} alt="movie image" />
                        <div style={{ backgroundColor: "black" }} className="card-body">
                          <h5 className="card-title">{movie.movieName.length > 9 ? `${movie.movieName.substring(0, 10)}...` : movie.movieName}</h5>
                          <p className="card-text">{movie.yearOfRelease}</p>

                        </div>
                      </Link>
                    </div>

                  </div>

                </div>

              ))}


            </div>
          )

            : (
              <div>
                <h2 className='text-center'>Loading...</h2>
              </div>
            )}

        </div>
      </div>
    </Layout>
  )
}

export default Movieslists