import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable } from '../components/TableHeading'
import { useEffect } from 'react'


function Records() {

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

<div  className='flex justify-between items-center flex-wrap
        bg-white rounded-2x p-header mb-4 my-2 rounded-lg '>

        <div className='flex flex-col  text-dashbord '>

          <span className='test-xs'>Admin</span>
          <span className='text-2xl' >Dashbord</span>

          </div>


          <div className='flex items-center gap-1'>

          <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

          <svg svg="true"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-sm hover:trb">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>

          < input className='bg-transparent p-2' type='text' placeholder='search'  />

          </div>

          <img className='w-12 h-12 cursor-pointer rounded-full' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='avater'/>
        </div>


      </div>


      <div className='bg-white mt-card p-record mt-record rounded-2xl'>

<AddEmploye onClose={handleOnClose} visible={showAddEmploye} />   

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
                    

                    <td className='text-green flex gap-4 items-center p-4'>
                        <span className='p-2 cursor-pointer '>Edit</span>
                        <span className='p-2 cursor-pointer '>View</span>
                        <button className='p-2 cursor-pointer 'id={employe._id} onClick={handleDeteleEmploye}>Delete</button>
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