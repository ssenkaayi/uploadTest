import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { viewTripDetailsTable, } from '../components/TableHeading'
import { useEffect } from 'react'
import ClientHeader from '../Model/MakeDelivery'
import MakePayments from '../Model/MakePayments'
import PrintView from '../Model/PrintView'
import InvoiceHeader from '../Model/InvoiceHeader'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AddSupplier from '../Model/AddSUpplier'






export default function ViewTripDetails() {

  const params = useParams() 
  const trip_id = params.id
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [clientsDetails,setClientsDetails]=useState([]) 
  const navigate = useNavigate()
  const [suppliers , setSuppliers] = useState([])
  const [showAddSupplier,setShowAddSupplier] = useState(false)


  const handlePrint =()=>{
      window.print()
    }

    const goBackClient = ()=>{
      navigate(`/trips`)
    }


    useEffect(()=>{


        fetchClients()
    
    },[trip_id])
    
    const fetchClients = async()=>{
  
      try{
    
        setLoading(true);
        const res = await fetch(`/api/trip/getTrip/${trip_id}`,{
          
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
        setSuppliers(data.suppliers)
        // console.log(data.suppliers)
      }
      catch(error){
        setError(error.message)
        setLoading(false)
    
      }
    }

    const handleSkyTeamName = (id)=>{

      const btn_id = id
      navigate(`/view_supplier/${id}`)

      // setShowAddSupplier(true)

    }

    const handleAddSupplier = ()=>{
      setShowAddSupplier(true)
    }

    const handleOnClose = ()=>{
      
      setShowAddSupplier(false)
  
    }
  
  return (

    <div className='bg-white mt-card p-20 mt-record rounded-2xl'>

      <AddSupplier  onClose={handleOnClose}  visible={showAddSupplier} trip_id={trip_id} /> 

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

      <div className='w-full mt-record mb-record'>
        
        <div>
            
          <div className='flex justify-between'>

            <h3 className='text-regal-violet text-2xl p-2'> Manage Trip </h3>

            <div className='flex items-center gap-4  mb-4'>

              <button 
                onClick={handleAddSupplier}  className='flex items-center p-2 bg-dashbord rounded-xl text-white'>Add Supplier
              </button>


            </div>

          </div>

          <table className=' w-full border-collapse' >

            <thead  className='bg-regal-violet text-white'>

              <tr>

                {viewTripDetailsTable.map((item,index)=>{

                    return(

                    <th className='p-4 text-left ' key={index}>{item}</th>
                    )
                })}

                <th className='p-4 text-left '>Manage Suppliers</th>

              </tr>

            </thead>

            <tbody>

              { suppliers!== null ? suppliers.map((supplier)=>{ 

                return(

                  <tr className='items-center' key={supplier._id}>
                
                    <td className='p-4 text-left'>{supplier._id}</td>
                    <td className='p-4 text-left'>{supplier.name}</td>
                    <td className='p-4 text-left'>{supplier.weight}</td>
                   
                    <td className='flex gap-2 items-center p-2'>

                      <button className='p-2 cursor-pointer 'id="add" onClick={()=>handleSkyTeamName(supplier._id)}>View</button>
                      <button className='p-2 cursor-pointer ' id='view' onClick={()=>handleSkyTeamName(supplier._id)}>Edit</button>
                      <button className='p-2 cursor-pointer 'id="delete" onClick={()=>handleDeteleTrip(supplier._id)}>Delete</button>

                    </td>

                  </tr>

                )
              }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

            </tbody>

          </table>


        </div>


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
