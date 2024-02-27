import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewClient({visible , onClose}) {

  if(!visible) return null;

  const handleOnClose = ()=> onClose()

  
  const[formData,setFormData]=useState({});
  const[loading,setLoading]=useState(false);
  const[error,setError]= useState(null);
  
  const navigate = useNavigate();

  const handlePrint =()=>{
    window.print()
  }


  
  // max-w-lg mx-auto 


  return (

    <div className='fixed inset-0 bg-black bg-opacity-30
    backdrop-blur-sm' >
        
        <div className=' bg-white h-full flex flex-col font-primay p-20 bg-whit gap-4 rounded'>  

            

            <div className='flex flex-col items-center justify-center mb-5'>

                <h3 className='text-2xl'>Clients Invoice</h3> 


                <ul className=' flex items-center justify-between flex-wrap'>
                    <li> <button onClick={handlePrint} className='btn btn-print'> Print  </button>  </li> 
                    <li> <button onClick={handlePrint} className='btn btn-download'> Download  </button> </li>
                    <li> <button onClick={handlePrint} className='btn btn-send'> Send </button> </li>
                </ul>

            </div>

            <div className='flex flex-col items-end justify-end'>
                <h2 className='text-2xl gap-4 mb-4'>Maris-Cargo-Limited</h2>
                <p>Company Address</p>
            </div>

            <div>
                <h2 className='text-2xl gap-4 mb-4'>Clients Name</h2>
                <p>Clients Address</p>
            </div>

            <div>
                <p>Invoice Number:</p >
                <p>Invoice Date:</p>
                <p>Invoice Weight:</p>
            </div>

            <div>
                clients finacial statement

            </div>

            <div className='flex justify-between items-center'>
                      
                <button onClick={handleOnClose} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                type="button"> cancel
                </button>

                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                > {loading? 'printing...':'print'}
                </button>

            </div>



            {error && <p className='text-red-500 mt-5'>{error}</p>}
        
        </div>  
        
    </div>
  )
}

export default ViewClient