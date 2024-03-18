import React from 'react'
import { useState } from 'react'
import InvoiceHeader from '../Model/InvoiceHeader'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ShowPayments from '../components/ShowPayments'
import ShowDeliveries from '../components/ShowDeliveries'

export default function ViewClientDetails() {

  const params = useParams() 
  const client_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState([]) 
  const navigate = useNavigate()
  const [showAddClient,setShowAddClient] = useState(false)

  const handlePrint =()=>{
      window.print()
  }

  const goBackClient = ()=>{
    navigate(`/`)
  }

  const handleAddClient = ()=>{

    setShowAddClient(true)

  }
  
  return (

    <div className='bg-white mt-card p-20 mt-record rounded-2xl'>

      <InvoiceHeader client_id={client_id}/>
      <ShowPayments client_id={client_id}/>
      <ShowDeliveries client_id={client_id}/>

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
