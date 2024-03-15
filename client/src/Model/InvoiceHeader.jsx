import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import EditClient from '../Model/EditClient'
// import handleViewClient from '../pages/Clients'

export default function InvoiceHeader({client_id}) {

  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState([]) 
  const [showEditClient,setShowEditClient] = useState(false)

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
      setClientsDetails(data)
      // setFilteredClients(data)
      // console.log(data)
    }
    catch(error){
      setError(error.message)
      setLoading(false)
  
    }
  }

  const handleEditUser =()=>{

    setShowEditClient(true)
  
  }

  const handleOnClose = ()=>{
      
    setShowEditClient(false)

  }


  return (
    <div className=''>
      {/* <ViewClient onClose={handleOnClose} visible={showViewClient} client_id={client_id}/> */}
      <EditClient onClose={handleOnClose} visible={showEditClient} client_id={client_id}/>

      <div className='flex justify-between'>

        <span className='text-2xl gap-2 mb-2'>{clientsDetails.name}'s invoice </span>
        <span onClick={handleEditUser} className='cursor-pointer  gap-2  mb-2'>Edit</span>

      </div>

      <div className='flex'>


        <h2 className=' gap-2 mb-2 justify-center'> <strong>From: Maris Cargo Limited</strong></h2>
  
      </div>

 

      <div className='flex gap-4'>

        <div className='flex flex-col'>

          <p>  Number: </p >
          <p>  Date:   </p >
          <p>  Weight: </p >
          <p>  Supplier: </p >
          {/* <p> Clients Address: </p> */}

        </div>

 

        <div className='flex flex-col'>

          <p>{clientsDetails._id}</p>
          <p>{clientsDetails.createdAt}</p>
          <p>{clientsDetails.weight}Kg</p>
          <p>{clientsDetails.supplier_name}</p>

        </div>
        
      </div>


    </div>
  )
}


