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
      <div className='row'>
        <div className='col-sm-3 '><Sidebar /></div>
<div className='col-sm-9' style={{maxHeight:"400px"}} >{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
