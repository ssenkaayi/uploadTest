import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AddPayment({visible , onClose, client_id}) {

  // console.log(client_id)

  const handleOnClose = ()=> onClose()


  const[formData,setFormData]=useState({});
  const[loading,setLoading]=useState(false);
  const[error,setError]= useState(null);
  const{currentEmploye} = useSelector((state)=>state.employe)


  const navigate = useNavigate();

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
    const res = await fetch(`/api/payment/create/${client_id}`,{
    method:'POSt',
    headers:{'content-type':'application/json',},
    body:JSON.stringify({...formData,issued_by:currentEmploye.firstName,})
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

    // //if response is True, register and navigate to the sign in page
    setLoading(false);
    setError(null)
    navigate('/')
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
        
        <div className=' bg-white flex flex-col font-primay p-20  mx-auto  bg-whit gap-4 rounded'>  

            <h3 className='text-4xl text-center gap-4 mb-4'>Make Payment</h3>

            <form className='flex gap-8 flex-col'onSubmit={handleSubmit} >

              <div className='flex gap-8' >

           

                <div className='flex flex-col gap-4 w-80'>

                  <label className='text-1xl font-semibold'>Reciept No</label>
                  <input type="text" placeholder="reciept no" id='reciept_no' className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'>Kg Rate</label>
                  <input type="text" placeholder="kg rate" id='kg_rate' className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                </div>

                <div className='flex flex-col gap-4 w-80'>

                  <label className='text-1xl font-semibold'>Dollar Rate</label>
                  <input type="text" placeholder="dollar rate" id='dollar_rate' className='border p-3 rounded-lg'
                  required onChange={handleChange}
                  />

                  <label className='text-1xl font-semibold'>Amount In Dollars</label>
                  <input type="text" placeholder="amount in dollars" id='amount' 
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

export default AddPayment