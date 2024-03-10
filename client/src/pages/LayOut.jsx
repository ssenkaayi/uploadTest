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
      
      <div className='bg-base flex-1 p-4 '>

        <Navbar/>

        <Outlet/>

{/* 
        <div className='flex h-20 '>

          <Navbar/>

        </div>

        <div className='flex'>

          <Outlet/>

        </div> */}

        



      </div>

      


    </div>
   
  )
}

export default LayOut