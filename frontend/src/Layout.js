import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from './Components/Sidebar/Sidebar';
const Layout = ({data}) => {
  return (
    <div>
    <div className="container">
    <div className='row'>
    <div className="col-md-3">
   <Sidebar data={data}/>
  </div>
    <div className="col-md-9">
<Outlet/>
   <div>

   </div>
    </div>

   </div>
   </div>
 
    </div>
  )
}

export default Layout
