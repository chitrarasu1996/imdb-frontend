import React, { useContext } from 'react'
import {Input} from "reactstrap"
import {IoIosSearch} from "react-icons/io"
import {Link} from "react-router-dom"
import { mycontext } from '../../App'
const Nav = () => {

  const {searchMovies,setSearchMovies}=useContext(mycontext)

  return (
    <div>
        <div className='nav-wrapper d-flex justify-content-between ps-4 pe-3 align-items-center'>
            <div style={{width:"60vw"}} className='d-flex justify-content-between align-items-center'>
            <div className='imdb-tittle'>IMDb</div>
        
            <div style={{width:"60%",backgroundColor:"white"}} className='d-flex align-items-center gap-2'>
                <Input value={searchMovies} onChange={(e)=>setSearchMovies(e.target.value)} placeholder="search movies"style={{border:"none"}}/>
                <span className='text-white'>  <IoIosSearch size={"30px"} className='pe-2' color='#ACACAC'/></span>
            </div>
        
            </div>
            <div className='d-flex justify-content-between'>
                <Link to={'/login'}><button  className='button-hover btn text-white ' >Login</button> </Link>
                <Link to={"/register"}><button className=' button-hover btn text-white'>SignIn</button></Link>
            </div>
         
        </div>
        
    </div>
  )
}

export default Nav