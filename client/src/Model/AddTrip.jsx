import React from 'react'
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AddTrip({visible , onClose}) {

 

  const handleOnClose = ()=> onClose()

  
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const {currentEmploye} = useSelector((state)=>state.employe)
  
  // const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };


  //linking our api to send req to the server
  const handleSubmit = async(e)=>{
    
    setLoading(true);
    e.preventDefault();
    try{
      //making a request to the server
      const res = await fetch('/api/trip/create',{
        method:'POSt',
        headers:{'content-type':'application/json',},
        body:JSON.stringify({...formData,issued_by:currentEmploye.firstName})
      }
      );
      //getting response from the server
      const data =  await res.json();
      // console.log(data)

      //if response is false, show the error message to the client
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return
      }

      //if response is True, register and navigate to the sign in page
      setLoading(false);
      setError(null)
      // navigate('/dashbord/employes')
      handleOnClose()

    }catch(error){
      setLoading(false);
      setError(error.message);

    } 
  }
  if(!visible) return null;
  return (

    <div className='fixed inset-0 bg-black bg-opacity-30
    backdrop-blur-sm flex justify-center items-center'>
        
        <div className=' bg-white flex flex-col font-primay p-20  max-w-lg mx-auto  bg-whit gap-4 rounded'>  

            {/* <h3>Create Employe</h3> */}

            <form className='flex flex-col w-80' onSubmit={handleSubmit}>

              <div className='flex flex-col gap-4'>

                  <label className='text-1xl font-semibold'>Trip name</label>
                  <input type="text" placeholder="sky team name" id='name' className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'> transport</label>
                  <input type="text" placeholder="transport" id='transport' 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'> tax</label>
                  <input type="text" placeholder="tax" id='tax' 
                  className='border p-3 rounded-lg' required onChange={handleChange}

                  />

                  <label className='text-1xl font-semibold'>Trip payment</label>
                    <input type="text" placeholder="sky team name" id='trip_payment' className='border p-3 rounded-lg'
                    required onChange={handleChange}
                    />


                  <div className='flex justify-between items-center'>
                      
                    <button onClick={handleOnClose} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                    type="button"> cancel
                    </button>

                    <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                    > {loading? 'submiting...':'Submit'}
                    </button>

                  </div>

              </div>

            </form>

            {error && <p className='text-red-500 mt-5'>{error}</p>}
        
        </div>  
        
    </div>
  )
}

export default AddTrip