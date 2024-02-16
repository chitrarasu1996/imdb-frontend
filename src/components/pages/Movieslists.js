import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { getAllMoviesLists } from '../../service/APIcalls'
import { MdEdit } from "react-icons/md";
import toast from 'react-hot-toast'
import { mycontext } from '../../App'

const Movieslists = () => {
  const {searchMovies}=useContext(mycontext)
  const navigate = useNavigate()
  const [allMovies, setAllMovies] = useState([])
  const [token,setToken]=useState("")

useEffect(()=>{
  if(searchMovies.length>0){
    findMovieBaesdOnSearch()
  }else{
getAllMovies()
  }
},[searchMovies])


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
    return () => {
      toast.dismiss();
    };
  }, []);

  useEffect(() => {

const data=localStorage.getItem("token")
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
    <div className='all-movies-list p-2 text-white'>
      <div>
        {allMovies.length > 0 ? (
          <div className='movie-container ps-3'>
            {allMovies.map((movie, i) => (
              <div key={i} style={{backgroundColor:"#1A1A1A"}} className='movie-card '>
                <div style={{fontWeight:"500"}}>
            <div > <span className='titleFont'>MovieName :</span> <span className='moviesDetails'>{movie.movieName}</span>  </div>  
                </div>
                <div>
              <div><span className='titleFont'> Year of Release :</span>  <span className='moviesDetails'>{movie.yearOfRelease}</span> </div>
                </div>
                <div >
                 <span className='titleFont'>actors :</span> 
                 <div className='single-movie-actors'>
  {movie.actors.map((actor, i) => (
    <div key={i} className='actor-name'>
      {actor.actorsName}
    </div>
  ))}
</div>
                </div>
                <div>Producer : <span className='moviesDetails'>{movie.producer.producerName.substring(0,11)}</span></div>
                <div className=' button-container pe-2'>
                  {token?
                <Link style={{textDecoration:"none"}} className='d-flex gap-2' to={`/editmovie-details/${movie._id}`}><button className='btn mb-2 hidden' style={{backgroundColor:"#E2B616",width:"100%"}}> <span> <MdEdit size={25}/></span>  <span >Edit</span></button></Link>  
                  :<div>
                 <Link to={"/login"}><button className='btn p-1 mb-1' style={{backgroundColor:"#E2B616"}}> login to edit the details</button> </Link>
                    </div>}
                </div>
              </div>
            ))}
        
         
          </div>
        ) 
        
        : (
          <div>
            <h2>There are no movies</h2>
          </div>
        )}
        
      </div>
    </div>
  </Layout>
  )
}

export default Movieslists