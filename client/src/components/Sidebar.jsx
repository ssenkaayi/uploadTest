import React from 'react'
import { sidebarMenu } from './sidebarMenu'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { signOutFailure,signOutStart,signOutSuccess } from '../redux/employe/employeSlice';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import logo from '../assets/images/marislogo.jpeg'

function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async()=>{

        // console.log('sign out')

        try{

            dispatch(signOutStart())
            const res = await fetch('/api/auth/logoutEmploye');
            const data = await res.json();

            if(data.success===false){
            dispatch(signOutFailure(data.message));
            return
            }

            dispatch(signOutSuccess(data))
            navigate('/')

        }catch(error){
            dispatch(signOutFailure(error.message))
        }
    }
      
    // sidebar css overflow-hidden hover:w-hover  p-sidebar-padding fixed z-sidebar 

    return (

    <div className='flex flex-col h-sidebar w-60 p-sidebar-padding  text-white transition-sidebar fixed z-sidebar bg-regal-violet '>

        <div className='flex h-logo p-logo mb-4 my-2 '>

            {/* <img className='w-14 h-14 cursor-pointer rounded-full' src={logo} alt='avater'/> */}
        </div>

        <ul  

            className='flex flex-col h-menu 
            list-none p-0  '>
{/* 
            <li 
                className='transition-li 
                text-sm 
            bg-menu p-4 m-li rounded-lg w-full'>

                <Link 
                className=' flex items-center
                text-sm gap-1.5' > Dashbord </Link>

            </li>     */}
            
            {sidebarMenu.map((item,index)=>{

                return(

                    <li 
                    className='transition-li p-4 m-li  
                    rounded-lg hover:bg-menu w-full' key={index} >

                        <Link 
                        className='flex items-center
                        text-sm gap-1.5 w-full' to={item.url}>
                    
                            {item.icon}
            
                            {item.title}
        
                        </Link>

                    </li>    

                )
            })}

            <li 
                className='transition-li
                text-sm left-0 absolute bottom-0
                hover:bg-menu p-4 m-li rounded-lg w-full'> 
               
                <button className="flex items-center text-sm gap-1.5 fa-solid fa-right-to-bracket" onClick={handleSignOut}> <CiLogout />  Logout </button>

            </li>

        </ul>

    </div>

    
  )
}

export default Sidebar