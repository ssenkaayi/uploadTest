import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable, paymentTable } from '../components/TableHeading'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddPayments from '../Model/AddPayments'

export default function ShowPayments() {

    const [employes , setEmployes] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [showAddPayments,setShowAddPayments] = useState(false)
    const params = useParams()
    const client_id = params.id


    useEffect(()=>{

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
            console.log(data)
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

    const navigateToPayments =()=>{

        setShowAddPayments(true)

    }

    
  return (

    

    <div className='w-full mt-record mb-record'>
        
        <div>
            
            <div className='flex justify-between mb-4'>

            <h3 className='text-regal-violet text-2xl p-2'> Payments </h3>

            <div className='flex items-center gap-4'>

            <button 
                className='flex items-center p-2 bg-dashbord rounded-xl text-white' onClick={navigateToPayments}>Make Payment
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
        <AddPayments onClose={handleOnClose} visible={showAddPayments} client_id={client_id} />
    </div>



  )
}
