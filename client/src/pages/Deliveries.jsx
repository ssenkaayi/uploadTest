import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import {  deliveryTable } from '../components/TableHeading'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Delivery() {

    const [employes , setEmployes] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const client_id = params.id

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
           
            setEmployes(data)
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchEmployes()
    
        
    },[])


  return (
        
        <div>
            
            <div className='flex justify-between mb-4'>

            <h3 className='text-regal-violet text-2xl p-2 '> Delivery </h3>

            <div className='flex items-center gap-4'>

            <button 
                className='flex items-center p-2 bg-dashbord rounded-xl text-white'>Make Delivery
            </button>


            </div>

            </div>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                    {deliveryTable.map((item,index)=>{

                        return(

                            
                        <th className='p-4 text-left ' key={index}>{item}</th>

                        )
                    })}

                        <th className='p-4 text-left '>Action</th>
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
                            {/* <td className='p-4 text-left'>{employe.phone}</td> */}
                            {/* <td className='p-4 text-left'>{employe.address}</td> */}
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
        </div>


  )
}
