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



export default function ViewSupplierDetails() {



    const params = useParams() 
    const supplier_id = params.id
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(null);
    const [clientsDetails,setClientsDetails]=useState([]) 
    const navigate = useNavigate()
    

    console.log(supplier_id)


    const handlePrint =()=>{
        window.print()
        }

        const goBackClient = ()=>{
        navigate(`/suppliers`)
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
          setClientsDetails(data)
          // setFilteredClients(data)
          console.log(data)
        }
        catch(error){
          setError(error.message)
          setLoading(false)
      
        }
      }
    
    

  return (

    <div className='bg-white mt-card p-20 mt-record rounded-2xl'>



      {/* <InvoiceHeader client_id={client_id}/> */}

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
      <MakePayments client_id={supplier_id}/>
      {/* <ClientHeader client_id={supplier_id}/> */}

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
