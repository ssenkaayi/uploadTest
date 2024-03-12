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
    const [employes , setEmployes] = useState([])
    

    const handlePrint =()=>{
        window.print()
        }

        const goBackClient = ()=>{
        navigate(`/suppliers`)
    }

    useEffect(()=>{


        fetchClients()
        fetchEmployes()
    
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

    const fetchEmployes = async()=>{
    
        try{
    
          setLoading(true);
          const res = await fetch('/api/employe/getEmployes',{
            
              method:'GET',
          
          })

          const data = await res.json();
          // console.log(data)
        
          if(data.succuss===false){
            setError(true)
            setLoading(false)
            return
          }
          
          setError(false)
          setLoading(false)
         
          setEmployes(data)
          // setEmployes((prev)=>prev.filter((data)))
      
        }
    
        catch(error){
          setError(error.message)
          setLoading(false)
    
      }
    }
    
    

  return (

    <div className='bg-white mt-card p-20 mt-record rounded-2xl'>

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
            
            <div className='flex justify-between mb-4'>

            <h3 className='text-regal-violet text-2xl p-2 '> Suppliers </h3>

            <div className='flex items-center gap-4'>

            <button 
                className='flex items-center p-2 bg-dashbord rounded-xl text-white'>Add Supplier
            </button>


            </div>

            </div>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                    {paymentTable.map((item,index)=>{

                        return(

                            
                        <th className='p-4 text-left ' key={index}>{item}</th>

                        )
                    })}

                        <th className='p-4 text-left '>Manange Suppliers</th>
                    </tr>

                </thead>

                <tbody>

                    { employes !== null ?employes.map((employe,index)=>{ 

                        return(
                            <tr key={index}>
                            
                            <td className='p-4 text-left'key={index}>{employe.createdAt.split("T", 1)}</td>

                            <td className='p-4 text-left'>{employe.firstName}</td>
                            <td className='p-4 text-left'>{employe.lastName}</td>
                            <td className='p-4 text-left'>{employe.email}</td>
                            <td className='p-4 text-left'>{employe.phone}</td>
                            <td className='p-4 text-left'>{employe.role}</td>

                            <td className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
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
          type="button"> Back
          </button>

          <button onClick={handlePrint} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          > print
          </button>

      </div>
 
    </div>


  )
}
