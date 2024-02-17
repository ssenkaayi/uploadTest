import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable } from './TableHeading'
import { useEffect } from 'react'

function Records() {

    const [showAddEmploye,setShowAddEmploye] = useState(false)
    const [employes , setEmployes] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const handleOnClose = ()=>setShowAddEmploye(false)


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
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchEmployes()
    
        
    },[])

    console.log(employes)



  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>   

        <div className='flex justify-between'>

         <h3 className='text-regal-violet text-2xl p-2'> Manange Employees </h3>

         <button onClick={()=>setShowAddEmploye(true)} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Employe</button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                        {employeTable.map((item,index)=>{

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
                            <tr>
                            
                            <td className='p-4 text-left'key={employe.id}>{employe.createdAt.split("T", 1)}</td>

                            <td className='p-4 text-left'key={employe.id}>{employe.firstName}</td>
                            <td className='p-4 text-left'key={employe.id}>{employe.lastName}</td>
                            <td className='p-4 text-left'key={employe.id}>{employe.email}</td>
                            <td className='p-4 text-left'key={employe.id}>{employe.phone}</td>
                            <td className='p-4 text-left'key={employe.id}>{employe.address}</td>
                            <td className='p-4 text-left'key={employe.id}>{employe.role}</td>

                            <td className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 '>Edit</span>
                                <span className='p-2'>View</span>
                                <span className='p-2'>Delete</span>
                            </td>

                            </tr>

                        )
                    }):""}

                </tbody>

            </table>

        </div>



    </div>

  )
}

export default Records