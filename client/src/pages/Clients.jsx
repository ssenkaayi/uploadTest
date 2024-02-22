import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
// import { packageTable} from '../components/TableHeading'
import { useEffect } from 'react'
import { clientTable } from '../components/TableHeading'


function Clients() {

    const [showAddEmploye,setShowAddEmploye] = useState(false)
    const [clients , setClients] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)


    const handleOnClose = ()=>{
      
      setShowAddEmploye(false)

    }


    useEffect(()=>{

        const fetchClients = async()=>{
    
          try{
      
            setLoading(true);
            const res = await fetch('/api/client/getClients',{
              
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
           
            setClients(data)
            console.log(clients)
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchClients()
    
        
    },[])

    const handleDeteleEmploye = async(e)=>{

      const button_id = e.target.id
      console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/client/deleteEmploye/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        console.log(data)
    
        if(data.success===false){
          console.log(data.message)
        }
    
        setEmployes((prev)=>prev.filter((employes)=>employes._id!==button_id))
    
      }catch(error){
        console.log(error)
      }


    }


  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>   

        <div className='flex justify-between'>

         <h3 className='text-regal-violet text-2xl p-2'> Manange Clients </h3>

         <button onClick={()=>setShowAddEmploye(true)} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Client</button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                        {clientTable.map((item,index)=>{

                            return(

                                
                            <th className='p-4 text-left ' key={index}>{item}</th>

                            )
                        })}

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>
                
                    { clients !== null ?clients.map((client)=>{ 

                        return(
                            <tr key={client._id}>
                            
                            <td className='p-4 text-left'>{client.createdAt.split("T", 1)}</td>
                            
                            <td className='p-4 text-left'>{client.supplier_name}</td>
                            <td className='p-4 text-left'>{client.name}</td>
                            <td className='p-4 text-left'>{client.weight}</td>
                            <td className='p-4 text-left'>{client.number_pieces}</td>
                            <td className='p-4 text-left'>{client.total_payments}</td>
                            <td className='p-4 text-left'>{client.description}</td>
                            <td className='p-4 text-left'>{client.store_status}</td>
                            <td className='p-4 text-left'>{client.issued_by}</td>

                            <div className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
                                <button className='p-2 cursor-pointer 'id={client._id} onClick={handleDeteleEmploye}>Delete</button>
                            </div>

                            </tr>

                        )
                    }):""}

                </tbody>

            </table>

        </div>



    </div>

  )
}

export default Clients