
import React from 'react'
import { useState } from 'react';
import logo from '../assets/images/marislogo.jpeg'

function Navbar({searchBox}) {

  const [searchItem, setSearchItem] = useState('')



  const handleInputChange = (e) => { 

    // const searchTerm = ;
    setSearchItem(e.target.value)


  }

   searchBox = searchItem

  


  return (

    //z-index:header fixed
    
    <div 

        className='flex justify-between items-center flex-wrap 
        bg-white rounded-2x p-header mb-4 my-2 rounded-lg '>

        <div className='flex flex-col  text-dashbord '>
        
          <span className='test-xs'>Admin</span>
          <span className='text-2xl' >Dashbord</span>

        </div>

    
        <div className='flex items-center gap-1'>

          {/* <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

            < input className='bg-transparent p-2' type='text' placeholder='search' value={searchItem} onChange={handleInputChange} />
              
          </div> */}

          <img className='w-14 h-14 cursor-pointer rounded-full' src={logo} alt='avater'/>
        </div>


    </div>

  )
}

export default Navbar