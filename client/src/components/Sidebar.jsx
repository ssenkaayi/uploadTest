import React from 'react'
import { sidebarMenu } from './sidebarMenu'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (

    <div 

        className='sticky sidebar flex flex-col h-sidebar text-white
        w-hover transition-sidebar bg-regal-violet
        p-sidebar-padding overflow-hidden  hover:w-hover'>

        <div className='flex h-logo p-logo'></div>

        <ul  

            className='flex flex-col h-menu 
            list-none p-0 relative '>

            <li 
                className='transition-li 
                text-sm 
            bg-menu p-4 m-li rounded-lg w-full'>

                <Link 
                className=' flex items-center
                text-sm gap-1.5' > Dashbord </Link>

            </li>    
            
            {sidebarMenu.map((item,index)=>{

                return(

                    <li 
                    className='transition-li p-4 m-li  
                    rounded-lg hover:bg-menu' key={index} >

                        <Link 
                        className='flex items-center
                        text-sm gap-1.5' to={item.url}>
                    
                            <i className={item.icon}/>
            
                            {item.title}
        
                        </Link>

                    </li>    

                )
            })}

            <li 
                className='transition-li
                text-sm left-0 absolute bottom-0
                hover:bg-menu p-4 m-li rounded-lg w-full'>

                <Link 
                className=' flex items-center
                text-sm gap-1.5' > <i className="fa-solid fa-right-to-bracket"/> Logout  </Link>

            </li>

        </ul>

    </div>

    
  )
}

export default Sidebar