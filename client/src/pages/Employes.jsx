import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable } from '../components/TableHeading'
import { useEffect } from 'react'
import EditClient from '../Model/EditClient'


function Records() {

    const [showAddEmploye,setShowAddEmploye] = useState(false)
    const [showViewClient,setShowViewClient] = useState(false)
    const [employes , setEmployes] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    // const currentPage = useRef()


    const handleOnClose = ()=>{
      
      setShowAddEmploye(false)
      setShowViewClient(false)

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

    const handleDeteleEmploye = async(_id)=>{

      const button_id = _id
  
    
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

    const handleViewClient = async(e)=>{

      const button_id = e.target.id
  
    
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

    <>

{/* <div  className='flex justify-between items-center flex-wrap
        bg-white rounded-2x p-header mb-4 my-2 rounded-lg '>

      </div> */}


      <div className='bg-white mt-card p-record mt-record rounded-2xl'>

      <AddEmploye onClose={handleOnClose} visible={showAddEmploye} />   
      <EditClient onClose={handleOnClose} visible={showViewClient}/>

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

            <th className='p-4 text-left '>Manage Employes</th>
          </tr>

        </thead>

        <tbody>
        
            { employes !== null ?employes.map((employe,index)=>{ 

                return(
                  <tr key={index}>
                    
                    <td className='p-4 text-left'>{employe.createdAt.split("T", 1)}</td>
                    <td className='p-4 text-left'>{employe.firstName}</td>
                    <td className='p-4 text-left'>{employe.lastName}</td>
                    <td className='p-4 text-left'>{employe.email}</td>
                    <td className='p-4 text-left'>{employe.phone}</td>
                    <td className='p-4 text-left'>{employe.address}</td>
                    <td className='p-4 text-left'>{employe.role}</td>
                    

                    <td className='text-green flex gap-4 items-center p-4'>
                        <button className='p-2 cursor-pointer' id='view' onClick={()=>setShowViewClient(true)}>View</button>
                        <span className='p-2 cursor-pointer '>Edit</span>
                        <button className='p-2 cursor-pointer'id='delete' onClick={()=>handleDeteleEmploye(employe._id)}>Delete</button>
                    </td>

                  </tr>

                )
            }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

        </tbody>

    </table>


</div>


</div>
</>

  )
}

export default Records