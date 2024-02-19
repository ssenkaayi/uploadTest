import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable, paymentTable } from '../components/TableHeading'
import { useEffect } from 'react'


function Payments() {

    const [showAddEmploye,setShowAddEmploye] = useState(false)
    const [employes , setEmployes] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)


    const handleOnClose = ()=>{
      
      setShowAddEmploye(false)

    }


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
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchEmployes()
    
        
    },[])

    const handleDeteleEmploye = async(e)=>{

      const button_id = e.target.id
      console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/employe/deleteEmploye/${button_id}`,{
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

         <h3 className='text-regal-violet text-2xl p-2'> Manange Payments </h3>

         <button onClick={()=>setShowAddEmploye(true)} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Payment</button>

        </div>

       

        <div className=' w-full mt-record'>

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
                
                    { employes !== null ?employes.map((employe)=>{ 

                        return(
                            <tr>
                            
                            <td className='p-4 text-left'key={employe._id}>{employe.createdAt.split("T", 1)}</td>

                            <td className='p-4 text-left'key={employe._id}>{employe.firstName}</td>
                            <td className='p-4 text-left'key={employe._id}>{employe.lastName}</td>
                            <td className='p-4 text-left'key={employe._id}>{employe.email}</td>
                            <td className='p-4 text-left'key={employe._id}>{employe.phone}</td>
                            <td className='p-4 text-left'key={employe._id}>{employe.address}</td>
                            <td className='p-4 text-left'key={employe._id}>{employe.role}</td>

                            <div className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
                                <button className='p-2 cursor-pointer 'id={employe._id} onClick={handleDeteleEmploye}>Delete</button>
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

export default Payments