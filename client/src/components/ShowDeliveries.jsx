import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import {  clientDeliveryTable } from '../components/TableHeading'
import { useEffect } from 'react'
import AddPayment from '../Model/AddPayment'
import { useParams } from 'react-router-dom'
import AddDelivery from '../Model/AddDelivery'

export default function ShowDeliveries() {

    const [deliveries , setDeliveries] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [showAddPaymets,setShowAddPayments] = useState(false)
    const params = useParams()
    const client_id = params.id
    // console.log(params.id)

    useEffect(()=>{

        const fetchEmployes = async()=>{
    
          try{
      
            setLoading(true);
            const res = await fetch(`/api/client/getClient/${client_id}`,{
              
                method:'GET',
            
            })

            const data = await res.json();
            console.log(data)
          
            if(data.succuss===false){
              setError(true)
              setLoading(false)
              return
            }
            
            setError(false)
            setLoading(false)
           
            setDeliveries(data.deliveries)
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchEmployes()
    
        
    },[])

    const handleOnClose = ()=>{
      
        setShowAddPayments(false)
    }

    const navigateToDeliveries =()=>{

        setShowAddPayments(true)

    }




  return (
        
        <div>

            
            
            <div className='flex justify-between mb-4'>

            <h3 className='text-regal-violet text-2xl p-2 '> Delivery </h3>

            <div className='flex items-center gap-4'>

            <button 
                className='flex items-center p-2 bg-dashbord rounded-xl text-white' onClick={navigateToDeliveries}>Make Delivery
            </button>


            </div>

            </div>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                    {clientDeliveryTable.map((item,index)=>{

                        return(

                            
                        <th className='p-4 text-left ' key={index}>{item}</th>

                        )
                    })}

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>

                    { deliveries !== null ?deliveries.map((delivery,index)=>{ 

                        return(
                            <tr key={index}>
                            
                            <td className='p-4 text-left'>{delivery.date.split("T", 1)}</td>

                            <td className='p-4 text-left'>{delivery.weight_delivered}</td>
                            <td className='p-4 text-left'>{delivery.pieces_delivered}</td>
                            <td className='p-4 text-left'>{delivery.remaining_weight}</td>
                            <td className='p-4 text-left'>{delivery.remaining_pieces}</td>
                            <td className='p-4 text-left'>{delivery.delivered_by}</td>
                            {/* <td className='p-4 text-left'>{employe.role}</td> */}

                            <td className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
                                {/* <button className='p-2 cursor-pointer 'id='delete' onClick={()=>handleDeteleEmploye(employe._id)}>Delete</button> */}
                            </td>

                            </tr>

                        )
                    }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

                </tbody>

            </table>

            <AddDelivery onClose={handleOnClose} visible={showAddPaymets} client_id={client_id} />
            {/* // */}
        </div>

  )
}
