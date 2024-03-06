import React from 'react'
import { sidebarMenu } from './sidebarMenu'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { signOutFailure,signOutStart,signOutSuccess } from '../redux/employe/employeSlice';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async()=>{

        console.log('sign out')

        try{

            dispatch(signOutStart())
            const res = await fetch('/api/employe/logoutEmploye');
            const data = await res.json();

            if(data.success===false){
            dispatch(signOutFailure(error.message));
            return
            }

            dispatch(signOutSuccess(data))
            navigate('/login')

        }catch(error){
            dispatch(signOutFailure(error.message))
        }
    }
      

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
              
                <button className="flex items-center text-sm gap-1.5 fa-solid fa-right-to-bracket" onClick={handleSignOut}> Logout </button>

            </li>

        </ul>

    </div>

    
  )
}

export default Sidebar