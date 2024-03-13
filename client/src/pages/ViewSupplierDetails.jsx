import React from 'react'
import { useState } from 'react'
import { viewSupplierDetailsTable} from '../components/TableHeading'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import EditClient from '../Model/EditClient'
import AddClient from '../Model/AddClient'

export default function ViewSupplierDetails() {

  const params = useParams() 
  const supplier_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clients,setClients]=useState([]) 
  const navigate = useNavigate()
  const [supplier , setSupplier] = useState([])
  const [trip , setTrip] = useState({})
  const [showAddClient,setShowAddClient] = useState(false)
  const [showEditClient,setShowEditClient] = useState(false)
  const [client_id, setClient_id] = useState('')
    

  const handlePrint =()=>{
    window.print()
    }

    const goBackClient = ()=>{
    navigate(`/view_trip/${trip._id}`)
  }

  useEffect(()=>{


    fetchClients()
  
  },[supplier_id])
    
  const fetchClients = async()=>{
  
      try{
    
      setLoading(true);
      const res = await fetch(`/api/supplier/getSupplier/${supplier_id}`,{
        
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
      setClients(data.clients)
      setSupplier(data)
      setTrip(data.trip)
      // console.log(data)
    }
    catch(error){
      setError(error.message)
      setLoading(false)
  
    }
  }

  const handleViewClient = (id)=>{

    navigate(`/view_client/${id}`)

  }

  const handleEditClient = (id)=>{
    setClient_id(id)
    setShowEditClient(true)

  }

  const handleAddClient = ()=>{
    setShowAddClient(true)
  }

  const handleOnClose = ()=>{
      
    setShowAddClient(false)

  }

  const navigateToTrip = ()=>{
    
    navigate('/trips')

  }

  return (

    <div className='bg-white mt-card p-20 mt-record rounded-2xl'>

      {/* <EditClient onClose={handleOnClose} visible={showEditClient} client_id={client_id}/> */}
      <AddClient onClose={handleOnClose} visible={showAddClient} supplier_id={supplier_id}/>

      <div>

        <div>
            <h2 className='text-2xl gap-4 mb-4'>{supplier.name}</h2>
            <p>Clients Address</p>
        </div>

        <div>
            <p className='flex gap-4'><span>Invoice Number:</span><span>{supplier._id}</span></p >
            <p className='flex gap-4'><span>Invoice Date:</span><span>{supplier.createdAt}</span></p >
            <p className='flex gap-4'><span>Invoice Weight:</span><span>{supplier.weight}</span></p >
            <p className='flex gap-4'><span>Invoice Supplier:</span><span>{supplier.supplier_name}</span></p >
        </div>


      </div>

      <div className='w-full mt-record mb-record'>
        
        <div>
            
          <div className='flex justify-between mb-4'>

            <h3 className='text-regal-violet text-2xl p-2 '> Clients </h3>

              <div className='flex items-center gap-4'>

              <button 
                onClick={handleAddClient}  className='flex items-center p-2 bg-dashbord rounded-xl text-white'>Add Client
              </button>
              </div>

          </div>


        </div>

        <table className=' w-full border-collapse' >

          <thead  className='bg-regal-violet text-white'>

            <tr>

              {viewSupplierDetailsTable.map((item,index)=>{

                  return(

                  <th className='p-4 text-left ' key={index}>{item}</th>
                  )
              })}

              <th className='p-4 text-left '>Manage Clinets</th>

            </tr>

          </thead>

          <tbody>

            { clients!== null ? clients.map((client)=>{ 

              return(

                <tr className='items-center' key={client._id}>
              
                  <td className='p-4 text-left'>{client._id}</td>
                  <td className='p-4 text-left'>{client.name}</td>
                  <td className='p-4 text-left'>{client.weight}</td>
                
                  <td className='flex gap-2 items-center p-2'>

                    <button className='p-2 cursor-pointer 'id="add" onClick={()=>handleViewClient(client._id)}>View</button>
                    <button className='p-2 cursor-pointer ' id='view' onClick={()=>handleEditClient(client._id)}>Edit</button>
                    <button className='p-2 cursor-pointer 'id="delete" onClick={()=>handleDeteleTrip(client._id)}>Delete</button>

                  </td>

                </tr>

              )
            }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

          </tbody>

        </table>


       </div>

      <div className='flex justify-between items-center p-1'>
          
          <button onClick = {goBackClient} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          type="button"> Done
          </button>

          <button onClick={handlePrint} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          > print
          </button>

      </div>
 
    </div>


  )
}
