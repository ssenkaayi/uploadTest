import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'


function Base() {

  return (
    
    <div className='relative bg-base w-full p-4'>

      <Navbar/>

      <Outlet/>
      
    </div>

  )
  
}

export default Base