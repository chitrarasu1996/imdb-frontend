import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { mycontext } from '../../App';

const Sidebar = () => {
  const {token,setToken} = useContext(mycontext);
  const [visible,setVisible]=useState(false)
  useEffect(() => {
if(!token){
  setVisible(false)
}else{
  setVisible(true)
}
  }, [token]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
    setTimeout(() => {
      toast.success("Logout successfully");
    }, 2000)
  
  };

  return (
    <div className='pe-5 ps-3 pt-2 sidebar'>
      <div className='sidebar-details'>
        <div className='d-flex'>
          <ul>
            {visible && (
              <>
                <li>
                  <button className='btn' onClick={logout}>
                    Logout
                  </button>
                </li>
                <hr />
              </>
            )}
            <li>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
                Movie lists
              </Link>
            </li>
            <hr />
            <li className='pt-2 pb-2'>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/addmovies"}
              >
                Add movies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
