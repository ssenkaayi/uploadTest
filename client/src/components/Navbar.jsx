import React from 'react'

function Navbar() {
  return (
    
    <div 

        className='flex justify-between items-center flex-wrap
        bg-white rounded-2x p-header mb-4 my-2 rounded-lg '>

        <div className='flex flex-col  text-dashbord '>
        
          <span className='test-xs'>Admin</span>
          <span className='text-2xl' >Dashbord</span>

        </div>

    
        <div className='flex items-center gap-1'>

          <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

            <svg svg="true"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-sm hover:trb">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>

            < input className='bg-transparent p-2' type='text' placeholder='search'/>
              
          </div>

            <img className='w-12 h-12 cursor-pointer rounded-full' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='avater'/>
        </div>


    </div>

  )
}

export default Navbar