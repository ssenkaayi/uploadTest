import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function EditClient({visible , onClose, client_id}) {

  if(!visible) return null;

  // console.log(client_id)

  const handleOnClose = ()=> onClose()

  
  const [formData,setFormData]=useState({
    name:'',
    weight:0,
    description:'',
    number_pieces:0
  });

  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const navigate = useNavigate()

  const handleChange = (e)=>{

    if(e.target.type === 'number' || e.target.type === 'text'){
      setFormData({...formData,
      [e.target.id]:e.target.value })
    }
   
  };

  // console.log(formData)

  useEffect(()=>{


    fetchClients()

  },[client_id])

  const fetchClients = async()=>{

    try{
  
      setLoading(true);
      const res = await fetch(`/api/client/getClient/${client_id}`,{
        
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
      // console.log(data)
      setFormData(data)
    }
    catch(error){
      setError(error.message)
      setLoading(false)
  
    }
  }

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{
        setLoading(true)
        setError(false)

        const res =  await fetch(`/api/client/updateClient/${client_id}`,{
            method:'put',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify(formData)
        });

        const data = await res.json()
        setLoading(false);
        

        if(data.success === false){

            setError(data.message);
         
        }

        //if response is True, register and navigate to the sign in page
        setLoading(false);
        setError(null)
        // navigate('/')
        navigate(`/view_client/${client_id}`)
        handleOnClose()

    }catch(error){
        setError(error.message);
        setLoading(false);

    }

    navigate(`/view_client/${client_id}`)
}

  return (

    <div className='fixed inset-0 bg-black bg-opacity-30
    backdrop-blur-sm flex justify-center items-center'>
        
        <div className=' bg-white flex flex-col font-primay p-20  mx-auto  bg-whit gap-4 rounded'>  

            <h3 className='text-4xl text-center gap-4 mb-4'>Edit Clients Details</h3>

            <form className='flex gap-8 flex-col' onSubmit={handleSubmit}>

              <div className='flex gap-8' >

           

                <div className='flex flex-col gap-4 w-80'>

                  <label className='text-1xl font-semibold'>name</label>
                  <input type="text" placeholder="Enter Password" id='name' value={formData.name} 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />


                  <label className='text-1xl font-semibold'>weight</label>
                  <input type="text" placeholder="Enter Password" id='weight' value={formData.weight} 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'> description</label>
                  <input type="text" placeholder="description" id='description' value={formData.description} 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'> number_pieces</label>
                  <input type="text" placeholder="number_pieces" id='number_pieces' value={formData.number_pieces} 
                  className='border p-3 rounded-lg' required onChange={handleChange}
                  />

                </div>

                {/* <div className='flex flex-col gap-4 w-80'>

                  <label className='text-1xl font-semibold'>date</label>
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

                </div> */}

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