import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/employe/employeSlice';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {

  const[employData,setEmployData] = useState({})
  const {loading,error} = useSelector((state)=>state.employe);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmployeData = (e)=>{

  setEmployData(

    {...employData,
      [e.target.id]:e.target.value,})

      // console.log(employData)
  }

  //linking our api to send req to the server
  const handleSubmit = async(e)=>{

    
  
    e.preventDefault();

    try{

      dispatch(signInStart())
      //making a request to the server
      const res = await fetch('/api/auth/loginEmploye',{

        method:'POSt',
        headers:{'content-type':'application/json',},
        body:JSON.stringify(employData)

      }
      );
      //getting response from the server
      const data =  await res.json();

      // if response is false, show the error message to the client

      if(data.success===false){
        dispatch(signInFailure(data.message));
        return
      }

      //if response is True, register and navigate to the sign in page
      
      dispatch(signInSuccess(data));
      navigate('/dashbord')

    }catch(error){
      dispatch(signInFailure(error.message))
      
    } 
  }


//bg-base flex justify-center items-center
  return (

    <div className='bg-base min-h-screen justify-center items-center flex'>


      <div className='w-login-w'>


        <form onSubmit={handleSubmit} className='flex flex-col font-primay bg-white text-regal-violet p-3 gap-y-4 '  >

          <h3 className='text-3xl text-center font-semibold self-center mt-6 my-5'> MARIS CARGO LIMITED</h3>

          <div className='flex flex-col justify-center item-center'>

            < FaUser  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

            <h1 className='self-center mt-2'>Login</h1>           

          </div>

          <label className=''>Email</label>

          <div className='relative w-full h-1/2 '>
            <input type="email" placeholder="Enter email" id='email' className='outline-none w-full border p-3 rounded-lg'
            required onChange={handleEmployeData}
            />
            {/* <FaUser/> */}

          </div>


          
          <label className=''>Password</label>

          <div className='relative w-full h-1/2 '>  

            <input type="password" placeholder="Enter Password" id='password' 
            className='right-5 w-full border p-3 rounded-lg outline-none' required 
            onChange={handleEmployeData}/>
            {/* <FaLock className='absolute '/> */}

          </div>

          <div className='w-full mb-6 mt-4'>

            <button className=' bg-regal-violet text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'
            type="submit" disabled={loading} > {loading? 'loading...':'Login'}
            </button>

          </div>


          {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}

        </form>

      </div>

    </div>

    
  )
}
