import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable, paymentTable } from '../components/TableHeading'
import { useEffect } from 'react'
import ClientHeader from '../Model/MakeDelivery'
import MakePayments from '../Model/MakePayments'
import PrintView from '../Model/PrintView'
import InvoiceHeader from '../Model/InvoiceHeader'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// import { clients_id } from './Clients'



export default function ViewClientDetails() {

  const params = useParams() 
  const client_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState([]) 
  const navigate = useNavigate()
  const [showAddClient,setShowAddClient] = useState(false)

  console.log(client_id)


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

      {/* <AddClient onClose={handleOnClose} visible={showAddClient} supplier_id={supplier_id}/>    */}



      <InvoiceHeader client_id={client_id}/>
      <MakePayments client_id={client_id}/>
      <ClientHeader client_id={client_id}/>

      <div className='flex justify-between items-center p-1'>
          
          <button onClick = {goBackClient} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          type="button"> Back
          </button>

          <button onClick={handlePrint} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          > print
          </button>

      </div>
 
        {/* <PrintView/> */}

    
    
    </div>


  )
}
