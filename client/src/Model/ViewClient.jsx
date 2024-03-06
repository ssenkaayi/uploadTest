import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { paymentTable } from '../components/TableHeading'

function ViewClient({visible , onClose , client_id}) {

  if(!visible) return null;

  const handleOnClose = ()=> onClose()

  
//   const [formData,setFormData]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState([]) 
  
  const navigate = useNavigate();

  const handlePrint =()=>{
    window.print()
  }

  console.log(client_id)


  useEffect(()=>{

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
       
        setClientsDetails(data)

        // setFilteredClients(data)

        // console.log(data)
      }
  
      catch(error){
        setError(error.message)
        setLoading(false)
  
    }
  }

    fetchClients()

    
},[])




  
  // max-w-lg mx-auto lg:max-w-xl lg:mx-auto


  return (

    <div className='fixed inset-0 bg-black bg-opacity-30
    backdrop-blur-sm flex justify-center h-100vh' >
        
        <div className=' bg-white flex flex-col font-primay p-20 bg-whit gap-4 rounded'>  

            <div className='flex gap-4 items-center justify-center mb-5'>

                <h3 className='text-4xl font-bold uppercase'>{clientsDetails.name}'s Invoice</h3> 

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
                <h2 className='text-2xl gap-4 mb-4'>{clientsDetails.name}</h2>
                <p>Clients Address</p>
            </div>

            <div>
                <p className='flex gap-4'><span>Invoice Number:</span><span>{clientsDetails._id}</span></p >
                <p className='flex gap-4'><span>Invoice Date:</span><span>{clientsDetails.createdAt}</span></p >
                <p className='flex gap-4'><span>Invoice Weight:</span><span>{clientsDetails.weight}</span></p >
                <p className='flex gap-4'><span>Invoice Supplier:</span><span>{clientsDetails.supplier_name}</span></p >
            </div>

            <div>
                
                clients finacial statement

                {/* {clientsDetails.name}
                {clientsDetails.weight} */}

            </div>

            <div className=' w-full mt-record'>

              <table className=' w-full border-collapse' >

                  <thead  className='bg-regal-violet text-white'>

                      <tr>

                        {paymentTable.map((item,index)=>{

                            return(     
                            <th className='p-4 text-left ' key={index}>{item}</th>

                            )
                        })}

                          <th className='p-4 text-left '>Action</th>
                      </tr>

                  </thead>

              </table>

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