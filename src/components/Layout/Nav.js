import React, { useContext } from 'react'
import { Input } from "reactstrap"
import { IoIosSearch } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { IoMdHome } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

import { mycontext } from '../../App'
const Nav = () => {
  const navigate = useNavigate();
  const { searchMovies, setSearchMovies, token, setToken } = useContext(mycontext)


  const logout = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/")
      setToken("")

    } else {
      navigate("/login")
    }


  }
  return (
    <div>
      <div className='nav-wrapper d-flex justify-content-between ps-4 pe-3 align-items-center'>
        <div style={{ width: "60vw" }} className='d-flex justify-content-between align-items-center'>
        <Link to={"/"} style={{color:"white",textDecoration:"none"}}> <div className='imdb-tittle me-1'>IMDb</div></Link> 
          <Link to={"/"}><button   className=' btn button-hover text-white'>< IoMdHome color='white' size={25} /></button></Link>
          <div style={{ width: "60%", backgroundColor: "white" }} className='d-flex align-items-center gap-2 me-2'>
            <Input value={searchMovies} onChange={(e) => setSearchMovies(e.target.value)} placeholder="search movies" style={{ border: "none" }} />
            <span className='text-white'>  <IoIosSearch size={"30px"} className='pe-2' color='#ACACAC' /></span>
          </div>

        </div>
        <Link to={"/addmovies"} style={{ color: "white", cursor: "pointer" }}><button className='btn button-hover text-white '><IoIosAddCircleOutline size={20} /><span className='ms-1'>Add Movies</span></button></Link>
        <div className='d-flex justify-content-between'>

          <div><button onClick={logout} className='button-hover btn text-white ' >{token ? "Logout" : "Login"}</button> </div>
          <Link to={"/register"}><button className=' button-hover btn text-white'>SignIn</button></Link>
        </div>

      </div>

    </div>
  )
}

export default Nav