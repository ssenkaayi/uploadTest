import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import { Outlet } from 'react-router-dom'



function Dashbord() {

  return (
    
    <div className='flex font-primary'>

      <Sidebar/>
      
      <div className='relative bg-base w-full p-4'>

        <Navbar/>
        <Outlet/>

      </div>

      


    </div>
   
  )
}

export default Dashbord