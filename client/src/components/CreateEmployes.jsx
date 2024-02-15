import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/employe/employeSlice';

export default function Login() {

  const[employData,setEmployData] = useState({})
  const {loading,error} = useSelector((state)=>state.employe);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmployeData = (e)=>{

  setEmployData(

    {...employData,
      [e.target.id]:e.target.value,})
  }

  //linking our api to send req to the server
  const handleSubmit = async(e)=>{
  
    e.preventDefault();

    try{
      dispatch(signInStart())
      //making a request to the server
      const res = await fetch('/api/users/loginUser',{

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
        return;
      }

      //if response is True, register and navigate to the sign in page
      
      
      
      dispatch(signInSuccess(data));
      navigate('/dashbord')

    }catch(error){
      dispatch(signInFailure(error.message))
      
    } 
  }



  return (



    
    <form className='font-primay p-3 flex max-w-lg mx-auto  bg-white text-regal-violet flex-col gap-4' >

        <h1 className='text-3xl text-center font-semibold '>Login</h1>


        <div className='flex flex-col gap-4'>

            <label className='text-1xl font-semibold'>Fast Name</label>
            <input type="email" placeholder="Enter email" id='email' className='border p-3 rounded-lg'
            required onChange={handleEmployeData}
            />

            <label className='text-1xl font-semibold'>Last Name</label>
            <input type="email" placeholder="Enter email" id='email' className='border p-3 rounded-lg'
            required onChange={handleEmployeData}
            />

            <label className='text-1xl font-semibold'>Email</label>
            <input type="email" placeholder="Enter email" id='email' className='border p-3 rounded-lg'
            required onChange={handleEmployeData}/>

            <label className='text-1xl font-semibold'>Phone Number</label>
            <input type="password" placeholder="Enter Password" id='password' 
            className='border p-3 rounded-lg' required 
            onChange={handleEmployeData}/>

            <label className='text-1xl font-semibold'>Address</label>
            <input type="email" placeholder="Enter email" id='email' className='border p-3 rounded-lg'
            required onChange={handleEmployeData}/>

            <label className='text-1xl font-semibold'>Password</label>
            <input type="email" placeholder="Enter email" id='email' className='border p-3 rounded-lg'
            required onChange={handleEmployeData}/>

            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                onClick={handleSubmit} type="submit" disabled={loading} > {loading? 'loading...':'Sign Up'}
            </button>


        </div>

        <div className='flex gap-2 mt-5'>
          
        </div>

        {error && <p className='text-red-500 mt-5'>{error}</p>}

    </form>



    
  )
}
