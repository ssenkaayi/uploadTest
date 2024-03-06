import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditClient({visible , onClose, client_id}) {

  

  // console.log(client_id)

  const handleOnClose = ()=> onClose()

  
  const[formData,setFormData]=useState({});
  const[loading,setLoading]=useState(false);
  const[error,setError]= useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  if(!visible) return null;
  
  // max-w-lg mx-auto 


  return (

    <div className='fixed inset-0 bg-black bg-opacity-30
    backdrop-blur-sm flex justify-center items-center'>
        
        <div className=' bg-white flex flex-col font-primay p-20  mx-auto  bg-whit gap-4 rounded'>  

            <h3 className='text-4xl text-center gap-4 mb-4'>Edit Clients Details</h3>

            <form className='flex gap-8 flex-col' >

              <div className='flex gap-8' >

           

                <div className='flex flex-col gap-4 w-80'>

                  <label className='text-1xl font-semibold'>firstname</label>
                  <input type="text" placeholder="Enter email" id='firstName' className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'>lastname</label>
                  <input type="text" placeholder="Enter Password" id='lastName' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />


                  <label className='text-1xl font-semibold'>email</label>
                  <input type="text" placeholder="Enter Password" id='email' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />


                  <label className='text-1xl font-semibold'> address </label>
                  <input type="text" placeholder="Enter Password" id='address' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />


                </div>

                <div className='flex flex-col gap-4 w-80'>

                  <label className='text-1xl font-semibold'>Phone</label>
                  <input type="text" placeholder="Enter Password" id='phone' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />


                  <label className='text-1xl font-semibold'>role</label>
                  <input type="text" placeholder="Enter Password" id='role' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />


                  <label className='text-1xl font-semibold'>password</label>
                  <input type="password" placeholder="Enter Password" id='password' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                </div>

              </div>

              <div className='flex justify-between items-center'>
                      
                <button onClick={handleOnClose} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                type="button"> cancel
                </button>

                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                > {loading? 'submiting...':'Submit'}
                </button>

              </div>


            </form>

            {error && <p className='text-red-500 mt-5'>{error}</p>}
        
        </div>  
        
    </div>
  )
}

export default EditClient