import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Login from '../pages/Login';
import  { Toaster } from 'react-hot-toast';
const Layout = (props) => {
  return (
    <div>
      <Toaster/>
      <div>
        <Nav />
      </div>
      <div className='row sidebarAndMoviesDetails'> 
        <div className='col-md-3 col-sm-3'><Sidebar /></div>
<div className='col-md-9 col-sm-9 '  >{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
