import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import { Outlet } from 'react-router-dom'


// hover:w-hover
function LayOut() {

  return (
    
    <div className='flex font-primary bg-base'>

      <div className='flex w-60 '>
        <Sidebar/>
      </div>
      
      <div className='flex-1 p-4 right-0 gap-4'>

        <div className='flex h-20 mb-4'>

          <Navbar/>

        </div>

        <Outlet/>

      </div>

      


    </div>
   
  )
}

export default LayOut