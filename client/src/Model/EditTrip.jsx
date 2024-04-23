import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function EditTrip({visible , onClose , trip_id}) {

 if(!visible) return null;

  const handleOnClose = ()=> onClose()

  

  const [tripData,setTripData] = useState({})
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const {currentEmploye} = useSelector((state)=>state.employe)

  const [formData,setFormData] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e)=>{

    if(e.target.type === 'number' || e.target.type === 'text'){
        setFormData({...formData,
        [e.target.id]:e.target.value })
    }
     
  };

  useEffect(()=>{


    fetchTrip()

  },[trip_id])

  const fetchTrip = async()=>{

    try{
  
      setLoading(true);
      const res = await fetch(`/api/trip/getTrip/${trip_id}`,{
        
        method:'GET',
      
      })
  
      const data = await res.json();
    
      if(data.succuss===false){
        setError(true)
        setLoading(false)
        return
      }
      
      setError(false)
      setLoading(false)
    //   console.log(data)
      setFormData(data)
    }
    catch(error){
      setError(error.message)
      setLoading(false)
  
    }
  }


  //linking our api to send req to the server
  const handleSubmit = async(e)=>{
    
    setLoading(true);
    e.preventDefault();
    try{
      //making a request to the server
      const res = await fetch(`/api/trip/update/${trip_id}`,{
        method:'put',
        headers:{
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify(formData)
      }
      );
      //getting response from the server
      const data =  await res.json();
      console.log(data)

      //if response is false, show the error message to the client
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return
      }

      //if response is True, register and navigate to the sign in page
      setLoading(false);
      setError(null)
      navigate('/trips')
      handleOnClose()


    }catch(error){
      setLoading(false);
      setError(error.message);

    } 
  }
  
  return (

    <div className='fixed inset-0 bg-black bg-opacity-30
    backdrop-blur-sm flex justify-center items-center'>
        
        <div className=' bg-white flex flex-col font-primay p-20  max-w-lg mx-auto  bg-whit gap-4 rounded'>  

            <h3>Edit Trip</h3>

            <form className='flex flex-col w-80' onSubmit={handleSubmit}>

              <div className='flex flex-col gap-4'>

                  <label className='text-1xl font-semibold'>Trip name</label>
                  <input type="text" placeholder="sky team name" id='name' value={formData.name} className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'> transport</label>
                  <input type="Number" placeholder="transport" id='transport' value={formData.transport} 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'> tax</label>
                  <input type="Number" placeholder="tax" id='tax' value={formData.tax} 
                  className='border p-3 rounded-lg' required onChange={handleChange}

                  />

                  <label className='text-1xl font-semibold'>Trip payment</label>
                    <input type="Number" placeholder="sky team name" id='trip_payment' value={formData.trip_payment}  
                    className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'>Market fees</label>
                    <input type="Number" placeholder="sky team name" id='market_fees' value={formData.market_fees} className='border p-3 rounded-lg'
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

export default EditTrip