import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import EditClient from '../Model/EditClient'
import { useNavigate } from 'react-router-dom';
// import handleViewClient from '../pages/Clients'

export default function InvoiceHeader({client_id}) {

  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState({}) 
  const [supplier,setSupplier] = useState({})
  const [showEditClient,setShowEditClient] = useState(false)
  const navigate = useNavigate();
  

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
      // console.log(data.supplier)
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

  const handleDeleteClient = async()=>{


    try{
  
      const res = await fetch(`/api/client/delete/${client_id}`,{
        method:"DELETE",
      })
  
      const data = await res.json();
  
      // console.log(data)
  
      if(data.success===false){
        console.log(data.message)
        setError(data.message)
        setLoading(false)
      }
  
      // setFilteredClients((prev)=>prev.filter((client)=>client._id!==button_id))
      navigate('/')
  
    }catch(error){
      console.log(error)
    }
  }


  return (

    <div className=''>
      {/* <ViewClient onClose={handleOnClose} visible={showViewClient} client_id={client_id}/> */}
      <EditClient onClose={handleOnClose} visible={showEditClient} client_id={client_id}/>

      <div className='flex justify-between'>

        <span className='text-2xl gap-2 mb-2'>clients's invoice </span>

        <div className='flex gap-4 '>

          <button onClick={handleEditUser} className='cursor-pointer  gap-2  mb-2'>Edit</button>
          <button onClick={handleDeleteClient} className='cursor-pointer  gap-2  mb-2'>Delete</button>

        </div>
        

      </div>

      <div className='flex'>


        <h2 className=' gap-2 mb-2 justify-center'> <strong>From: Maris Cargo Limited</strong></h2>
  
      </div>

 

      <div className='flex gap-4'>

        <div className='flex flex-col'>

          <p>  Id </p >
          <p>  Date   </p >
          <p>  Trip </p >
          <p>  name </p >
          <p>  Weight </p >
          <p>  Supplier </p >
          <p>  Description </p>
          <p>  Number of pieces </p>

        </div>

 

        <div className='flex flex-col'>
           {clientsDetails.createdAt!==undefined?
           <div>
            <p>{clientsDetails._id}</p>
            <p>{clientsDetails.createdAt.split("T", 1)}</p>
            <p>{clientsDetails.trip.name}</p>
            <p>{clientsDetails.name}</p>
            <p>{clientsDetails.weight}Kg</p>
            <p>{clientsDetails.supplier.supplier_name}</p>
            <p>{clientsDetails.description}</p>
            <p>{clientsDetails.number_pieces}</p>
          </div>:''}

        </div>
      </div>
    </div>
  )
}


