import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import handleViewClient from '../pages/Clients'

export default function InvoiceHeader({client_id}) {

  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState([]) 

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

  return (
    <div>

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


    </div>
  )
}


